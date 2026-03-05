# Awesome Harness Engineering [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

English | [中文](./README.md)

A curated list of resources for building **long-horizon agent execution harnesses**.

The core is not only evaluation. The real goal is to build an environment where LLM/VLM agents can run long tasks reliably and recover from failures through a closed loop of **environment + constraints + feedback**.

> Core reference: [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)

## How to Use This List

1. If you are starting from scratch, follow this order:
`Long-Horizon Execution Environments -> Constraints and Guardrails -> State, Checkpointing, and Recovery -> App Legibility and Observability -> Evaluation and Regression Loops`.
2. If you already have an agent system, start from:
`Evaluation and Regression Loops -> App Legibility and Observability -> Continuous Cleanup and Anti-Drift`.
3. If you focus on risk control, prioritize:
`Safety and Misuse Testing + Constraints and Guardrails`.

## Inclusion Criteria

Each entry should be directly useful for at least one of these goals:

- Improve long-horizon task completion stability
- Improve failure recovery speed and quality
- Improve constraint enforcement and architecture legibility
- Improve measurable feedback loops (quality, latency, cost, safety)

## Contents

- [Foundations](#foundations)
- [Long-Horizon Execution Environments](#long-horizon-execution-environments)
- [Constraints and Guardrails](#constraints-and-guardrails)
- [State, Checkpointing, and Recovery](#state-checkpointing-and-recovery)
- [App Legibility and Observability](#app-legibility-and-observability)
- [Evaluation and Regression Loops](#evaluation-and-regression-loops)
- [Safety and Misuse Testing](#safety-and-misuse-testing)
- [Continuous Cleanup and Anti-Drift](#continuous-cleanup-and-anti-drift)
- [Contributing](#contributing)

## Foundations

- [OpenAI - Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/) - Agent-first operating model. Why: defines the systems mindset.
- [openai/evals](https://github.com/openai/evals) - Reproducible model eval framework. Why: baseline feedback loop.
- [Promptfoo](https://github.com/promptfoo/promptfoo) - Assertions and red-team checks. Why: practical CI integration.

## Long-Horizon Execution Environments

- [Docker](https://www.docker.com/) - Reproducible runtime packaging. Why: fewer environment-related failures.
- [Kubernetes](https://kubernetes.io/) - Workload isolation and lifecycle control. Why: stable long-running execution.
- [Temporal](https://temporal.io/) - Durable workflow orchestration. Why: built-in retries and continuation.
- [LangGraph](https://github.com/langchain-ai/langgraph) - Stateful graph runtime for agents. Why: explicit multi-step control flow.
- [GitHub Actions](https://docs.github.com/actions) - Standard automation substrate. Why: repeatable run-validate loops.

## Constraints and Guardrails

- [AGENTS.md](https://agents.md/) - Repository-level agent constraints. Why: consistent operating instructions.
- [ESLint](https://eslint.org/) - Static quality/pattern checks. Why: reduces drift in generated code.
- [Semgrep](https://semgrep.dev/) - Custom policy rules. Why: encode architecture and safety invariants.
- [dependency-cruiser](https://github.com/sverweij/dependency-cruiser) - Dependency boundary checks. Why: enforce layering contracts.
- [Zod](https://github.com/colinhacks/zod) - Runtime schema validation. Why: safer boundary handling.

## State, Checkpointing, and Recovery

- [PostgreSQL](https://www.postgresql.org/) - Durable run/task state. Why: reliable recovery checkpoints.
- [Redis](https://redis.io/) - Fast queues/locks/ephemeral state. Why: resilient coordination primitives.
- [Celery](https://github.com/celery/celery) - Distributed task retries. Why: fault-tolerant async execution.
- [BullMQ](https://github.com/taskforcesh/bullmq) - Queue + retry for JS/TS stacks. Why: recoverable job processing.
- [Backoff](https://github.com/litl/backoff) - Retry/backoff primitives. Why: robust external API handling.

## App Legibility and Observability

- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) - Programmatic browser introspection. Why: agent-visible UI behavior.
- [Playwright](https://playwright.dev/) - Deterministic browser automation and traces. Why: reproducible UI validation.
- [OpenTelemetry](https://opentelemetry.io/) - Unified traces/metrics/logs context. Why: root-cause feedback loop.
- [Prometheus](https://prometheus.io/) - Metrics and SLO checks. Why: measurable runtime quality.
- [Grafana Loki](https://grafana.com/oss/loki/) - LogQL diagnostics. Why: structured failure triage.
- [Grafana Tempo](https://grafana.com/oss/tempo/) - Trace-level debugging. Why: cross-service failure analysis.

## Evaluation and Regression Loops

- [pytest](https://docs.pytest.org/) - Smoke/regression execution layer. Why: fast test orchestration.
- [pytest-benchmark](https://github.com/ionelmc/pytest-benchmark) - Performance regression checks. Why: protect latency budgets.
- [LangSmith Evaluations](https://docs.smith.langchain.com/evaluation) - Dataset + run + evaluator pipeline. Why: consistent eval operations.
- [DeepEval](https://github.com/confident-ai/deepeval) - LLM test-case abstractions. Why: reusable quality assertions.
- [RAGAS](https://github.com/explodinggradients/ragas) - Retrieval quality metrics. Why: objective RAG feedback.

## Safety and Misuse Testing

- [PyRIT](https://github.com/Azure/PyRIT) - Generative AI red-team toolkit. Why: offensive testing workflow.
- [Garak](https://github.com/NVIDIA/garak) - Probe-based vulnerability scanner. Why: broad misuse surface checks.
- [SafeArena (paper)](https://arxiv.org/abs/2503.04957) - Web-agent harmfulness benchmark. Why: concrete harmful-task coverage.
- [OS-Harm (paper)](https://arxiv.org/abs/2506.14866) - OS-level harm benchmark. Why: computer-use risk validation.
- [CUAHarm (paper)](https://arxiv.org/abs/2508.00935) - Harmful task execution benchmark. Why: execution-level safety measurement.

## Continuous Cleanup and Anti-Drift

- [Renovate](https://github.com/renovatebot/renovate) - Automated dependency upkeep. Why: reduce maintenance entropy.
- [Ruff](https://github.com/astral-sh/ruff) - Fast Python lint/format. Why: low-cost continuous cleanup.
- [Biome](https://github.com/biomejs/biome) - JS/TS formatter+linter. Why: consistent code generation outcomes.
- [SonarQube](https://www.sonarsource.com/products/sonarqube/) - Long-term quality trend tracking. Why: early drift detection.

## Contributing

Contributions are welcome.

Format:

- `- [Name](link) - short description. Why: value for long-horizon harnesses.`

Rules:

- Keep entries directly relevant to long-horizon agent harness engineering.
- Prefer primary sources (official docs, original repos, primary papers).
- Avoid duplicates and marketing-heavy entries.
- Keep descriptions concise and factual.
