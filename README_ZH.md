# Awesome Harness Engineering [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

[English](./README.md) | 中文

一个关于 AI Agent **Harness Engineering** 的精选清单，聚焦 `Report`、`Blog` 和 `Research` 三类内容。

## 目录

- [什么是 Harness Engineering？](#什么是-harness-engineering)
- [核心原则](#核心原则)
- [Harness 组件](#harness-组件)
- [Harness 分层](#harness-分层)
- [Harness 与 Framework 的区别](#harness-与-framework-的区别)
- [现有 Harness 例子](#现有-harness-例子)
- [Report](#report)
- [Blog](#blog)
- [Research](#research)

## 什么是 Harness Engineering？

Harness engineering 指的是：去设计 AI agent 外围的整套系统，让它能在真实环境里可靠地工作。

最短的一句话是：`agent 不只是模型，它是 模型 + harness。`

所谓 `agent harness`，就是模型之外的那一整层基础设施：session management、context delivery、tool design、memory、architecture constraints、verification、failure recovery，以及 human oversight。它决定 agent 能看到什么、能做什么、如何获得反馈，以及在结果被信任之前，如何被检查。

这件事重要，是因为很多 agent 的失败，本质上并不是模型失败，而是 harness 失败。模型拿到了错误的工具、被塞进太多无关上下文、没有持久记忆、没有机械化 verifier，或者出了错以后没有安全的恢复路径。模型变强当然有帮助，但更好的 harness 往往能更快地提升可靠性。

在实践里，harness engineering 主要是在回答这些问题：

- agent 应该被允许看到什么、记住什么、操作什么？
- 怎样给它新能力，同时不把上下文窗口塞爆？
- 怎样把规则做成机械化约束，而不是只靠模型“自觉遵守”？
- 怎样用 tests、checks、reviewers 或环境反馈来验证输出？
- 怎样把一种重复出现的失败，变成一次系统修复，而不是一次次重写 prompt？

换句话说，agent harness 就是包裹在 agent 外围的基础设施。当一个团队不再把主要精力放在直接写代码上，而是把主要精力放在设计环境、明确意图、构建反馈回路，让 agent 能可靠地工作时，这个团队就在做 harness engineering。

## 核心原则

- Humans steer, agents execute。
- Repository 或 workspace knowledge 应该成为 system of record。
- 如果知识没有以 machine-readable 的形式进入工作环境，对 agent 来说它实际上就是不存在的。
- `AGENTS.md` 应该是目录，而不是百科全书。
- 更少但更有表达力的工具，通常优于一长串细碎工具。
- Progressive disclosure 通常优于一开始把所有东西都塞进上下文。
- 架构约束与质量要求应该被机械化执行。
- Agent legibility 很重要：环境、代码、日志和文档都应该让 agent 容易检查、容易推理。
- 在高吞吐 agent 系统里，修正通常比等待更便宜；需要快速反馈和 fix-forward 循环。
- 目标不只是让模型更聪明，而是让 agent 更可读、可控、可恢复。

## Harness 组件

常见的 harness 组件包括：

- Session management：任务如何启动、恢复、隔离和停止。
- Context delivery：哪些 instructions、docs、specs 和 memories 会进入上下文窗口。
- Tool design：agent 通过哪些命令、API、浏览器或文件来行动。
- Memory：持久笔记、状态、计划、产物和仓库知识。
- Constraints：架构规则、权限、审批和策略边界。
- Verification：tests、typechecks、evals、reviewers 以及环境反馈。
- Failure recovery：重试、检查点、回滚路径和可恢复工作流。
- Human oversight：审批关口、review 步骤、升级路径和人工介入点。

## Harness 分层

把 harness 看成围绕 agent 的几层结构，通常会更容易理解：

- Execution layer：agent 本身，以及它直接使用的工具。
- Runtime layer：memory、session state、sandboxes、workspaces、browser environments 和长时执行能力。
- Orchestration layer：任务分发、并行 agents、worktrees、审批流，以及 issue-to-PR 流水线。
- Requirements layer：specs、plans、acceptance criteria，以及 agent 可读的指令。
- Standards layer：`AGENTS.md`、`agents.md`、MCP，以及 agent-to-agent communication patterns 这类格式与协议。

不是每个 harness 都会包含所有这些层，但多数生产系统都会组合其中的几层。

## Harness 与 Framework 的区别

Framework 提供的是构建 agent 系统的积木。Harness 则是 agent 实际运行在其中的那套操作环境：环境、规则、工具、记忆、验证闭环，以及恢复路径。真正决定 agent 在实践中是否有用的，是 harness。

Framework 帮你搭 harness。Harness 才是 agent 真正运行在其中的东西。

## 现有 Harness 例子

- [Codex](https://openai.com/codex/) - 一个围绕代码仓库、工具、验证与 agentic software workflow 构建的 coding-agent harness。
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) - 一个围绕 repo 访问、memory、hooks、settings 和 tool use 构建的 coding-agent harness。
- [OpenHands](https://docs.openhands.dev/) - 一个带 sandbox 执行环境、以代码仓库任务循环为中心的开放式 coding-agent harness。
- [Aider](https://aider.chat/docs/) - 一个终端优先的 coding-agent harness，强调代码编辑、Git 工作流和结对式迭代。
- [Cline](https://docs.cline.bot/) - 一个面向编辑器工作流的 coding-agent harness，强调工具调用与文件操作。
- [Goose](https://block.github.io/goose/) - 一个面向开发者工作流的开放式 agent harness，支持工具、扩展和本地执行。
- [Gemini CLI](https://docs.cloud.google.com/gemini/docs/codeassist/gemini-cli) - 一个通过终端提供代码与开发任务能力的 coding-agent harness。
- [OpenClaw](https://docs.openclaw.ai/index) - 一个以浏览器控制、workspace、snapshots 和 sandbox 边界为核心的 computer-use harness。
- [Responses API + computer environment](https://openai.com/index/equip-responses-api-computer-environment) - 一个把模型与真实 computer environment 及工具驱动交互结合起来的 computer-use harness 形态。
- [Manus](https://manus.im/docs) - 一个通用 sandbox harness，把虚拟电脑、持久文件系统、网络访问和长时执行放进同一个系统。

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
