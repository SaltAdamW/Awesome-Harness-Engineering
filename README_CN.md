# Awesome Harness Engineering [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

[English](./README_EN.md) | 中文

面向 **长程任务执行（long-horizon）Agent Harness** 的精选清单。

核心不只是评测，而是构建一套环境，让 LLM/VLM 在长程任务中稳定运行；当出错时，依靠 **环境 + 约束 + 反馈** 的闭环完成恢复与收敛。

> 核心参考： [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)

## 使用方式

1. 从 0 搭建时，建议按顺序：
`长程任务执行环境 -> 约束与护栏 -> 状态、检查点与恢复 -> 应用可读性与可观测性 -> 评测与回归闭环`。
2. 已有 Agent 系统时，建议从：
`评测与回归闭环 -> 应用可读性与可观测性 -> 持续清理与反漂移` 开始。
3. 以风控优先时，优先：
`安全与滥用测试 + 约束与护栏`。

## 收录标准

每个条目至少应直接帮助以下目标之一：

- 提升长程任务完成的稳定性
- 提升故障恢复速度与恢复质量
- 提升约束执行与架构可读性
- 提升可度量的反馈闭环（质量、时延、成本、安全）

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

- [OpenAI - Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/) - Agent-first 工程模型。价值：明确系统化思维与协作范式。
- [openai/evals](https://github.com/openai/evals) - 可复现模型评测框架。价值：建立基线反馈回路。
- [Promptfoo](https://github.com/promptfoo/promptfoo) - 断言与红队检查。价值：便于接入 CI。

## 长程任务执行环境

- [Docker](https://www.docker.com/) - 可复现运行时封装。价值：减少环境差异导致的失败。
- [Kubernetes](https://kubernetes.io/) - 任务隔离与生命周期管理。价值：支撑长时运行稳定性。
- [Temporal](https://temporal.io/) - 持久化流程编排。价值：天然支持重试和断点续跑。
- [LangGraph](https://github.com/langchain-ai/langgraph) - 状态化多步 Agent 运行时。价值：显式控制长链路流程。
- [GitHub Actions](https://docs.github.com/actions) - 自动化执行基座。价值：构建可重复 run-validate 闭环。

## 约束与护栏

- [AGENTS.md](https://agents.md/) - 仓库级 Agent 运行约束。价值：统一行为和协作边界。
- [ESLint](https://eslint.org/) - 静态质量与模式检查。价值：降低生成代码漂移。
- [Semgrep](https://semgrep.dev/) - 可定制策略规则。价值：机械化架构与安全不变量。
- [dependency-cruiser](https://github.com/sverweij/dependency-cruiser) - 依赖边界检查。价值：强制分层与方向约束。
- [Zod](https://github.com/colinhacks/zod) - 运行时 schema 校验。价值：提升边界数据安全性。

## 状态、检查点与恢复

- [PostgreSQL](https://www.postgresql.org/) - 持久化任务状态。价值：可靠恢复与进度追踪。
- [Redis](https://redis.io/) - 队列/锁/临时状态。价值：高效协调与容错。
- [Celery](https://github.com/celery/celery) - 分布式任务重试框架。价值：异步执行故障可恢复。
- [BullMQ](https://github.com/taskforcesh/bullmq) - JS/TS 队列与重试机制。价值：作业级恢复能力。
- [Backoff](https://github.com/litl/backoff) - 退避重试原语。价值：增强外部 API 调用韧性。

## 应用可读性与可观测性

- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) - 程序化浏览器观测。价值：让 Agent 可见 UI 行为。
- [Playwright](https://playwright.dev/) - 可重复浏览器自动化与 traces。价值：稳定复现 UI 路径。
- [OpenTelemetry](https://opentelemetry.io/) - traces/metrics/logs 统一上下文。价值：形成根因诊断闭环。
- [Prometheus](https://prometheus.io/) - 指标采集与 SLO 检查。价值：运行质量可度量。
- [Grafana Loki](https://grafana.com/oss/loki/) - LogQL 日志诊断。价值：结构化故障排查。
- [Grafana Tempo](https://grafana.com/oss/tempo/) - Trace 级调试。价值：跨服务问题定位。

## 评测与回归闭环

- [pytest](https://docs.pytest.org/) - 冒烟/回归执行层。价值：快速组织测试流程。
- [pytest-benchmark](https://github.com/ionelmc/pytest-benchmark) - 性能回归检查。价值：保护时延预算。
- [LangSmith Evaluations](https://docs.smith.langchain.com/evaluation) - 数据集+运行+评估器流水线。价值：评测运营标准化。
- [DeepEval](https://github.com/confident-ai/deepeval) - LLM 测试样例抽象。价值：复用质量断言。
- [RAGAS](https://github.com/explodinggradients/ragas) - 检索质量指标。价值：RAG 反馈更客观。

## 安全与滥用测试

- [PyRIT](https://github.com/Azure/PyRIT) - 生成式 AI 红队工具。价值：建立攻防测试流程。
- [Garak](https://github.com/NVIDIA/garak) - 基于探针的漏洞扫描器。价值：覆盖更广滥用面。
- [SafeArena (paper)](https://arxiv.org/abs/2503.04957) - Web Agent 有害性基准。价值：覆盖具体有害任务。
- [OS-Harm (paper)](https://arxiv.org/abs/2506.14866) - OS 级有害评测。价值：验证 computer-use 风险。
- [CUAHarm (paper)](https://arxiv.org/abs/2508.00935) - 有害执行任务基准。价值：执行层安全量化。

## 持续清理与反漂移

- [Renovate](https://github.com/renovatebot/renovate) - 自动依赖维护。价值：降低长期维护熵。
- [Ruff](https://github.com/astral-sh/ruff) - 高性能 Python lint/format。价值：低成本高频清理。
- [Biome](https://github.com/biomejs/biome) - JS/TS 格式化与静态检查。价值：稳定生成结果一致性。
- [SonarQube](https://www.sonarsource.com/products/sonarqube/) - 长周期质量趋势监控。价值：提前发现漂移。

## 贡献指南

欢迎贡献。

格式：

- `- [Name](link) - short description. 价值：该资源如何帮助 long-horizon harness。`

规则：

- 仅收录与长程 Agent Harness Engineering 直接相关的条目。
- 优先官方文档、原始仓库、论文主来源。
- 避免重复和营销化条目。
- 描述保持简洁、客观。
