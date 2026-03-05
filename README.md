# Awesome Harness Engineering [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

English | [中文](./README_CN.md)

A curated list of resources for building **long-horizon agent execution harnesses**.

The core goal is not only evaluation. It is to build an environment where LLM/VLM agents can run long tasks reliably, and when failures happen, recover through a closed loop of **environment + constraints + feedback**.

> Core reference: [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)

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

- [OpenAI - Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/) - Agent-first engineering model and operating lessons.
- [openai/evals](https://github.com/openai/evals) - Reproducible model evaluation framework.
- [Promptfoo](https://github.com/promptfoo/promptfoo) - Assertions, red-team checks, and CI-friendly eval workflows.

## Long-Horizon Execution Environments

- [Docker](https://www.docker.com/) - Reproducible runtime packaging for agent tasks.
- [Kubernetes](https://kubernetes.io/) - Isolation, scheduling, and lifecycle management for long-running workloads.
- [Temporal](https://temporal.io/) - Durable workflow orchestration for long-running, failure-prone processes.
- [LangGraph](https://github.com/langchain-ai/langgraph) - Stateful multi-step agent runtime with graph-based control flow.
- [GitHub Actions](https://docs.github.com/actions) - CI execution substrate for repeatable agent loops.

## Constraints and Guardrails

- [AGENTS.md](https://agents.md/) - Repository-level operating constraints for agents.
- [ESLint](https://eslint.org/) - Mechanical code quality and pattern enforcement.
- [Semgrep](https://semgrep.dev/) - Custom static policies for architecture and safety constraints.
- [dependency-cruiser](https://github.com/sverweij/dependency-cruiser) - Enforce layer boundaries and dependency direction.
- [Zod](https://github.com/colinhacks/zod) - Runtime boundary validation for data contracts.

## State, Checkpointing, and Recovery

- [PostgreSQL](https://www.postgresql.org/) - Durable state store for task progress and run metadata.
- [Redis](https://redis.io/) - Fast ephemeral state, lock, and queue primitives.
- [Celery](https://github.com/celery/celery) - Distributed task queue with retries and backoff.
- [BullMQ](https://github.com/taskforcesh/bullmq) - Job queue for JS/TS stacks with retry semantics.
- [Backoff](https://github.com/litl/backoff) - Retry/backoff primitives for resilient external calls.

## App Legibility and Observability

- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) - Programmatic browser introspection for UI validation.
- [Playwright](https://playwright.dev/) - Deterministic browser automation with traces and screenshots.
- [OpenTelemetry](https://opentelemetry.io/) - Unified tracing, metrics, and logs context.
- [Prometheus](https://prometheus.io/) - Metrics collection and SLO checks.
- [Grafana Loki](https://grafana.com/oss/loki/) - LogQL-based runtime diagnostics.
- [Grafana Tempo](https://grafana.com/oss/tempo/) - Trace storage and trace-level debugging.

## Evaluation and Regression Loops

- [pytest](https://docs.pytest.org/) - Execution layer for smoke and regression suites.
- [pytest-benchmark](https://github.com/ionelmc/pytest-benchmark) - Performance regression checks.
- [LangSmith Evaluations](https://docs.smith.langchain.com/evaluation) - Dataset + run + evaluator workflows.
- [DeepEval](https://github.com/confident-ai/deepeval) - Test-case abstractions and LLM assertions.
- [RAGAS](https://github.com/explodinggradients/ragas) - Retrieval-oriented evaluation metrics.

## Safety and Misuse Testing

- [PyRIT](https://github.com/Azure/PyRIT) - Red-team toolkit for generative AI systems.
- [Garak](https://github.com/NVIDIA/garak) - Probe-based LLM vulnerability scanner.
- [SafeArena (paper)](https://arxiv.org/abs/2503.04957) - Harmfulness benchmark for web agents.
- [OS-Harm (paper)](https://arxiv.org/abs/2506.14866) - Harm and misuse testing for OS-level agents.
- [CUAHarm (paper)](https://arxiv.org/abs/2508.00935) - Harmful task execution benchmark for computer-use agents.

## Continuous Cleanup and Anti-Drift

- [Renovate](https://github.com/renovatebot/renovate) - Automated dependency updates via PRs.
- [Ruff](https://github.com/astral-sh/ruff) - Fast lint/format checks for recurring cleanup loops.
- [Biome](https://github.com/biomejs/biome) - Unified formatter/linter for JS/TS codebases.
- [SonarQube](https://www.sonarsource.com/products/sonarqube/) - Long-horizon code quality trend tracking.

## Contributing

Contributions are welcome.

Format:

- `- [Name](link) - short description`

Rules:

- Keep entries directly relevant to long-horizon agent harness engineering.
- Prefer primary sources (official docs, original repos, primary papers).
- Avoid duplicate or marketing-heavy entries.
- Keep descriptions concise and factual.
