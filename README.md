# Awesome Harness Engineering [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

English | [中文](./README_ZH.md)

A curated list of reports, blog posts, and research papers about **harness engineering** for AI agents.

## Contents

- [What Is Harness Engineering?](#what-is-harness-engineering)
- [Core Principles](#core-principles)
- [Harness Components](#harness-components)
- [Harness Layers](#harness-layers)
- [Harness vs Framework](#harness-vs-framework)
- [Existing Harnesses](#existing-harnesses)
- [Report](#report)
- [Blog](#blog)
- [Research](#research)

## What Is Harness Engineering?

Harness engineering is the discipline of designing the system around an AI agent so it can do reliable work in the real world.

The short version is: `an agent is not just a model; it is a model plus a harness.`

An `agent harness` is everything around the model itself: session management, context delivery, tool design, memory, architectural constraints, verification, failure recovery, and human oversight. It is the layer that decides what the agent can see, what it can do, how it gets feedback, and how its work is checked before anyone trusts it.

This matters because many agent failures are not really model failures. They are harness failures. The model had the wrong tools, too much irrelevant context, no durable memory, no mechanical verifier, or no safe way to recover from mistakes. Better models help, but better harnesses usually improve reliability faster.

In practice, harness engineering is about questions like:

- What should the agent be allowed to see, remember, and act on?
- How do we give it new capabilities without overwhelming its context window?
- How do we enforce rules mechanically instead of hoping the model follows them?
- How do we verify outputs with tests, checks, reviewers, or environment feedback?
- How do we make repeated failures cheaper by fixing the system instead of repeating the prompt?

In other words, an agent harness is the infrastructure that wraps around an agent. When a team stops spending most of its effort on writing code directly and instead spends it on designing environments, specifying intent, and building feedback loops that let agents work reliably, that team is doing harness engineering.

## Core Principles

- Humans steer, agents execute.
- Repository or workspace knowledge should be the system of record.
- If knowledge is not machine-readable in the working environment, it effectively does not exist to the agent.
- `AGENTS.md` should be a table of contents, not an encyclopedia.
- Fewer, more expressive tools usually beat long menus of narrow ones.
- Progressive disclosure beats loading everything up front.
- Architecture and quality constraints should be enforced mechanically.
- Agent legibility matters: the environment, code, logs, and docs should be easy for the agent to inspect and reason about.
- Corrections are often cheaper than waiting; high-throughput agent systems need fast feedback and fix-forward loops.
- The goal is not just model intelligence, but agent legibility, control, and recoverability.

## Harness Components

Common harness components include:

- Session management: how work is started, resumed, isolated, and stopped.
- Context delivery: which instructions, docs, specs, and memories enter the context window.
- Tool design: the commands, APIs, browsers, or files the agent can act through.
- Memory: durable notes, state, plans, artifacts, and repository knowledge.
- Constraints: architecture rules, permissions, approvals, and policy boundaries.
- Verification: tests, typechecks, evals, reviewers, and environment feedback.
- Failure recovery: retries, checkpoints, rollback paths, and resumable workflows.
- Human oversight: approval gates, review steps, escalation paths, and intervention points.

## Harness Layers

Harnesses are often easier to understand as a stack of layers around the agent:

- Execution layer: the agent itself and the immediate tools it uses.
- Runtime layer: memory, session state, sandboxes, workspaces, browser environments, and long-running execution.
- Orchestration layer: task routing, parallel agents, worktrees, approval flows, and issue-to-PR pipelines.
- Requirements layer: specs, plans, acceptance criteria, and agent-readable instructions.
- Standards layer: formats and protocols such as `AGENTS.md`, `agents.md`, MCP, and agent-to-agent communication patterns.

Not every harness includes all of these layers, but most production systems combine several of them.

## Harness vs Framework

A framework gives you building blocks for constructing agent systems. A harness is the actual operating system around an agent: the environment, rules, tools, memory, verification loop, and recovery paths that determine whether the agent is useful in practice.

Frameworks help you build harnesses. Harnesses are what agents actually run inside.

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
