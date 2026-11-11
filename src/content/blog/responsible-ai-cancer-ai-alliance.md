---
title: "Can a cancer AI alliance move fast and stay fair?"
description: "A responsible AI check-up on the Cancer AI Alliance: what it gets right on privacy, where the gaps are, and what I'd fix first."
date: 2026-11-11
tags: ["Responsible AI", "Healthcare", "Governance"]
---

The Cancer AI Alliance (CAIA) is one of the most exciting ideas in cancer research right now. Fred Hutch and three other NCI-designated cancer centers are training AI models together using federated learning, so the models learn from more than a million patients' records without any of those records leaving each center's firewall.

I spent time in cancer research at Fred Hutch before moving into data and product work, so when my Responsible AI class asked us to assess a real AI initiative, CAIA was an easy pick. This post is a cleaned-up version of that assessment. My question was simple: **the privacy story is strong, but is the rest of the responsible AI story there yet?**

## What CAIA already gets right

Privacy is built into the architecture, not bolted on. Patient data stays inside each center. Every center approves the code that runs on its data, there are audit logs, and projects run under IRB-approved protocols. That is a lot more than most AI projects start with.

But privacy is only one pillar. When I looked at the public record for fairness, accountability and inclusiveness, I found much less.

## Three gaps

| Pillar | What CAIA does today | What's missing |
| --- | --- | --- |
| Fairness | Says pooling data from four centers makes models more equitable | No published fairness metrics or evidence of bias testing by race, ethnicity, sex or age |
| Accountability | A scientific committee picks projects, each center's IRB and leadership sign off | No alliance-level body that owns a jointly trained model's harms or can pause it |
| Inclusiveness | Trains on data from four leading cancer centers | No patient advisory group, membership criteria, or plan to include rural and community voices |

The accountability gap is the one that worries me most. Four separate IRBs can each approve their own piece, and still nobody answers for what the combined model does in the real world.

## Where the incentives collide

Everyone involved wants CAIA to succeed, but they want different things along the way.

- **Speed vs. validation.** Leadership talks about cutting discovery time from years to months, and even a pilot lead called the timeline very ambitious. A fairness and validation standard adds weeks to each project. Researchers feel that cost first. Patients and regulators feel the harm if it's skipped.
- **Cooperation vs. competition.** The four centers compete for patients, grants and talent. A shared standard and shared oversight means each one gives up some control, and that is the biggest barrier to an alliance-level accountability body.
- **Research use vs. patient expectations.** Data is de-identified and used under IRB protocols, but patients mostly aren't told how it's handled. After a recent data breach at the Hutch, that gap in trust matters even more.

The good news is that every group loses the same way. If a CAIA model turns out to be biased, or privacy fails, the whole value of the alliance (trusted collaboration) goes with it. That shared risk is the lever for getting everyone to agree on guardrails.

## What I'd fix first

With the first pilot results coming soon, I'd start with **federated fairness and validation standards**, because a biased finding in print would undercut the equity claim CAIA's pitch rests on. Two concrete steps:

1. **Subgroup metrics at every site.** Add race, ethnicity, sex, age, insurance and rurality breakdowns to every edge node's validation run, returned only as summary counts so no patient data moves.
2. **Leave-one-center-out testing.** Before any result is published, test each model on a center it wasn't trained on. Apply this to all eight pilot projects.

Neither step needs new infrastructure. They fit the federated setup CAIA already has.

## A thought experiment: an AI hiring screener

The second half of the assignment asked a harder question. Imagine the alliance wants an AI tool to screen candidates for its fast-growing roles, like ML engineers and data scientists. HR wants speed and one consistent screen instead of four. Candidates want a fair shot and a way to reach a human. Legal wants audit trails. Leadership can't afford a bias scandal inside an initiative that's supposed to model responsible AI.

The real risk is that a model trained on past hires at four elite academic centers learns to reward pedigree. Here's how I'd balance speed with fairness:

- **Keep the scope narrow.** Start with three or four high-volume roles, and keep an HR coordinator in the loop for every final decision. No auto-rejections.
- **Give each group the transparency it needs.** Candidates are told an AI tool is in use, see the main reasons behind a decision, and can ask for a human-only review. Recruiters see the reasons and can override them. Legal and executives get the full model logs and documentation.
- **Test fairness at every center, every quarter.** Each site checks results against agreed benchmarks, including protected attributes, before launch and after.
- **Watch the override rate.** Each center tracks how often a human reverses the AI. A high rate is an early warning that something is off.

A working group with HR, legal and community advocates from each site would set the rules before a three-month trial, then publish a plain-language summary of what was tested, what was found and what changed.

## Who gets to hit pause

Most of this comes down to one question: who is allowed to stop a model? Here's the structure I proposed.

- **Centers keep control of their own data**, compute and any use in their own clinics. Patient data never leaves the firewall.
- **A governance committee** of one or two leaders per center can pause any model alliance-wide within 48 hours by majority vote. Tech partners like AWS, Microsoft and NVIDIA sit in as observers without a vote.
- **Every model has a named owner** and lives in a public model registry run by the coordinating center at Fred Hutch.
- **Projects are tiered by risk.** Tier 1 is exploratory work that only returns counts. Tier 2 is a shared model whose results get published. Tier 3 covers clinical use, hiring and genomics. The higher the tier, the more approvals it needs.

## Augment by default

My rule of thumb: AI drafts or flags, and a person decides. A task can only be fully automated if it is low-stakes and reversible, its accuracy is visible to all four centers, it brings a real gain rather than just fewer staff, and there's a retraining plan for the people whose work changes.

That's because AI helps novices most, entry-level work shrinks first, and models fail quietly outside the data they know. So routine work like code mapping and job scheduling can be automated. Note abstraction, analyses, clinical models and the hiring screener stay augmented. Treatment decisions, rejecting applicants, consent and IRB rulings are never automated.

## What I took away

CAIA showed me that privacy-preserving technology is a great start but not the finish line. Federated learning answers "where does the data live?" It doesn't answer "who is this model failing, and who's responsible when it does?" The nice part is that the same federated pattern works for governance too: each center checks its own results, shares only counts, and a small shared body owns the decision to pause.

## Sources

- Cancer AI Alliance. [Unlocking the unlimited potential of AI for cancer research](https://www.canceralliance.ai/).
- Narayan, M. (2026, March 24). [CAIA's first wave of cancer discovery: 8 pilot projects powered by our federated learning platform](https://www.canceralliance.ai/blog/caia-cancer-discovery-8-pilot-projects). Cancer AI Alliance.
- MacPherson, L. [AI fairness: Principles, metrics and how to operationalize](https://www.snowflake.com/en/artificial-intelligence/ai-governance/ai-fairness/). Snowflake.
