# Awesome Harness Engineering [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

[English](./README_EN.md) | 中文

面向 **Harness Engineering** 的精选清单与最小实验仓库。

这个项目关注的不是“如何再做一个 Agent 框架”，而是：

- 如何给 Agent 提供一个更稳定的执行环境
- 如何把失败变成可恢复、可定位、可回放的工程问题
- 如何通过约束、反馈、日志、评测，让 agent 执行逐步收敛

如果你认同下面这个判断，这个仓库就适合你：

> Agent 在真实环境里失败，通常不是因为“模型不够聪明”，而是因为缺少足够好的 harness engineering。

![Harness loop and three harness families](./assets/harness-taxonomy.svg)

## 先给不熟悉这个领域的人一句话

`harness = 给 agent 搭一个会做事、会看结果、会纠错的工作台。`

没有 harness，模型通常只是“会回答”；有了 harness，模型才开始“会执行”。

更工程化一点地说，harness 是把下面这些部件接成闭环的系统：

- `task`：任务目标
- `environment`：真实工作环境，比如代码仓库、浏览器、电脑、容器
- `tools`：模型可以调用的动作接口
- `feedback`：动作执行后的真实返回
- `verifier`：外部验收与完成判断
- `memory`：进度、日志、检查点、长期记忆
- `guardrails`：权限边界、审批、风险控制

![Harness components](./assets/harness-components.svg)

## 什么是 Harness

### 它不是什么

- 不是单个 prompt
- 不是“让模型自己多想一会儿”
- 不是“给模型接几个工具”就结束
- 不是纯模型训练问题

### 它是什么

Harness 的核心是一个可重复执行的闭环：

`Observe -> Act -> Feedback -> Verify -> Retry/Stop -> Persist`

如果用一个通俗类比：

- LLM 像一个会思考的实习生
- tools 是它手里的工具
- environment 是它工作的地方
- verifier 是验收机制
- memory 是工作记录
- harness 就是把这些东西组织成一个稳定工作流的系统

## 为什么 Harness 能让 Agent 更强

在短任务里，prompt 和模型能力往往决定上限；但在多步任务和真实环境里，真正决定成败的通常是下面这些“工程层能力”：

- **环境可复现**：同一个任务能否稳定复跑
- **动作可约束**：模型是否只能在允许的边界内行动
- **状态可持久化**：中断、超时、失败后能否继续
- **反馈可诊断**：失败能否留下足够信息帮助纠错
- **质量可回归**：每次修改后能否机械地验证“更好了”

可以把它近似理解成一种“无参数更新、但有外部反馈闭环的 policy improvement”。这是本文的工程化工作定义，不是严格的 RL 术语。重点在于：能力提升很多时候并不来自参数更新，而来自更好的 `action-feedback loop`。

没有 harness 时，模型更多是在“猜”；有 harness 时，模型可以：

- 观察真实环境
- 执行真实动作
- 得到真实反馈
- 根据反馈修正
- 把状态保存到下一轮继续

## 一个最小 Harness 链路

如果你要从 0 给别人解释什么是 harness，用下面这条最小链路最清楚：

`Task -> Context -> Action -> Feedback -> Verify -> Retry/Stop -> Persist`

![Minimal harness loop](./assets/harness-minimal-loop.svg)

每一环的含义如下：

1. `Task`
   把目标说清楚，例如“修复 bug 并让测试通过”。
2. `Context`
   告诉 agent 当前仓库、可用工具、限制条件、完成标准。
3. `Action`
   agent 选择一个动作，例如读文件、运行测试、点击按钮、执行脚本。
4. `Feedback`
   环境返回真实结果，例如报错、截图、DOM、exit code、diff。
5. `Verify`
   外部 verifier 判断当前是否完成，或者离完成还差什么。
6. `Retry/Stop`
   harness 决定继续、重试、回滚、请求人工确认，还是结束。
7. `Persist`
   把本轮的动作、结果、结论、剩余问题写入日志和状态。

一个最简单的 coding 例子：

- `task`：修复某个函数
- `action`：读代码、运行测试、修改文件
- `feedback`：测试报错信息
- `verify`：测试全部通过
- `persist`：保存 diff、日志、进度文件

只要这条链跑起来，哪怕工具很少，也已经是一个最小 harness。

## Harness 的常用设计技巧

这部分是最值得落地的 checklist。很多 agent 体验差，不是模型差，而是下面这些点没设计好。

![Common harness design techniques](./assets/harness-techniques.svg)

- **缩小动作空间**
  只暴露少量高价值动作。动作空间越小，行为越稳定。coding 场景里，`read / bash / edit / write` 往往已经够用。
- **把成功条件外部化**
  不要让模型自己说“我完成了”。用测试、断言、脚本、页面状态、文件产物来机械判定。
- **给中间反馈，不只看最终成败**
  最终 reward 太稀疏时，agent 很容易乱试。中间反馈如“测试通过数增加”“页面进入目标区域”“依赖安装成功”更有用。
- **把状态写到环境外部**
  用 `progress.md`、JSON state、artifacts、checkpoints、git history 保存进度，避免上下文窗口一断就失忆。
- **把恢复机制设计成默认路径**
  超时、重试、回滚、resume、step budget 都不应是补丁，而应是默认设计的一部分。
- **加日志和回放**
  没有 event log、trace、replay，你就很难知道 agent 为什么失败。
- **做风险分级**
  读操作、分析操作可以自动执行；危险写操作、登录、付款、外发消息这类动作应审批或隔离。
- **持续做 eval 与回归**
  harness 不是搭起来就结束。每次改 verifier、工具、上下文拼装方式，都可能让系统退化。

## 三类典型 Harness

站在工程实现上，当前最常见的 harness 可以粗分为三类：

1. `PC-based harness`
2. `Code-based harness`
3. `Sandbox-based harness`

这三类并不是严格互斥的产品分类，更像三种不同的环境中心。很多系统会混合使用，但它们各自的主导约束不同。

![Harness family comparison](./assets/harness-families-comparison.svg)

### 1. OpenClaw 一类：PC-based Harness

这类 harness 以“真实电脑或浏览器”作为主环境，重点是 GUI、浏览器、消息入口和本机能力。

**典型环境**

- 本地电脑
- 浏览器或桌面应用
- 聊天入口、通知、文件系统、系统权限

**典型动作**

- `click`
- `type`
- `scroll`
- `open`
- `screenshot`
- 浏览器 snapshot / act

**典型反馈**

- 截图
- UI tree / accessibility tree
- 页面文本
- 浏览器状态
- 外部应用状态

**为什么它重要**

它最接近“真实用户操作”，能覆盖网页、桌面、消息、账号体系这些传统 code agent 覆盖不到的任务。

**为什么它难**

- 观察噪声大，GUI 变化快
- 登录态、权限、反机器人机制复杂
- 高风险动作多，容易误操作真实账户和真实系统
- 反馈往往比 coding 场景稀疏，不是每一步都有明确对错

**常见技巧**

- 用结构化 snapshot，而不是只看截图
- 给浏览器或应用专门配置独立 profile
- 对高风险目标开启人工确认
- 把 host control、sandbox control、workspace access 分开配置
- 把记忆写到 agent workspace，而不是全塞进 prompt

**OpenClaw 里值得关注的实践**

- 官方文档把 workspace 明确定义为 agent 的“home”，并把 memory 设计成磁盘上的 Markdown，而不是仅靠上下文记忆
- sandbox 是 Docker-based 的，可按 `session / agent / shared` 设定 scope
- 浏览器工具同时支持 `snapshot`、`screenshot`、`act`，强调稳定 UI tree 而不是脆弱 selector
- 官方明确建议登录场景优先人工登录，不把账号密码交给模型

参考：

- [OpenClaw Docs - Agent workspace](https://docs.openclaw.ai/agent-workspace)
- [OpenClaw Docs - Memory](https://docs.openclaw.ai/concepts/memory)
- [OpenClaw Docs - Sandboxing](https://docs.openclaw.ai/gateway/sandboxing)
- [OpenClaw Docs - Browser](https://docs.openclaw.ai/tools/browser)
- [OpenClaw Docs - Browser Login](https://docs.openclaw.ai/tools/browser-login)
- [OpenClaw Docs - Security](https://docs.openclaw.ai/security)

### 2. Codex / Claude Code 一类：Code-based Harness

这类 harness 以“代码仓库、shell、测试系统、CI、git”作为主环境，是目前最成熟、反馈最明确的一类。

**典型环境**

- 本地代码仓库
- shell
- package manager
- test / build / lint
- git / worktree / CI

**典型动作**

- `read`
- `edit`
- `write`
- `bash`
- `run test`
- `open PR`

**典型反馈**

- 编译结果
- lint 错误
- 测试结果
- diff
- review comment
- CI 状态

**为什么它重要**

这是当前最容易做出高质量 harness 的场景，因为：

- 动作空间清楚
- verifier 明确
- 环境相对可复现
- 日志、diff、commit、CI 都天然存在

**为什么它成熟**

OpenAI 在 2026 年 2 月 11 日的 [Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering) 里强调，把更多系统状态变成 agent 可读、可改、可验证的形态，远比单纯追求“更聪明的 prompt”更有效。  
OpenAI 在 2026 年 2 月 4 日的 [Unlocking the Codex harness: how we built the App Server](https://openai.com/index/unlocking-the-codex-harness/) 里，则把 harness 进一步落到了协议、线程、事件流、审批和客户端集成层。  
Anthropic 的 Claude Code 文档则把 memory、hooks、settings 这些能力系统化了，说明 code-based harness 的重点已经不只是“工具调用”，而是“如何把团队规则、项目记忆、预检查、后检查接进 agent loop”。

**常见技巧**

- 只暴露少量高价值工具
- 用 tests / lint / build 做 verifier
- 用 `CLAUDE.md`、`AGENTS.md`、项目文档做长期记忆
- 用 hooks 在工具前后做校验、格式化、保护敏感文件
- 用 git diff / commit / worktree 做边界与恢复
- 用 review comment 和 CI 结果反哺下一轮 agent 执行

**值得关注的实践**

- Codex App Server 把 agent loop 做成了一个稳定的事件协议，方便 IDE、CLI、Web 复用同一套 harness
- Claude Code 的 memory 是层级化的，可分项目、用户、组织级
- Claude Code hooks 可以把外部脚本接到 `PreToolUse` / `PostToolUse`，把约束外部化

参考：

- [OpenAI - Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering)
- [OpenAI - Unlocking the Codex harness: how we built the App Server](https://openai.com/index/unlocking-the-codex-harness/)
- [Anthropic Docs - Manage Claude's memory](https://docs.anthropic.com/en/docs/claude-code/memory)
- [Anthropic Docs - Claude Code settings](https://docs.anthropic.com/en/docs/claude-code/settings)
- [Anthropic Docs - Hooks reference](https://docs.anthropic.com/en/docs/claude-code/hooks)
- [Anthropic - Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents/)
- [Anthropic - Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)

### 3. Manus 一类：Sandbox-based Harness

这类 harness 以“受控沙箱、容器、虚拟机、隔离工作区”作为主环境，强调安全隔离、多工具编排和多步自主执行。

**典型环境**

- 云端虚拟机
- 容器
- 隔离工作区
- 持久文件系统
- 受控网络访问

**典型动作**

- 文件操作
- shell 执行
- 浏览器操作
- 安装软件
- 运行脚本
- 生成产物

**典型反馈**

- 命令输出
- 文件产物
- 浏览器结果
- 服务状态
- 任务阶段状态

**为什么它重要**

当任务不只是“改代码”或“点网页”，而是要跨浏览器、脚本、文件、服务、数据处理一起工作时，sandbox-based harness 更通用。

**为什么它难**

- 需要在“足够开放”与“足够安全”之间取平衡
- 工具和环境的组合更多，状态空间更大
- 外部依赖更多，任务更长，恢复更复杂

**常见技巧**

- 用 VM / container 做强隔离
- 用 allowlist 控制网络、文件、外部服务
- 用 artifact 目录和持久文件系统做状态桥
- 用多阶段 verifier 判断任务是否真正完成
- 用 progressive loading / skill loading 控制上下文体积

**Manus 里值得关注的实践**

- 官方文档明确把它描述成“完整 sandbox 环境里的虚拟电脑”，并强调 persistent filesystem、internet access、software install、custom tools
- Agent Skills 进一步把 `SKILL.md + scripts + resources` 做成可导入、可执行、可复用的工作流包
- 其技能页明确强调 progressive disclosure：只在需要时加载 instructions 和 resources，而不是一次性把所有内容塞进上下文

参考：

- [Manus Docs - Welcome](https://manus.im/docs/en/introduction/welcome)
- [Manus - Agent Skills](https://manus.im/features/agent-skills)

## 三类 Harness 的对比

| 类型 | 主环境 | 典型动作 | 典型 verifier | 优势 | 难点 |
| --- | --- | --- | --- | --- | --- |
| `PC-based` | 真实电脑、浏览器、桌面应用 | click / type / snapshot / screenshot | 页面状态、截图、UI tree、任务产物 | 最接近真实用户任务 | 噪声大、风险高、反馈稀疏 |
| `Code-based` | 代码仓库、shell、CI、git | read / edit / write / bash / test | test、lint、build、diff、CI | 反馈最明确、最容易回归 | 大仓库上下文、多步修改漂移 |
| `Sandbox-based` | 容器、VM、隔离工作区 | shell、browser、file、script、service | 多阶段脚本、服务状态、产物检查 | 最通用，适合复杂 workflow | 系统设计复杂，权限与恢复更难 |

一个很实用的判断是：

- 如果你是第一次做 harness，先从 `code-based` 开始
- 如果你要做 computer use、网页操作、消息代理，重点看 `PC-based`
- 如果你要做复杂 workflow、研究、数据处理、跨工具任务，重点看 `sandbox-based`

## 如何从 0 搭一个简单 Harness

如果你今天就要开始做一个最小 harness，建议按下面这个顺序来：

![Build a harness from scratch](./assets/harness-build-steps.svg)

### 1. 先定义成功条件

先回答“怎么知道任务完成了”，不要先写 prompt。

例如：

- 测试通过
- 页面进入目标状态
- 指定文件生成
- 报告导出成功
- 服务健康检查通过

### 2. 再定义最小动作空间

动作不要贪多。先给 agent 3 到 5 个最关键动作。

例如：

- coding：`read / bash / edit / write`
- browser：`open / snapshot / act / screenshot`
- sandbox：`run / write / browse / export`

### 3. 给每个动作设计可消费的反馈

动作执行后，环境必须返回真实、结构化、尽量高信号的反馈。

例如：

- exit code
- stderr
- DOM snapshot
- 文件 diff
- JSON result

### 4. 加一个外部 verifier

不要让模型自己判定是否完成。verifier 应尽量机械化、脚本化。

### 5. 加 memory 和 persistence

最小也要有：

- event log
- progress file
- artifacts
- checkpoint 或可恢复状态

### 6. 加 guardrails

至少要有：

- 步数预算
- 超时控制
- 写入边界
- 高风险动作审批

### 7. 最后才是 prompt 和 skill

prompt 很重要，但它不应替代环境设计、反馈设计和验证设计。  
skill 的价值也不是“额外堆知识”，而是把稳定 workflow 打包复用。

## 可直接参考的项目与文件

如果你想从 0 搭一个简单 harness，最有效的方式通常不是先看大而全框架，而是先看“最小闭环”长什么样。下面这些项目和文档更适合直接照着拆结构。

### 1. 最小开源实现

- [iannuttall/ralph](https://github.com/iannuttall/ralph) - 一个很贴近“最小 harness”概念的开源项目。价值：把 agent loop、状态文件、guardrails 和 activity log 都落在文件系统里。
- Ralph 里特别值得看的文件：
  - `README.md`
  - `.ralph/progress.md`
  - `.ralph/guardrails.md`
  - `.ralph/activity.log`
  - `.ralph/errors.log`
  - `.agents/ralph/config.sh`
  - `.agents/tasks/*.json`
- 这个仓库自己的最小 runtime 也适合作为参考：
  - [runtime/README.md](/Users/weihan.16/code/Awesome-Harness-Engineering/runtime/README.md)
  - [runtime/src/main.ts](/Users/weihan.16/code/Awesome-Harness-Engineering/runtime/src/main.ts)
  - [runtime/src/pi-agent.ts](/Users/weihan.16/code/Awesome-Harness-Engineering/runtime/src/pi-agent.ts)
  - [runtime/src/tools.ts](/Users/weihan.16/code/Awesome-Harness-Engineering/runtime/src/tools.ts)
  - [runtime/src/store.ts](/Users/weihan.16/code/Awesome-Harness-Engineering/runtime/src/store.ts)
  - [runtime/src/replay.ts](/Users/weihan.16/code/Awesome-Harness-Engineering/runtime/src/replay.ts)

### 2. PC-based Harness 参考

- [OpenClaw Docs - Agent Workspace](https://docs.openclaw.ai/concepts/agent-workspace) - 重点看 agent workspace 如何承载长期状态与本地文件。
- [OpenClaw Docs - Memory](https://docs.openclaw.ai/concepts/memory) - 重点看 memory 如何落在文件，而不是只依赖上下文窗口。
- [OpenClaw Docs - Sandboxing](https://docs.openclaw.ai/gateway/sandboxing) - 重点看 workspace access、bind mounts 和 sandbox scope。
- [OpenClaw Docs - Browser](https://docs.openclaw.ai/tools/browser) - 重点看 snapshot / screenshot / act 这种浏览器工具设计。
- [OpenClaw Docs - Security](https://docs.openclaw.ai/security) - 重点看 browser、host control 和权限边界。
- 如果你要抄文件结构，可以重点理解这些名字在 OpenClaw 里的角色：
  - `AGENTS.md`
  - `SOUL.md`
  - `USER.md`
  - `IDENTITY.md`
  - `TOOLS.md`

### 3. Code-based Harness 参考

- [Anthropic Docs - Hooks reference](https://docs.anthropic.com/en/docs/claude-code/hooks) - 重点看如何把外部脚本接到 tool use 前后。
- [Anthropic Docs - Manage Claude's memory](https://docs.anthropic.com/en/docs/claude-code/memory) - 重点看持久记忆文件如何分层。
- [Anthropic Docs - Claude Code settings](https://docs.anthropic.com/en/docs/claude-code/settings) - 重点看工具权限、目录访问和 hook 配置。
- 如果你要抄一个最小 code-based harness，最值得看的文件形态通常是：
  - `.claude/settings.json`
  - `.claude/settings.local.json`
  - `AGENTS.md`
  - `CLAUDE.md`
  - `progress.md`
  - `scripts/validate-*.sh`
  - `scripts/guardrail-*.py`

### 4. Sandbox-based Harness 参考

- [Manus Docs - Welcome](https://manus.im/docs/en/introduction/welcome) - 重点看“虚拟电脑 + 持久文件系统 + 网络 + 软件安装”的环境设定。
- [Manus - Agent Skills](https://manus.im/features/agent-skills) - 重点看如何把 workflow 打包成 skill。
- 如果你要借 Manus 的思路，最值得抄的是这种 skill 结构：
  - `SKILL.md`
  - `scripts/*.py`
  - `scripts/*.sh`
  - `resources/*`
- Manus 值得借鉴的不是某个 prompt，而是把 instructions、scripts、resources 和 sandbox 放到同一个执行包里。

### 5. 一个实用起点

如果你今天就想动手，我建议顺序是：

1. 先看 `Ralph`，理解最小文件式 harness。
2. 再看这个仓库的 `runtime/`，理解最小工具闭环。
3. 再按场景选一个方向：
   `OpenClaw` 对应 PC-based，`Claude Code / Codex` 对应 Code-based，`Manus` 对应 Sandbox-based。

## 本仓库包含什么

这个仓库目前有两部分内容：

### 1. Awesome 清单

围绕 Harness Engineering 的关键组成部分，整理高价值工具、框架、论文与实践入口，重点覆盖：

- 执行环境
- 约束与护栏
- 状态、检查点与恢复
- 可观测性
- 评测、回归与安全测试

### 2. 一个最小本地 runtime 实验

`runtime/` 目录不是完整产品，而是一个非常小的参考实现，用来演示最基本的闭环：

`task -> action -> feedback -> decision -> persistence`

当前 runtime 是一个最小 TypeScript 版本，核心只保留 harness 该做的事情：

- JSON config 加载
- JSONL event logging
- replay
- verifier / done-check
- CLI orchestration

给模型暴露的工具只有四个：

- `read`
- `bash`
- `edit`
- `write`

如果你正在搭自己的 agent runtime，这一部分可以作为一个很小但完整的起点。

## 仓库结构

```text
.
├── README.md
├── README_EN.md
├── agent.md
├── research/
│   ├── official-sources.json
│   └── source-snapshots.json
├── runtime/
│   ├── README.md
│   ├── config.example.json
│   ├── example_plan.jsonl
│   ├── fixtures/
│   │   └── replay-session.jsonl
│   └── src/
│       ├── config.ts
│       ├── main.ts
│       ├── pi-agent.ts
│       ├── replay.ts
│       ├── store.ts
│       ├── tools.ts
│       └── types.ts
├── scripts/
└── tests/
```

## 最小 Runtime 说明

`runtime/` 目前提供的是一个 **本地、可回放、最小化工具集** 的 runtime，适合做概念验证和教学拆解。

![Minimal runtime map](./assets/runtime-map.svg)

### 已实现能力

- **两种运行模式**
  - live：通过 OpenAI-compatible provider 实时生成下一步动作
  - replay：按 JSONL 中记录好的事件进行回放
- **四个内置工具**
  - `read`
  - `bash`
  - `edit`
  - `write`
- **最小策略闭环**
  - 支持 `done-check`
  - 支持 `maxSteps`
  - 支持 JSONL 事件落盘
- **持久化日志**
  - 每一步会写入 `.runs/*.jsonl`
  - 便于回放、排查和后续分析

### 它故意没有做的事

为了保持 runtime 足够小，它目前没有覆盖：

- 多 agent 协作
- 并发调度
- 分布式队列
- 复杂权限体系
- 高级恢复策略
- 丰富工具生态

这不是缺点，而是这个目录的设计目标：
**用最少代码讲清楚 harness 的关键结构。**

### 快速运行

先安装依赖：

```bash
npm install
```

#### 1. Replay 模式

```bash
npm run dev -- --replay-file runtime/fixtures/replay-session.jsonl
```

#### 2. Live 模式

先复制配置文件：

```bash
cp runtime/config.example.json runtime/config.json
```

然后填写你的模型配置，再执行：

```bash
node --import tsx runtime/src/main.ts \
  --task "Use the bash tool to run 'python3 -V'. Then report the Python version in one sentence." \
  --workspace . \
  --config runtime/config.json \
  --done-check "python3 -V"
```

更完整的使用说明见 `runtime/README.md`。

## 目录

- [基础方法](#基础方法)
- [典型 Harness 参考](#典型-harness-参考)
- [执行环境](#执行环境)
- [约束与护栏](#约束与护栏)
- [状态、检查点与恢复](#状态检查点与恢复)
- [应用可读性与可观测性](#应用可读性与可观测性)
- [评测与回归闭环](#评测与回归闭环)
- [安全与滥用测试](#安全与滥用测试)
- [持续清理与反漂移](#持续清理与反漂移)
- [贡献指南](#贡献指南)

## 基础方法

这一组条目帮助你建立共同语言：什么是 harness、为什么 agent-first 系统需要它，以及怎样把“试一试”变成“可验证地迭代”。

- [OpenAI - Harness engineering: leveraging Codex in an agent-first world](https://openai.com/index/harness-engineering/) - 2026-02-11。Agent-first 工程方法论。价值：帮助你从“模型使用”切换到“系统设计”。
- [OpenAI - Unlocking the Codex harness: how we built the App Server](https://openai.com/index/unlocking-the-codex-harness/) - 2026-02-04。Codex harness 的协议层与客户端集成。价值：把 agent loop 从产品体验层拆到事件与线程模型。
- [OpenAI - From model to agent: Equipping the Responses API with a computer environment](https://openai.com/index/equip-responses-api-computer-environment) - 2026-03-11。computer environment 实践。价值：展示如何把计算机环境接入 agent loop。
- [Anthropic - Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents/) - 2025-09-29。上下文工程方法。价值：帮助控制长期任务中的上下文体积与信息加载方式。
- [Anthropic - Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) - 2025-11-26。多步 coding harness 实践。价值：展示 initializer、progress file、单 feature session 等工作流设计。
- [Anthropic - Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) - 2026-01-09。评测方法。价值：把“好不好用”变成持续验证问题。
- [openai/evals](https://github.com/openai/evals) - 可复现模型评测框架。价值：建立基础反馈回路与对比基线。
- [Promptfoo](https://github.com/promptfoo/promptfoo) - 断言、回归与红队检查框架。价值：把 prompt / agent 行为纳入 CI。

## 典型 Harness 参考

这一组条目更适合用来理解“不同环境中心下，harness 的重点为什么不一样”。

- [OpenClaw Docs - Agent workspace](https://docs.openclaw.ai/agent-workspace) - PC-based 环境中的 workspace 设计。价值：把 agent 的工作目录、记忆和隔离边界写清楚。
- [OpenClaw Docs - Memory](https://docs.openclaw.ai/concepts/memory) - 基于文件的长期记忆设计。价值：说明“记忆”应落到环境，而不是只依赖上下文窗口。
- [OpenClaw Docs - Sandboxing](https://docs.openclaw.ai/gateway/sandboxing) - Docker-based 隔离策略。价值：展示 session / agent / shared 多层隔离。
- [OpenClaw Docs - Browser](https://docs.openclaw.ai/tools/browser) - 浏览器 snapshot / screenshot / act 工具。价值：展示 PC-based harness 如何把 GUI 交互结构化。
- [OpenClaw Docs - Security](https://docs.openclaw.ai/security) - 浏览器与 host control 风险说明。价值：强调 computer-use 场景的权限与隔离问题。
- [Anthropic Docs - Manage Claude's memory](https://docs.anthropic.com/en/docs/claude-code/memory) - Code-based memory 体系。价值：说明项目级、用户级、组织级记忆怎样分层。
- [Anthropic Docs - Hooks reference](https://docs.anthropic.com/en/docs/claude-code/hooks) - Code-based 预检查与后检查。价值：说明怎样把外部脚本接到 agent loop。
- [Anthropic Docs - Claude Code settings](https://docs.anthropic.com/en/docs/claude-code/settings) - 权限与工具配置。价值：说明 code-based harness 如何配置共享规则。
- [Manus Docs - Welcome](https://manus.im/docs/en/introduction/welcome) - Sandbox-based 的总体介绍。价值：说明“虚拟电脑 + 持久文件系统 + 网络 + 软件安装”这一类环境设定。
- [Manus - Agent Skills](https://manus.im/features/agent-skills) - 技能打包与渐进加载。价值：说明 sandbox-based harness 如何把 workflow 封装成可复用能力。

## 执行环境

这一层解决的是“Agent 到底在哪儿跑、怎么跑、失败后怎么继续跑”。没有稳定执行环境，再好的策略也很难复现。

- [Docker](https://www.docker.com/) - 可复现运行时封装。价值：减少环境差异导致的偶发失败。
- [Kubernetes](https://kubernetes.io/) - 任务隔离与生命周期管理。价值：支撑长时运行、调度与资源治理。
- [Temporal](https://temporal.io/) - 持久化流程编排。价值：天然支持重试、超时和断点续跑。
- [LangGraph](https://github.com/langchain-ai/langgraph) - 状态化多步 Agent 运行时。价值：把多步流程显式化，而不是藏在 prompt 里。
- [GitHub Actions](https://docs.github.com/actions) - 自动化执行基座。价值：让 run / validate / regression 更容易接入现有工程流程。

## 约束与护栏

如果没有边界，Agent 很容易因为一次错误动作把问题放大。护栏的作用不是“限制智能”，而是把系统保持在安全、可理解、可回退的范围内。

- [AGENTS.md](https://agents.md/) - 仓库级 Agent 运行约束。价值：把行为边界、协作规则、代码风格写成显式协议。
- [ESLint](https://eslint.org/) - 静态质量与模式检查。价值：减少生成代码偏离团队规范的概率。
- [Semgrep](https://semgrep.dev/) - 可定制策略规则。价值：把安全与架构不变量机械化执行。
- [dependency-cruiser](https://github.com/sverweij/dependency-cruiser) - 依赖边界检查。价值：强制分层与依赖方向约束。
- [Zod](https://github.com/colinhacks/zod) - 运行时 schema 校验。价值：在工具输入输出边界阻止坏数据扩散。

## 状态、检查点与恢复

多步任务一定会遇到中断、超时、外部依赖失败。关键不是“永不失败”，而是失败后能否低成本恢复。

- [PostgreSQL](https://www.postgresql.org/) - 持久化任务状态。价值：可靠记录进度、结果与恢复点。
- [Redis](https://redis.io/) - 队列、锁与临时状态。价值：提升协调效率与容错能力。
- [Celery](https://github.com/celery/celery) - 分布式任务重试框架。价值：为异步执行提供成熟恢复机制。
- [BullMQ](https://github.com/taskforcesh/bullmq) - JS/TS 队列与重试机制。价值：在 Node 生态中实现作业级恢复。
- [Backoff](https://github.com/litl/backoff) - 退避重试原语。价值：增强对外部 API、网页和服务波动的韧性。

## 应用可读性与可观测性

Agent 失败不可怕，可怕的是你不知道它为什么失败。可观测性决定了系统是否可维护。

- [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) - 程序化浏览器观测。价值：让 UI 状态、网络请求与页面行为可见。
- [Playwright](https://playwright.dev/) - 可重复浏览器自动化与 traces。价值：稳定复现网页路径与交互错误。
- [OpenTelemetry](https://opentelemetry.io/) - traces / metrics / logs 统一上下文。价值：形成根因分析闭环。
- [Prometheus](https://prometheus.io/) - 指标采集与 SLO 检查。价值：把运行质量变成可度量指标。
- [Grafana Loki](https://grafana.com/oss/loki/) - 日志聚合与检索。价值：提升结构化故障排查效率。
- [Grafana Tempo](https://grafana.com/oss/tempo/) - Trace 级调试。价值：帮助定位跨服务链路问题。

## 评测与回归闭环

Harness 不是“搭起来就结束”，而是要持续证明修改没有把系统搞坏。评测与回归是迭代速度的前提。

- [pytest](https://docs.pytest.org/) - 冒烟 / 回归执行层。价值：快速组织验证流程。
- [pytest-benchmark](https://github.com/ionelmc/pytest-benchmark) - 性能回归检查。价值：保护时延预算。
- [LangSmith Evaluations](https://docs.smith.langchain.com/evaluation) - 数据集 + 运行 + 评估器流水线。价值：让评测运营标准化。
- [DeepEval](https://github.com/confident-ai/deepeval) - LLM 测试样例抽象。价值：复用质量断言与测试模式。
- [RAGAS](https://github.com/explodinggradients/ragas) - 检索质量指标。价值：让 RAG 系统的反馈更客观。

## 安全与滥用测试

一旦 Agent 有文件系统、浏览器、命令行或外部 API 能力，安全问题就不再只是“模型说错话”，而是“系统可能做错事”。

- [PyRIT](https://github.com/Azure/PyRIT) - 生成式 AI 红队工具。价值：建立系统化攻防测试流程。
- [Garak](https://github.com/NVIDIA/garak) - 基于探针的漏洞扫描器。价值：覆盖更广的滥用与脆弱面。
- [SafeArena (paper)](https://arxiv.org/abs/2503.04957) - Web Agent 有害性基准。价值：覆盖真实网页场景中的危险任务。
- [OS-Harm (paper)](https://arxiv.org/abs/2506.14866) - OS 级有害评测。价值：验证 computer-use 场景的系统性风险。
- [CUAHarm (paper)](https://arxiv.org/abs/2508.00935) - 有害执行任务基准。价值：量化执行层面的安全边界。

## 持续清理与反漂移

Agent 系统很容易随着 prompt、工具、模型、依赖变化而慢慢“漂移”。这一层关注的是长期维护，而不是一次性交付。

- [Renovate](https://github.com/renovatebot/renovate) - 自动化依赖更新。价值：降低依赖老化带来的维护熵增。
- [Ruff](https://github.com/astral-sh/ruff) - 高性能 Python lint / format。价值：以较低成本持续清理代码质量。
- [Biome](https://github.com/biomejs/biome) - JS/TS formatter + linter。价值：减少生成代码在风格和质量上的漂移。
- [SonarQube](https://www.sonarsource.com/products/sonarqube/) - 长周期质量趋势跟踪。价值：更早发现结构性退化。

## 贡献指南

欢迎提交 PR 补充高质量条目、修正文案，或完善 `runtime/` 里的最小实验。

推荐的新增条目格式：

```text
- [Name](link) - 简短描述。价值：它如何帮助 harness engineering。
```

提交前建议自查：

- 条目是否与 harness engineering **直接相关**
- 是否优先引用了官方文档、原始仓库或原始论文
- 是否已经与现有内容重复
- 描述是否简洁、具体、非营销化
- 是否明确说明了“为什么它对 Agent Harness 有价值”

如果你不确定一个条目该放哪一类，可以在 PR 描述里写清楚它主要解决的问题，我会更容易帮你归类。
