# Awesome Harness Engineering [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

English | [中文](./README_CN.md)

A curated list of resources for **agent-first harness engineering**: designing environments, constraints, and feedback loops so coding agents can build, test, review, and ship reliably.

> Core reference: [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)

## Contents

- [Foundations](#foundations)
- [Agent-First Workflow](#agent-first-workflow)
- [Repository as System of Record](#repository-as-system-of-record)
- [Architecture and Invariant Enforcement](#architecture-and-invariant-enforcement)
- [App Legibility and Observability](#app-legibility-and-observability)
- [Evaluation and Regression Loops](#evaluation-and-regression-loops)
- [Safety and Misuse Testing](#safety-and-misuse-testing)
- [Continuous Cleanup and Anti-Drift](#continuous-cleanup-and-anti-drift)
- [Contributing](#contributing)

## Foundations

- [OpenAI - Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/) - The core operating model: humans steer, agents execute.
- [openai/evals](https://github.com/openai/evals) - Open-source framework for reproducible model evaluations.
- [Promptfoo](https://github.com/promptfoo/promptfoo) - Prompt/model assertions, red-team checks, and CI-friendly eval workflows.

## Agent-First Workflow

- [GitHub CLI](https://cli.github.com/) - Scriptable PR lifecycle for agent-driven implementation/review loops.
- [GitHub Actions](https://docs.github.com/actions) - CI backbone for automated run-validate-patch loops.
- [pre-commit](https://pre-commit.com/) - Enforce baseline checks before agent commits hit CI.
- [Reviewdog](https://github.com/reviewdog/reviewdog) - Surface linter/test feedback as review comments.

## Repository as System of Record

- [AGENTS.md](https://agents.md/) - Shared convention for repository-level agent instructions.
- [MkDocs Material](https://github.com/squidfunk/mkdocs-material) - Versioned, searchable docs for agent-readable knowledge bases.
- [Docusaurus](https://docusaurus.io/) - Structured docs system for long-lived architectural and product knowledge.
- [markdownlint](https://github.com/DavidAnson/markdownlint) - Enforce consistent markdown quality in repo-native docs.
- [lychee](https://github.com/lycheeverse/lychee) - Link checking to prevent stale documentation references.

## Architecture and Invariant Enforcement

- [ESLint](https://eslint.org/) - Enforce code quality and structural conventions in JS/TS repositories.
- [dependency-cruiser](https://github.com/sverweij/dependency-cruiser) - Enforce import boundaries and layer direction rules.
- [Semgrep](https://semgrep.dev/) - Custom structural/security rules that agents can mechanically satisfy.
- [mypy](https://github.com/python/mypy) - Type invariants for Python boundaries.
- [Zod](https://github.com/colinhacks/zod) - Runtime schema validation at service/API boundaries.

## App Legibility and Observability

- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) - Programmatic browser introspection for UI validation loops.
- [Playwright](https://playwright.dev/) - Automated browser workflows with traces and screenshots.
- [OpenTelemetry](https://opentelemetry.io/) - Standardized traces/metrics/log correlation for agent debugging.
- [Prometheus](https://prometheus.io/) - Metrics backend for SLO and latency checks.
- [Grafana Loki](https://grafana.com/oss/loki/) - LogQL-capable log querying for runtime diagnosis.
- [Grafana Tempo](https://grafana.com/oss/tempo/) - Trace storage and TraceQL-style investigations.

## Evaluation and Regression Loops

- [pytest](https://docs.pytest.org/) - Execution layer for smoke/regression suites.
- [pytest-benchmark](https://github.com/ionelmc/pytest-benchmark) - Performance regression tracking.
- [LangSmith Evaluations](https://docs.smith.langchain.com/evaluation) - Dataset + run + evaluator workflows.
- [DeepEval](https://github.com/confident-ai/deepeval) - LLM test case abstractions and assertions.
- [RAGAS](https://github.com/explodinggradients/ragas) - Retrieval-focused quality metrics.

## Safety and Misuse Testing

- [PyRIT](https://github.com/Azure/PyRIT) - Red-team toolkit for generative AI systems.
- [Garak](https://github.com/NVIDIA/garak) - LLM vulnerability scanning with modular probes.
- [SafeArena (paper)](https://arxiv.org/abs/2503.04957) - Harmfulness benchmark for web agents.
- [OS-Harm (paper)](https://arxiv.org/abs/2506.14866) - Harm and misuse testing for OS-level agents.
- [CUAHarm (paper)](https://arxiv.org/abs/2508.00935) - Harmful task execution benchmark for computer-use agents.

## Continuous Cleanup and Anti-Drift

- [Renovate](https://github.com/renovatebot/renovate) - Continuous dependency maintenance via automated PRs.
- [Ruff](https://github.com/astral-sh/ruff) - Fast Python lint/format checks for recurring cleanup loops.
- [Biome](https://github.com/biomejs/biome) - Unified formatter/linter for JS/TS repositories.
- [SonarQube](https://www.sonarsource.com/products/sonarqube/) - Long-horizon code health and issue trend monitoring.

## Contributing

Contributions are welcome.

Please follow this format:

- `- [Name](link) - short description`

Guidelines:

- Keep entries directly relevant to agent-first harness engineering.
- Prefer primary sources (official docs, original repos, primary papers).
- Avoid duplicate or marketing-heavy entries.
- Keep descriptions concise and factual.
