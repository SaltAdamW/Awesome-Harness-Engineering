# Awesome Harness Engineering [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

English | [中文](./README_CN.md)

A curated list of resources, frameworks, datasets, and practical guides for building evaluation harnesses for LLM and agent systems.

Harness engineering is about running repeatable, production-like evaluations so teams can ship faster with fewer regressions in quality, safety, latency, and cost.

## Contents

- [Foundations](#foundations)
- [General Eval Frameworks](#general-eval-frameworks)
- [Agent and Browser Environments](#agent-and-browser-environments)
- [Benchmarks](#benchmarks)
- [Safety and Harmfulness](#safety-and-harmfulness)
- [Observability and Reporting](#observability-and-reporting)
- [CI and Regression Workflows](#ci-and-regression-workflows)
- [Quick Start Blueprint](#quick-start-blueprint)
- [Contributing](#contributing)

## Foundations

- [OpenAI - Harness Engineering](https://openai.com/index/harness-engineering/) - Practical methodology for designing and operating eval harnesses.
- [openai/evals](https://github.com/openai/evals) - Open-source framework and examples for model evaluation.
- [Promptfoo](https://github.com/promptfoo/promptfoo) - Prompt and model evals with assertions, red-team checks, and CI integration.

## General Eval Frameworks

- [Confident AI DeepEval](https://github.com/confident-ai/deepeval) - End-to-end LLM evaluation framework with test-case abstractions.
- [TruLens](https://github.com/truera/trulens) - Instrumentation and evaluation for LLM applications.
- [RAGAS](https://github.com/explodinggradients/ragas) - Metrics-focused evaluation for RAG pipelines.
- [LangSmith Evaluations](https://docs.smith.langchain.com/evaluation) - Dataset, run, and evaluator workflows for LLM apps.
- [MLflow Evaluation](https://mlflow.org/docs/latest/llms/llm-evaluate/index.html) - Unified tracking and evaluation pipelines for LLM systems.

## Agent and Browser Environments

- [BrowserGym](https://github.com/ServiceNow/BrowserGym) - Unified environment layer for browser-based agent benchmarks.
- [WebArena](https://github.com/web-arena-x/webarena) - Realistic web task environment for autonomous web agents.
- [VisualWebArena](https://github.com/web-arena-x/visualwebarena) - Multimodal extension of WebArena for visual reasoning on webpages.
- [OSWorld](https://github.com/xlang-ai/OSWorld) - Desktop/OS-level benchmark environment for computer-use agents.
- [MiniWoB++](https://github.com/Farama-Foundation/miniwob-plusplus) - Lightweight browser tasks for rapid iteration and debugging.

## Benchmarks

- [SWE-bench](https://github.com/SWE-bench/SWE-bench) - Real GitHub issue resolution benchmark for coding agents.
- [GAIA](https://huggingface.co/gaia-benchmark) - General assistant benchmark with multi-step reasoning and tool use.
- [AgentBench](https://github.com/THUDM/AgentBench) - Multi-environment benchmark suite for LLM-based agents.
- [WebArena Leaderboard](https://webarena.dev/) - Public leaderboard and benchmark artifacts for web agents.

## Safety and Harmfulness

- [SafeArena (paper)](https://arxiv.org/abs/2503.04957) - Web-agent harmfulness benchmark with safe and harmful task splits.
- [OS-Harm (paper)](https://arxiv.org/abs/2506.14866) - Harm and misuse evaluation for OS-level computer-use agents.
- [CUAHarm (paper)](https://arxiv.org/abs/2508.00935) - Benchmark for harmful task execution in computer-use agents.
- [microsoft/PyRIT](https://github.com/Azure/PyRIT) - Open-source toolkit for red teaming generative AI systems.
- [NVIDIA Garak](https://github.com/NVIDIA/garak) - LLM vulnerability scanner with plug-in probes and detectors.

## Observability and Reporting

- [Langfuse](https://github.com/langfuse/langfuse) - Open-source observability platform for LLM traces and evals.
- [Weights & Biases Weave](https://wandb.ai/site/weave/) - Tracking, comparison, and evaluation tooling for LLM apps.
- [Arize Phoenix](https://github.com/Arize-ai/phoenix) - Tracing and evaluation for RAG and agent systems.

## CI and Regression Workflows

- [GitHub Actions](https://docs.github.com/actions) - Common CI platform for automated harness runs.
- [pytest](https://docs.pytest.org/) - Test runner often used as the base execution layer for eval suites.
- [pytest-benchmark](https://github.com/ionelmc/pytest-benchmark) - Performance regression checks for latency-sensitive workloads.

## Quick Start Blueprint

A minimal harness stack should include:

- `datasets/`: smoke, regression, and adversarial suites
- `runner/`: execution and trace capture
- `judges/`: rule-based and model-based scoring
- `reports/`: metric summaries and failure diffs

Core metrics to track:

- `task_success_rate`
- `critical_error_rate`
- `safety_violation_rate`
- `latency_p50/p95`
- `cost_per_task`
- `regression_delta`

Recommended evaluation loop:

1. Run `smoke` suite for fast PR feedback.
2. Run `regression` suite for known failure coverage.
3. Enforce release gates on quality, safety, latency, and cost.

## Contributing

Contributions are welcome.

Please follow these rules:

- Add resources directly related to harness engineering or eval operations.
- Use this format: `- [Name](link) - short description`.
- Keep descriptions factual and concise.
- Avoid duplicate links and marketing-heavy entries.
- For papers, prefer arXiv or primary publication pages.

If you are unsure whether an entry fits, open an issue first.
