# Awesome Harness Engineering

> A practical starter README for building evaluation harnesses for LLM and agent systems.  
> Inspired by the methodology highlighted in OpenAI's Harness Engineering article:  
> https://openai.com/index/harness-engineering/

## Why Harness Engineering

Prompt iteration answers, "Does this sample look good?"  
Harness engineering answers:

- Is the system reliable on real tasks?
- Did this change introduce regressions?
- Can quality, latency, cost, and safety be optimized together?

In short: build a reproducible, comparable, automated evaluation loop that drives product iteration.

## Core Principles

1. **Task-first**  
   Define user tasks and success criteria before prompt or workflow tuning.
2. **Production-like**  
   Keep evaluation close to real runtime conditions (tools, permissions, noisy context).
3. **Deterministic where possible**  
   Pin dataset versions, model configs, seeds, and judge logic.
4. **Version everything**  
   Version datasets, runners, rubrics, and model settings.
5. **Measure tradeoffs, not one score**  
   Track quality, latency, cost, safety, and robustness together.
6. **Fast iteration loop**  
   Local smoke run -> regression suite -> CI gate -> release.

## Minimal Harness Architecture

A useful harness has at least five parts:

- `tasks/`: task specs (inputs, constraints, expected outcomes)
- `runner/`: execution pipeline (model/agent calls + traces)
- `judges/`: scoring logic (rule-based and optionally model-based)
- `datasets/`: smoke, regression, and adversarial sets
- `reports/`: metrics, failures, and version diffs

Suggested layout:

```text
.
├── datasets/
│   ├── smoke.jsonl
│   ├── regression.jsonl
│   └── adversarial.jsonl
├── tasks/
│   └── schemas/
├── runner/
├── judges/
├── reports/
├── scripts/
└── README.md
```

## Task Spec Template

```json
{
  "task_id": "refund_policy_001",
  "input": {
    "user_query": "Can I still get a refund after 7 days?"
  },
  "context": {
    "policy_version": "2026-03-01"
  },
  "constraints": [
    "Must cite policy language",
    "Must not invent rules"
  ],
  "expected": {
    "must_include": ["after 7 days", "refund eligibility", "policy basis"],
    "must_not_include": ["guaranteed refund", "fabricated policy"]
  },
  "metadata": {
    "difficulty": "medium",
    "category": "policy_qa"
  }
}
```

## Metrics That Matter

Track more than answer correctness:

- `task_success_rate`
- `critical_error_rate` (hallucination, unsafe action, wrong tool call)
- `latency_p50` / `latency_p95`
- `cost_per_task`
- `tool_call_success_rate`
- `safety_violation_rate`
- `regression_delta` (change vs baseline)

## Evaluation Layers

Use three layers with different speed and confidence:

1. **Smoke (minutes)**: small must-pass set before each PR.
2. **Regression (longer)**: core scenarios + historical failures.
3. **Release Gate (full)**: broad suite with safety/cost thresholds.

## CI Gate Example

Example hard thresholds:

- `task_success_rate >= 0.90`
- `critical_error_rate <= 0.02`
- `safety_violation_rate == 0`
- `cost_per_task` must not increase by more than `15%` vs baseline

If any threshold fails, block merge or release.

## Failure Analysis Workflow

After each run:

1. Cluster failures by category.
2. Separate model-capability issues from pipeline/tooling issues.
3. Extract minimal reproducible cases and add them to regression.
4. Update prompt, tool routing, policy, or judge.
5. Re-run smoke + regression and verify no new regressions.

## Common Anti-Patterns

- Evaluating only demo cases
- Non-versioned datasets and rubrics
- Over-relying on one aggregate score
- Frequent rubric drift without changelog
- Optimizing average performance while ignoring tail failures

## Practical Checklist

Before merging an agent or prompt change:

- [ ] Every changed task has explicit success criteria.
- [ ] New failures are added to regression.
- [ ] Report includes quality, latency, cost, and safety metrics.
- [ ] Results are compared against a baseline version.
- [ ] CI gates pass.

## What to Build Next

Recommended next steps for this repo:

1. Add sample datasets in `datasets/*.jsonl` for smoke/regression/adversarial runs.
2. Add a runner script to execute suites and save structured traces.
3. Add judge templates (rule-based + optional model judge).
4. Add a lightweight report generator (Markdown + CSV).
5. Add CI integration, starting with smoke-gate enforcement.
