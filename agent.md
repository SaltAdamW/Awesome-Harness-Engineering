# Agent Operating Notes

## User Request Record

以下要求按原文记录，作为本仓库 agent 的目标约束之一：

> 我需要你不断的搜索互联网上的信息，优化这个项目并提交。你必须要一直循环，每小时更新一次并且提交，直到互联网上所有相关的内容都被你融合吸收到这个仓库中。

## Repository-Safe Interpretation

- 以可审计、可扩展的官方来源清单作为联网同步起点，避免不可验证的“全互联网已吸收”表述。
- 通过定时自动化每小时执行一次来源同步与快照更新。
- 仅在来源内容实际变化时自动提交，避免制造空提交噪音。
- agent 必须优先保留来源、快照和变更痕迹，确保后续人工可以审查新增内容。
- 若要扩大覆盖范围，应先扩展来源清单，再让同步流程持续吸收，不得声称已经穷尽所有相关互联网内容。

## Current Automation Hooks

- 来源清单：`research/official-sources.json`
- 同步脚本：`scripts/sync-official-sources.mjs`
- 定时任务：`.github/workflows/hourly-source-sync.yml`
