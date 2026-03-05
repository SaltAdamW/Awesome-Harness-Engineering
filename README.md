# Awesome Harness Engineering [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

English: A curated list of resources, frameworks, datasets, and practical guides for building evaluation harnesses for LLM and agent systems.  
中文：面向 LLM 与 Agent 系统的评测 harness 资源、框架、数据集与实践指南精选清单。

English: Harness engineering is about running repeatable, production-like evaluations so teams can ship faster with fewer regressions in quality, safety, latency, and cost.  
中文：Harness engineering 的核心是运行可复现、接近生产环境的评测，让团队在质量、安全、时延、成本上更快迭代且更少回归。

## Contents | 目录

- [Foundations](#foundations) - 基础方法与理念
- [General Eval Frameworks](#general-eval-frameworks) - 通用评测框架
- [Agent and Browser Environments](#agent-and-browser-environments) - Agent 与浏览器环境
- [Benchmarks](#benchmarks) - 基准测试
- [Safety and Harmfulness](#safety-and-harmfulness) - 安全与有害性评测
- [Observability and Reporting](#observability-and-reporting) - 可观测性与报告
- [CI and Regression Workflows](#ci-and-regression-workflows) - CI 与回归流程
- [Quick Start Blueprint](#quick-start-blueprint) - 快速落地蓝图
- [Contributing](#contributing) - 贡献指南

## Foundations

- [OpenAI - Harness Engineering](https://openai.com/index/harness-engineering/) - Practical methodology for designing and operating eval harnesses. / 设计与运营评测 harness 的实践方法论。
- [openai/evals](https://github.com/openai/evals) - Open-source framework and examples for model evaluation. / 模型评测的开源框架与示例。
- [Promptfoo](https://github.com/promptfoo/promptfoo) - Prompt and model evals with assertions, red-team checks, and CI integration. / 支持断言、红队检查与 CI 集成的提示词与模型评测工具。

## General Eval Frameworks

- [Confident AI DeepEval](https://github.com/confident-ai/deepeval) - End-to-end LLM evaluation framework with test-case abstractions. / 具备测试样例抽象能力的端到端 LLM 评测框架。
- [TruLens](https://github.com/truera/trulens) - Instrumentation and evaluation for LLM applications. / 面向 LLM 应用的可观测与评测工具。
- [RAGAS](https://github.com/explodinggradients/ragas) - Metrics-focused evaluation for RAG pipelines. / 以指标为中心的 RAG 评测框架。
- [LangSmith Evaluations](https://docs.smith.langchain.com/evaluation) - Dataset, run, and evaluator workflows for LLM apps. / 覆盖数据集、运行与评估器工作流的评测平台。
- [MLflow Evaluation](https://mlflow.org/docs/latest/llms/llm-evaluate/index.html) - Unified tracking and evaluation pipelines for LLM systems. / 统一追踪与评测流水线。

## Agent and Browser Environments

- [BrowserGym](https://github.com/ServiceNow/BrowserGym) - Unified environment layer for browser-based agent benchmarks. / 浏览器 Agent 基准测试的统一环境层。
- [WebArena](https://github.com/web-arena-x/webarena) - Realistic web task environment for autonomous web agents. / 面向自主网页 Agent 的真实任务环境。
- [VisualWebArena](https://github.com/web-arena-x/visualwebarena) - Multimodal extension of WebArena for visual reasoning on webpages. / WebArena 的多模态扩展版本。
- [OSWorld](https://github.com/xlang-ai/OSWorld) - Desktop/OS-level benchmark environment for computer-use agents. / 面向 computer-use agent 的桌面与操作系统级环境。
- [MiniWoB++](https://github.com/Farama-Foundation/miniwob-plusplus) - Lightweight browser tasks for rapid iteration and debugging. / 轻量级网页任务环境，适合快速迭代与调试。

## Benchmarks

- [SWE-bench](https://github.com/SWE-bench/SWE-bench) - Real GitHub issue resolution benchmark for coding agents. / 基于真实 GitHub issue 的代码 Agent 基准。
- [GAIA](https://huggingface.co/gaia-benchmark) - General assistant benchmark with multi-step reasoning and tool use. / 强调多步推理与工具使用的通用助手基准。
- [AgentBench](https://github.com/THUDM/AgentBench) - Multi-environment benchmark suite for LLM-based agents. / 覆盖多环境的 Agent 基准套件。
- [WebArena Leaderboard](https://webarena.dev/) - Public leaderboard and benchmark artifacts for web agents. / Web Agent 公共排行榜与基准资源。

## Safety and Harmfulness

- [SafeArena (paper)](https://arxiv.org/abs/2503.04957) - Web-agent harmfulness benchmark with safe and harmful task splits. / 面向 Web Agent 的有害性评测基准。
- [OS-Harm (paper)](https://arxiv.org/abs/2506.14866) - Harm and misuse evaluation for OS-level computer-use agents. / 面向 OS-level computer-use agent 的有害与滥用评测。
- [CUAHarm (paper)](https://arxiv.org/abs/2508.00935) - Benchmark for harmful task execution in computer-use agents. / 评测 computer-use agent 执行有害任务能力的基准。
- [microsoft/PyRIT](https://github.com/Azure/PyRIT) - Open-source toolkit for red teaming generative AI systems. / 生成式 AI 红队测试工具包。
- [NVIDIA Garak](https://github.com/NVIDIA/garak) - LLM vulnerability scanner with plug-in probes and detectors. / LLM 漏洞扫描工具，支持多类探针和检测器。

## Observability and Reporting

- [Langfuse](https://github.com/langfuse/langfuse) - Open-source observability platform for LLM traces and evals. / 面向 LLM trace 与评测的开源可观测平台。
- [Weights & Biases Weave](https://wandb.ai/site/weave/) - Tracking, comparison, and evaluation tooling for LLM apps. / LLM 应用的追踪、对比与评测工具。
- [Arize Phoenix](https://github.com/Arize-ai/phoenix) - Tracing and evaluation for RAG and agent systems. / 面向 RAG 与 Agent 系统的追踪与评测工具。

## CI and Regression Workflows

- [GitHub Actions](https://docs.github.com/actions) - Common CI platform for automated harness runs. / 常用 CI 平台，用于自动化执行 harness。
- [pytest](https://docs.pytest.org/) - Test runner often used as the base execution layer for eval suites. / 常作为评测套件执行层的测试框架。
- [pytest-benchmark](https://github.com/ionelmc/pytest-benchmark) - Performance regression checks for latency-sensitive workloads. / 用于时延敏感场景的性能回归检查。

## Quick Start Blueprint | 快速落地蓝图

English: A minimal harness stack should include:  
中文：一个最小可用 harness 栈应包含：

- `datasets/`: smoke, regression, adversarial suites / 冒烟、回归、对抗评测集
- `runner/`: execution and trace capture / 执行与轨迹采集
- `judges/`: rule-based and model-based scoring / 规则判分与模型判分
- `reports/`: metric summaries and failure diffs / 指标汇总与失败对比

English: Core metrics to track:  
中文：建议持续追踪的核心指标：

- `task_success_rate` / 任务完成率
- `critical_error_rate` / 关键错误率
- `safety_violation_rate` / 安全违规率
- `latency_p50/p95` / 时延分位
- `cost_per_task` / 单任务成本
- `regression_delta` / 相对基线回归变化

English: Recommended evaluation loop:  
中文：推荐评测循环：

1. Run `smoke` suite for fast PR feedback. / 先跑冒烟集，快速给 PR 反馈。
2. Run `regression` suite for known failure coverage. / 再跑回归集，覆盖已知失败模式。
3. Enforce release gates on quality, safety, latency, and cost. / 发布前用质量、安全、时延、成本阈值做 gate。

## Contributing | 贡献指南

English: Contributions are welcome.  
中文：欢迎贡献。

Please follow these rules / 请遵循以下规则：

- Add resources directly related to harness engineering or eval operations. / 仅添加与 harness engineering 或评测运营直接相关的资源。
- Use this format: `- [Name](link) - short description`. / 使用统一格式：`- [Name](link) - short description`。
- Keep descriptions factual and concise. / 描述要客观且简洁。
- Avoid duplicate links and marketing-heavy entries. / 避免重复链接与营销化描述。
- For papers, prefer arXiv or primary publication pages. / 论文优先使用 arXiv 或主发布页面链接。

If you are unsure whether an entry fits, open an issue first.  
如果不确定资源是否合适，请先提 issue 讨论。
