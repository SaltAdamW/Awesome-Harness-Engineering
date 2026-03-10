import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const repoRoot = process.cwd();
const sourceListPath = resolve(repoRoot, "research/official-sources.json");
const snapshotPath = resolve(repoRoot, "research/source-snapshots.json");

const sourceList = JSON.parse(readFileSync(sourceListPath, "utf8"));
const previousSnapshots = new Map(
  JSON.parse(readFileSync(snapshotPath, "utf8")).map((entry) => [entry.id, entry])
);

const nextSnapshots = [];

for (const source of sourceList) {
  const previous = previousSnapshots.get(source.id);
  try {
    const snapshot = await fetchSnapshot(source);
    nextSnapshots.push(snapshot);
    if (!previous || hasMeaningfulChange(previous, snapshot)) {
      console.error(`[source-sync] ${source.id}: content changed`);
    }
  } catch (error) {
    const snapshot = buildFallbackSnapshot(source, previous, error);
    console.error(`[source-sync] ${source.id}: ${snapshot.error}`);
    nextSnapshots.push(snapshot);
  }
}

mkdirSync(dirname(snapshotPath), { recursive: true });
writeFileSync(snapshotPath, `${JSON.stringify(nextSnapshots, null, 2)}\n`, "utf8");

async function fetchSnapshot(source) {
  const response = await fetchWithRetry(source.url, 2);
  const normalizedBody = normalizeBody(response.body);

  return {
    id: source.id,
    url: source.url,
    finalUrl: response.url,
    label: source.label,
    category: source.category,
    why: source.why,
    status: response.status,
    contentType: response.contentType,
    title: extractTitle(response.body),
    contentHash: sha256(normalizedBody),
    reachable: true,
    error: null
  };
}

async function fetchWithRetry(url, maxAttempts) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const raw = execFileSync("curl", [
        "--location",
        "--silent",
        "--show-error",
        "--retry",
        "2",
        "--retry-all-errors",
        "--connect-timeout",
        "15",
        "--max-time",
        "45",
        "--user-agent",
        "awesome-harness-engineering-source-sync/1.0",
        "--write-out",
        "\n__SYNC_META__%{url_effective}\t%{content_type}\t%{http_code}",
        url
      ], {
        encoding: "utf8",
        maxBuffer: 10 * 1024 * 1024
      });

      const separator = "\n__SYNC_META__";
      const index = raw.lastIndexOf(separator);
      if (index === -1) {
        throw new Error(`Missing curl metadata for ${url}`);
      }

      const body = raw.slice(0, index);
      const meta = raw.slice(index + separator.length).trim().split("\t");
      const [finalUrl, contentType, statusText] = meta;
      const status = Number.parseInt(statusText, 10);

      if (!Number.isFinite(status) || status < 200 || status >= 300) {
        throw new Error(`HTTP ${statusText} for ${url}`);
      }

      return {
        url: finalUrl,
        contentType,
        status,
        body
      };
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError;
}

function normalizeBody(body) {
  return body.replace(/\s+/g, " ").trim();
}

function extractTitle(body) {
  const match = body.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!match) {
    return "";
  }

  return decodeHtmlEntities(match[1]).replace(/\s+/g, " ").trim();
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function hasMeaningfulChange(previous, next) {
  return [
    "finalUrl",
    "status",
    "contentType",
    "title",
    "contentHash",
    "reachable",
    "error"
  ].some((key) => previous[key] !== next[key]);
}

function buildFallbackSnapshot(source, previous, error) {
  return {
    id: source.id,
    url: source.url,
    finalUrl: previous?.finalUrl ?? source.url,
    label: source.label,
    category: source.category,
    why: source.why,
    status: previous?.status ?? 0,
    contentType: previous?.contentType ?? "",
    title: previous?.title ?? "",
    contentHash: previous?.contentHash ?? "",
    reachable: false,
    error: formatError(error)
  };
}

function formatError(error) {
  return error instanceof Error ? error.message : String(error);
}
