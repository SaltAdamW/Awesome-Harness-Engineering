# Awesome Harness Engineering [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

[English](./README.md) | 中文

面向 **长程任务执行（long-horizon）Agent Harness** 的精选清单。

核心不只是评测，而是构建一套环境，让 LLM/VLM 在长程任务中稳定运行；当出错时，依靠 **环境 + 约束 + 反馈** 的闭环完成恢复与收敛。

> 核心参考： [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)

## 目录

- [基础方法](#基础方法)
- [长程任务执行环境](#长程任务执行环境)
- [约束与护栏](#约束与护栏)
- [状态、检查点与恢复](#状态检查点与恢复)
- [应用可读性与可观测性](#应用可读性与可观测性)
- [评测与回归闭环](#评测与回归闭环)
- [安全与滥用测试](#安全与滥用测试)
- [持续清理与反漂移](#持续清理与反漂移)
- [贡献指南](#贡献指南)

## 基础方法

- [OpenAI - Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/) - Agent-first 工程范式与实践经验。
- [openai/evals](https://github.com/openai/evals) - 可复现模型评测框架。
- [Promptfoo](https://github.com/promptfoo/promptfoo) - 支持断言、红队和 CI 集成的评测流程。

## 长程任务执行环境

- [Docker](https://www.docker.com/) - 为 Agent 任务提供可复现运行环境。
- [Kubernetes](https://kubernetes.io/) - 长任务的隔离、调度与生命周期管理。
- [Temporal](https://temporal.io/) - 面向长流程和失败场景的持久化编排引擎。
- [LangGraph](https://github.com/langchain-ai/langgraph) - 支持状态化多步控制流的 Agent 运行时。
- [GitHub Actions](https://docs.github.com/actions) - 可重复的自动化执行基座。

## 约束与护栏

- [AGENTS.md](https://agents.md/) - 仓库级 Agent 约束与协作约定。
- [ESLint](https://eslint.org/) - 机械化代码质量与模式约束。
- [Semgrep](https://semgrep.dev/) - 可定制静态策略（架构/安全）。
- [dependency-cruiser](https://github.com/sverweij/dependency-cruiser) - 约束依赖方向与分层边界。
- [Zod](https://github.com/colinhacks/zod) - 数据边界的运行时契约校验。

## 状态、检查点与恢复

- [PostgreSQL](https://www.postgresql.org/) - 任务进度与运行元数据的持久化存储。
- [Redis](https://redis.io/) - 临时状态、锁与队列原语。
- [Celery](https://github.com/celery/celery) - 带重试与退避能力的分布式任务队列。
- [BullMQ](https://github.com/taskforcesh/bullmq) - JS/TS 任务队列与重试机制。
- [Backoff](https://github.com/litl/backoff) - 外部调用失败时的退避重试策略。

## 应用可读性与可观测性

- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) - 程序化浏览器观测，用于 UI 验证。
- [Playwright](https://playwright.dev/) - 可重复的浏览器自动化、截图与 trace。
- [OpenTelemetry](https://opentelemetry.io/) - traces/metrics/logs 统一上下文。
- [Prometheus](https://prometheus.io/) - 指标采集与 SLO 检查。
- [Grafana Loki](https://grafana.com/oss/loki/) - 基于 LogQL 的日志诊断。
- [Grafana Tempo](https://grafana.com/oss/tempo/) - 链路追踪存储与追踪级调试。

## 评测与回归闭环

- [pytest](https://docs.pytest.org/) - 冒烟与回归套件执行层。
- [pytest-benchmark](https://github.com/ionelmc/pytest-benchmark) - 性能回归检查。
- [LangSmith Evaluations](https://docs.smith.langchain.com/evaluation) - 数据集、运行、评估器工作流。
- [DeepEval](https://github.com/confident-ai/deepeval) - LLM 测试样例抽象与断言。
- [RAGAS](https://github.com/explodinggradients/ragas) - 检索场景质量指标。

## 安全与滥用测试

- [PyRIT](https://github.com/Azure/PyRIT) - 生成式 AI 红队工具。
- [Garak](https://github.com/NVIDIA/garak) - 基于探针的 LLM 漏洞扫描器。
- [SafeArena (paper)](https://arxiv.org/abs/2503.04957) - Web Agent 有害性评测基准。
- [OS-Harm (paper)](https://arxiv.org/abs/2506.14866) - OS 级 Agent 有害与滥用评测。
- [CUAHarm (paper)](https://arxiv.org/abs/2508.00935) - computer-use agent 有害任务执行基准。

## 持续清理与反漂移

- [Renovate](https://github.com/renovatebot/renovate) - 自动 PR 方式的依赖持续维护。
- [Ruff](https://github.com/astral-sh/ruff) - 高频清理任务适配的快速 lint/format。
- [Biome](https://github.com/biomejs/biome) - JS/TS 统一格式化与静态检查。
- [SonarQube](https://www.sonarsource.com/products/sonarqube/) - 长周期代码质量趋势追踪。

## 贡献指南

欢迎贡献。

格式：

- `- [Name](link) - short description`

规则：

- 仅收录与长程 Agent Harness Engineering 直接相关的条目。
- 优先官方文档、原始仓库、论文主来源。
- 避免重复或营销化条目。
- 描述保持简洁、客观。
