# Awesome Harness Engineering [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

[English](./README.md) | 中文

一个关于 AI Agent **Harness Engineering** 的精选清单，聚焦 `Report`、`Blog` 和 `Research` 三类内容。

## 什么是 Harness Engineering？

Harness engineering 指的是，不直接改模型本身，而是去工程化它外围的整套系统：运行时、工具、上下文、记忆、验证机制和控制流。

最短的一句话是：`agent 不是只有模型，它是 模型 + harness。`

Harness 就是那一层真正决定模型如何在现实里工作的系统。它决定 agent 能看到什么、能调用什么工具、哪些指令可以长期保留、结果如何被验证、失败如何被暴露出来，以及上下文如何保持足够干净，避免模型越做越乱。

这件事重要，是因为很多真实世界里的 agent 失败，并不是单纯因为模型“不够聪明”。更常见的原因是外围系统太弱：暴露了错误的工具、塞进了太多无关上下文、没有机械化验证、输出不可回放，或者让 agent 在没有有效反馈的情况下空转。模型变强当然有帮助，但更好的 harness 往往能更直接地改变失败率。

对一般意义上的 agent 来说，harness engineering 通常是在回答这些问题：

- agent 到底能看到什么、记住什么、操作什么？
- 怎样给它新能力，同时不让系统变得嘈杂和不稳定？
- 怎样让“完成”由环境或验证器来判断，而不是靠模型猜？
- 怎样让长任务在多轮执行中保持连贯？
- 怎样把重复出现的失败变成一次性的系统修复？

对 coding agent 来说，这些问题又常常会具体表现为：

- 怎样让 agent 学会训练数据里没有的代码库规则？
- 怎样在不污染上下文窗口的前提下给它新能力？
- 怎样用机械化验证，而不是靠模型自己宣布“完成了”？
- 怎样让长任务保持连贯，而不是随着上下文变长逐渐失控？
- 怎样把一种重复出现的错误，变成一次性的工程修复？

典型的 harness 组件包括 prompt 与 agent files，tools 与 MCP servers，skills，sub-agents，hooks，memory files，以及 tests、typechecks、approval gates、workflow checks 这类 verifier 和 back-pressure 机制。

所以，当一个 agent 一直重复犯同一种错时，harness engineering 的意思不是继续责怪模型，而是修改模型外面的那套系统，让这种错误下次更难发生、更容易被发现，或者根本无法被合并出去。

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

## 目录

- [现有 Harness 例子](#现有-harness-例子)
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
