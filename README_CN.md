# Awesome Harness Engineering [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

[English](./README.md) | 中文

面向 LLM 与 Agent 系统的评测 harness 资源、框架、数据集与实践指南精选清单。

Harness engineering 的核心是运行可复现、接近生产环境的评测，让团队在质量、安全、时延、成本上更快迭代且更少回归。

## 目录

- [基础方法](#基础方法)
- [通用评测框架](#通用评测框架)
- [Agent 与浏览器环境](#agent-与浏览器环境)
- [基准测试](#基准测试)
- [安全与有害性评测](#安全与有害性评测)
- [可观测性与报告](#可观测性与报告)
- [CI 与回归流程](#ci-与回归流程)
- [快速落地蓝图](#快速落地蓝图)
- [贡献指南](#贡献指南)

## 基础方法

- [OpenAI - Harness Engineering](https://openai.com/index/harness-engineering/) - 设计与运营评测 harness 的实践方法论。
- [openai/evals](https://github.com/openai/evals) - 模型评测的开源框架与示例。
- [Promptfoo](https://github.com/promptfoo/promptfoo) - 支持断言、红队检查与 CI 集成的提示词与模型评测工具。

## 通用评测框架

- [Confident AI DeepEval](https://github.com/confident-ai/deepeval) - 具备测试样例抽象能力的端到端 LLM 评测框架。
- [TruLens](https://github.com/truera/trulens) - 面向 LLM 应用的可观测与评测工具。
- [RAGAS](https://github.com/explodinggradients/ragas) - 以指标为中心的 RAG 评测框架。
- [LangSmith Evaluations](https://docs.smith.langchain.com/evaluation) - 覆盖数据集、运行与评估器工作流的评测平台。
- [MLflow Evaluation](https://mlflow.org/docs/latest/llms/llm-evaluate/index.html) - 统一追踪与评测流水线。

## Agent 与浏览器环境

- [BrowserGym](https://github.com/ServiceNow/BrowserGym) - 浏览器 Agent 基准测试的统一环境层。
- [WebArena](https://github.com/web-arena-x/webarena) - 面向自主网页 Agent 的真实任务环境。
- [VisualWebArena](https://github.com/web-arena-x/visualwebarena) - WebArena 的多模态扩展版本。
- [OSWorld](https://github.com/xlang-ai/OSWorld) - 面向 computer-use agent 的桌面与操作系统级环境。
- [MiniWoB++](https://github.com/Farama-Foundation/miniwob-plusplus) - 轻量级网页任务环境，适合快速迭代与调试。

## 基准测试

- [SWE-bench](https://github.com/SWE-bench/SWE-bench) - 基于真实 GitHub issue 的代码 Agent 基准。
- [GAIA](https://huggingface.co/gaia-benchmark) - 强调多步推理与工具使用的通用助手基准。
- [AgentBench](https://github.com/THUDM/AgentBench) - 覆盖多环境的 Agent 基准套件。
- [WebArena Leaderboard](https://webarena.dev/) - Web Agent 公共排行榜与基准资源。

## 安全与有害性评测

- [SafeArena (paper)](https://arxiv.org/abs/2503.04957) - 面向 Web Agent 的有害性评测基准。
- [OS-Harm (paper)](https://arxiv.org/abs/2506.14866) - 面向 OS-level computer-use agent 的有害与滥用评测。
- [CUAHarm (paper)](https://arxiv.org/abs/2508.00935) - 评测 computer-use agent 执行有害任务能力的基准。
- [microsoft/PyRIT](https://github.com/Azure/PyRIT) - 生成式 AI 红队测试工具包。
- [NVIDIA Garak](https://github.com/NVIDIA/garak) - LLM 漏洞扫描工具，支持多类探针和检测器。

## 可观测性与报告

- [Langfuse](https://github.com/langfuse/langfuse) - 面向 LLM trace 与评测的开源可观测平台。
- [Weights & Biases Weave](https://wandb.ai/site/weave/) - LLM 应用的追踪、对比与评测工具。
- [Arize Phoenix](https://github.com/Arize-ai/phoenix) - 面向 RAG 与 Agent 系统的追踪与评测工具。

## CI 与回归流程

- [GitHub Actions](https://docs.github.com/actions) - 常用 CI 平台，用于自动化执行 harness。
- [pytest](https://docs.pytest.org/) - 常作为评测套件执行层的测试框架。
- [pytest-benchmark](https://github.com/ionelmc/pytest-benchmark) - 用于时延敏感场景的性能回归检查。

## 快速落地蓝图

一个最小可用 harness 栈应包含：

- `datasets/`: 冒烟、回归、对抗评测集
- `runner/`: 执行与轨迹采集
- `judges/`: 规则判分与模型判分
- `reports/`: 指标汇总与失败对比

建议持续追踪的核心指标：

- `task_success_rate`（任务完成率）
- `critical_error_rate`（关键错误率）
- `safety_violation_rate`（安全违规率）
- `latency_p50/p95`（时延分位）
- `cost_per_task`（单任务成本）
- `regression_delta`（相对基线回归变化）

推荐评测循环：

1. 先跑 `smoke` 冒烟集，快速给 PR 反馈。
2. 再跑 `regression` 回归集，覆盖已知失败模式。
3. 发布前用质量、安全、时延、成本阈值做 gate。

## 贡献指南

欢迎贡献。

请遵循以下规则：

- 仅添加与 harness engineering 或评测运营直接相关的资源。
- 使用统一格式：`- [Name](link) - short description`。
- 描述要客观且简洁。
- 避免重复链接与营销化描述。
- 论文优先使用 arXiv 或主发布页面链接。

如果不确定资源是否合适，请先提 issue 讨论。
