# Awesome Harness Engineering [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

[English](./README.md) | 中文

一个关于 AI Agent **Harness Engineering** 的精选清单，聚焦 `Report`、`Blog` 和 `Research` 三类内容。

## 目录

- [Report](#report)
- [Blog](#blog)
- [Research](#research)

## Report

- [OpenAI - Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/) - 2026-02-11。解释为什么 Agent 的可靠性主要取决于 harness 设计，而不只是模型能力。
- [OpenAI - Unlocking the Codex harness: how we built the App Server](https://openai.com/index/unlocking-the-codex-harness/) - 2026-02-04。介绍 Codex harness 背后的协议、线程和事件流设计。
- [OpenAI - From model to agent: Equipping the Responses API with a computer environment](https://openai.com/index/equip-responses-api-computer-environment) - 2026-03-11。介绍如何把 computer environment 接入 agent loop。
- [Anthropic - Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) - 2025-11-26。介绍长时运行 coding harness、进度文件和更紧凑的执行闭环。
- [Anthropic - Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) - 2026-01-09。介绍如何通过持续评测让 Agent 质量变得可衡量。

## Blog

- [Anthropic - Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents/) - 2025-09-29。关于多步 Agent 的上下文组织与信息装载实践。
- [OpenClaw Docs - Agent workspace](https://docs.openclaw.ai/agent-workspace) - 介绍 PC-based harness 如何把 workspace 作为 agent 的持久工作空间。
- [OpenClaw Docs - Memory](https://docs.openclaw.ai/concepts/memory) - 介绍如何把持久记忆存到文件，而不只依赖上下文窗口。
- [OpenClaw Docs - Sandboxing](https://docs.openclaw.ai/gateway/sandboxing) - 介绍 OpenClaw 的 `session / agent / shared` 隔离模型。
- [OpenClaw Docs - Browser](https://docs.openclaw.ai/tools/browser) - 介绍 `snapshot`、`screenshot` 和 `act` 这类浏览器能力。
- [OpenClaw Docs - Security](https://docs.openclaw.ai/security) - 介绍 computer-use 系统里的浏览器访问、主机控制与权限边界。
- [Anthropic Docs - Manage Claude's memory](https://docs.anthropic.com/en/docs/claude-code/memory) - 介绍 Claude Code 的项目级、用户级和组织级记忆分层。
- [Anthropic Docs - Hooks reference](https://docs.anthropic.com/en/docs/claude-code/hooks) - 介绍如何在 tool use 前后接入外部检查。
- [Anthropic Docs - Claude Code settings](https://docs.anthropic.com/en/docs/claude-code/settings) - 介绍 code-based harness 的权限和工具配置方式。
- [Manus Docs - Welcome](https://manus.im/docs/en/introduction/welcome) - 介绍 Manus 如何定义带虚拟电脑和持久文件系统的 sandbox 环境。
- [Manus - Agent Skills](https://manus.im/features/agent-skills) - 介绍 Manus 如何把可复用工作流打包成 skills。

## Research

- [SafeArena](https://arxiv.org/abs/2503.04957) - 关注 web agent 有害行为与高风险任务执行的 benchmark。
- [OS-Harm](https://arxiv.org/abs/2506.14866) - 衡量 computer-use agent 在操作系统层面风险的 benchmark。
- [CUAHarm](https://arxiv.org/abs/2508.00935) - 评估有害 computer-use 任务执行的 benchmark。
