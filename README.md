# Awesome Harness Engineering [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

English | [中文](./README_ZH.md)

A curated list of reports, blog posts, and research papers about **harness engineering** for AI agents.

## Contents

- [Report](#report)
- [Blog](#blog)
- [Research](#research)

## Report

- [OpenAI - Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/) - 2026-02-11. A clear report on why agent reliability depends on harness design, not just model quality.
- [OpenAI - Unlocking the Codex harness: how we built the App Server](https://openai.com/index/unlocking-the-codex-harness/) - 2026-02-04. A report on the protocol, threading, and event surfaces behind the Codex harness.
- [OpenAI - From model to agent: Equipping the Responses API with a computer environment](https://openai.com/index/equip-responses-api-computer-environment) - 2026-03-11. A report on connecting a computer environment to an agent loop.
- [Anthropic - Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) - 2025-11-26. A report on long-running coding harnesses, progress files, and tighter execution loops.
- [Anthropic - Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) - 2026-01-09. A report on making agent quality measurable through continuous evaluation.

## Blog

- [Anthropic - Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents/) - 2025-09-29. Practical writing on context assembly and information loading for multi-step agents.
- [OpenClaw Docs - Agent workspace](https://docs.openclaw.ai/agent-workspace) - How a PC-based harness uses the workspace as the agent's durable home.
- [OpenClaw Docs - Memory](https://docs.openclaw.ai/concepts/memory) - How durable memory is stored in files instead of only in the context window.
- [OpenClaw Docs - Sandboxing](https://docs.openclaw.ai/gateway/sandboxing) - How OpenClaw isolates execution with `session / agent / shared` scopes.
- [OpenClaw Docs - Browser](https://docs.openclaw.ai/tools/browser) - How browser tooling exposes `snapshot`, `screenshot`, and `act`.
- [OpenClaw Docs - Security](https://docs.openclaw.ai/security) - How computer-use systems handle browser access, host control, and permissions.
- [Anthropic Docs - Manage Claude's memory](https://docs.anthropic.com/en/docs/claude-code/memory) - How Claude Code layers project, user, and organization memory.
- [Anthropic Docs - Hooks reference](https://docs.anthropic.com/en/docs/claude-code/hooks) - How to attach external checks before and after tool use.
- [Anthropic Docs - Claude Code settings](https://docs.anthropic.com/en/docs/claude-code/settings) - How code-based harnesses define permissions and tool configuration.
- [Manus Docs - Welcome](https://manus.im/docs/en/introduction/welcome) - How Manus frames a sandbox-based environment with a virtual computer and persistent filesystem.
- [Manus - Agent Skills](https://manus.im/features/agent-skills) - How Manus packages reusable workflows as skills.

## Research

- [SafeArena](https://arxiv.org/abs/2503.04957) - A benchmark focused on harmful web-agent behavior and risky task execution.
- [OS-Harm](https://arxiv.org/abs/2506.14866) - A benchmark for measuring operating-system-level harm in computer-use agents.
- [CUAHarm](https://arxiv.org/abs/2508.00935) - A benchmark for evaluating harmful computer-use task execution.
