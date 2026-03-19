# Awesome Harness Engineering [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

English | [中文](./README_ZH.md)

A curated list of reports, blog posts, and research papers about **harness engineering** for AI agents.

## What Is Harness Engineering?

Harness engineering is the practice of improving an AI agent by engineering everything around the model: its runtime, tools, context, memory, verification, and control flow.

The shortest way to say it is: `an agent is not just a model, it is a model plus a harness.`

The harness is the layer that determines how the model actually works in the world. It decides what the agent can see, what tools it can call, what instructions stay durable, how results are checked, how failures are surfaced, and how context is kept clean enough for the model to keep thinking clearly.

This matters because many real agent failures are not caused by the model being "too dumb." They happen because the surrounding system is weak: the wrong tools are exposed, too much irrelevant context is loaded, verification is missing, outputs are not replayable, or the agent is allowed to loop without meaningful feedback. In practice, better models help, but better harnesses change the failure rate much more directly.

For agents in general, harness engineering usually answers questions like:

- What can the agent see, remember, and act on?
- How does it gain new capabilities without becoming noisy or unstable?
- How is success checked by the environment instead of guessed by the model?
- How are long-running tasks kept coherent over time?
- How do repeated failures become one-time system fixes?

For coding agents specifically, that often becomes:

- How does the agent learn repo-specific rules that are not in training data?
- How do we give it new capabilities without polluting the context window?
- How do we verify work mechanically instead of trusting the model to declare success?
- How do we keep long tasks coherent instead of letting context rot set in?
- How do we turn a repeated failure into a one-time engineering fix?

Typical harness components include prompts and agent files, tools and MCP servers, skills, sub-agents, hooks, memory files, verifiers, and back-pressure mechanisms such as tests, typechecks, approval gates, or workflow checks.

So when an agent keeps making the same mistake, harness engineering means changing the system around the model so that mistake becomes harder to make next time, easier to detect, or impossible to ship.

## Existing Harnesses

- [Codex](https://openai.com/codex/) - A coding-agent harness centered on repositories, tools, verification, and agentic software workflows.
- [Claude Code](https://docs.anthropic.com/en/docs/claude-code/overview) - A coding-agent harness built around repo access, memory, hooks, settings, and tool use.
- [OpenHands](https://docs.openhands.dev/) - An open coding-agent harness with sandboxed execution and repository-centered task loops.
- [Aider](https://aider.chat/docs/) - A terminal-first coding-agent harness focused on code editing, Git workflows, and pair-programming-style iteration.
- [Cline](https://docs.cline.bot/) - A coding-agent harness for editor-driven coding workflows with tool use and file operations.
- [Goose](https://block.github.io/goose/) - An open agent harness for developer workflows with tools, extensions, and local execution.
- [Gemini CLI](https://docs.cloud.google.com/gemini/docs/codeassist/gemini-cli) - A coding-agent harness delivered through a terminal interface for code and developer tasks.
- [OpenClaw](https://docs.openclaw.ai/index) - A computer-use harness centered on browser control, workspaces, snapshots, and sandbox boundaries.
- [Responses API + computer environment](https://openai.com/index/equip-responses-api-computer-environment) - A computer-use harness pattern that pairs the model with a real computer environment and tool-driven interaction.
- [Manus](https://manus.im/docs) - A general-purpose sandbox harness combining a virtual computer, persistent filesystem, network access, and long-running execution.

## Contents

- [Existing Harnesses](#existing-harnesses)
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
