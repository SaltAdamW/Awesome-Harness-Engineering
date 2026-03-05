# Awesome Harness Engineering [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

[English](./README.md) | 中文

聚焦 **agent-first harness engineering** 的精选清单：通过环境、约束与反馈闭环设计，让编码 Agent 能稳定地构建、测试、评审与交付。

> 核心参考： [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/)

## 目录

- [基础方法](#基础方法)
- [Agent-First 工作流](#agent-first-工作流)
- [仓库作为事实系统](#仓库作为事实系统)
- [架构与不变量约束](#架构与不变量约束)
- [应用可读性与可观测性](#应用可读性与可观测性)
- [评测与回归闭环](#评测与回归闭环)
- [安全与滥用测试](#安全与滥用测试)
- [持续清理与反漂移](#持续清理与反漂移)
- [贡献指南](#贡献指南)

## 基础方法

- [OpenAI - Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/) - 核心工作范式：人类负责引导，Agent 负责执行。
- [openai/evals](https://github.com/openai/evals) - 可复现模型评测的开源框架。
- [Promptfoo](https://github.com/promptfoo/promptfoo) - 支持断言、红队检查和 CI 集成的评测工作流。

## Agent-First 工作流

- [GitHub CLI](https://cli.github.com/) - 用脚本化方式驱动 PR 生命周期，适配 Agent 迭代。
- [GitHub Actions](https://docs.github.com/actions) - 自动化 run-validate-patch 循环的 CI 基础设施。
- [pre-commit](https://pre-commit.com/) - 在提交前执行基线检查，减少无效 CI 轮次。
- [Reviewdog](https://github.com/reviewdog/reviewdog) - 将 lint/test 反馈转为评审评论，便于 Agent 修复。

## 仓库作为事实系统

- [AGENTS.md](https://agents.md/) - 仓库级 Agent 指令约定。
- [MkDocs Material](https://github.com/squidfunk/mkdocs-material) - 构建可版本化、可检索的知识库文档。
- [Docusaurus](https://docusaurus.io/) - 适合长期维护的架构与产品文档系统。
- [markdownlint](https://github.com/DavidAnson/markdownlint) - 统一 Markdown 文档质量。
- [lychee](https://github.com/lycheeverse/lychee) - 文档链接检查，降低失效引用风险。

## 架构与不变量约束

- [ESLint](https://eslint.org/) - 约束 JS/TS 代码质量与结构规范。
- [dependency-cruiser](https://github.com/sverweij/dependency-cruiser) - 强制依赖方向与分层边界规则。
- [Semgrep](https://semgrep.dev/) - 自定义结构/安全规则并机械化执行。
- [mypy](https://github.com/python/mypy) - Python 类型边界不变量约束。
- [Zod](https://github.com/colinhacks/zod) - 在服务/API 边界做运行时 schema 校验。

## 应用可读性与可观测性

- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) - 程序化浏览器观测，用于 UI 验证闭环。
- [Playwright](https://playwright.dev/) - 浏览器自动化、截图和 trace 采集。
- [OpenTelemetry](https://opentelemetry.io/) - 统一 traces/metrics/logs 关联分析。
- [Prometheus](https://prometheus.io/) - 指标采集与时延/SLO 检查。
- [Grafana Loki](https://grafana.com/oss/loki/) - 支持 LogQL 的日志查询系统。
- [Grafana Tempo](https://grafana.com/oss/tempo/) - 面向 TraceQL 场景的链路追踪存储。

## 评测与回归闭环

- [pytest](https://docs.pytest.org/) - 冒烟/回归套件的执行层。
- [pytest-benchmark](https://github.com/ionelmc/pytest-benchmark) - 性能回归跟踪。
- [LangSmith Evaluations](https://docs.smith.langchain.com/evaluation) - 数据集、运行与评估器工作流。
- [DeepEval](https://github.com/confident-ai/deepeval) - LLM 测试样例抽象与断言体系。
- [RAGAS](https://github.com/explodinggradients/ragas) - 面向检索增强系统的质量指标。

## 安全与滥用测试

- [PyRIT](https://github.com/Azure/PyRIT) - 生成式 AI 红队测试工具。
- [Garak](https://github.com/NVIDIA/garak) - 模块化探针驱动的 LLM 漏洞扫描工具。
- [SafeArena (paper)](https://arxiv.org/abs/2503.04957) - Web Agent 有害性基准。
- [OS-Harm (paper)](https://arxiv.org/abs/2506.14866) - OS 级 Agent 有害与滥用评测。
- [CUAHarm (paper)](https://arxiv.org/abs/2508.00935) - computer-use agent 有害任务执行基准。

## 持续清理与反漂移

- [Renovate](https://github.com/renovatebot/renovate) - 通过自动 PR 持续维护依赖。
- [Ruff](https://github.com/astral-sh/ruff) - 高性能 Python lint/format，适合周期性清理任务。
- [Biome](https://github.com/biomejs/biome) - JS/TS 统一格式化与静态检查工具。
- [SonarQube](https://www.sonarsource.com/products/sonarqube/) - 长周期代码质量趋势与问题监控。

## 贡献指南

欢迎贡献。

请使用以下格式：

- `- [Name](link) - short description`

规则：

- 仅收录与 agent-first harness engineering 直接相关的条目。
- 优先官方文档、原始仓库、论文主来源。
- 避免重复和营销化描述。
- 描述保持简洁、客观。
