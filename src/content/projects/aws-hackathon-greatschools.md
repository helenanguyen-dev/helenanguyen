---
title: "GreatSchools Guided Agent"
summary: "An AI agent, built at an AWS hackathon, that turns a parent's plain-language question into ranked, evidence-backed school options."
role: "[Your role on the team]"
year: "2026"
tags: ["AI Agents", "Amazon Bedrock", "EdTech", "Hackathon"]
order: 2
---

## Overview

GreatSchools is a 25-year-old national nonprofit and one of the most used school-information platforms in the US, with 150,000+ school profiles and 850,000+ community reviews used by about 40 million families a year. At an AWS Breaking Barriers hackathon, our team built a prototype of its next step: a **Guided Agent** that helps parents explore their options instead of just filtering a list.

**Team:** [team size and roles] · **Time:** [hackathon length] · **My role:** [what you owned]

## The problem

School choice has become a maze. Public, charter, private and microschools sit alongside vouchers, education savings accounts and tax-credit scholarships, and a new federal tax credit arrives in 2027.

Today's search tools make parents filter by blunt criteria like location, grade and test scores, and they assume parents already know what those terms mean. Families with resources rely on their networks. Lower-income families face a lasting information gap, and because satisfaction with school choice is linked to better outcomes for kids, they lose the most.

GreatSchools already has the data. The challenge was to move parents from a narrow, one-time search into an **explore mode** where they ask questions, learn, and find options that fit better-informed criteria.

## The approach: "We investigate. You decide."

GreatSchools frames agentic search in three levels. We focused on Level 2.

| Level | Name | What it does |
| --- | --- | --- |
| 1 | Assistive | The parent drives; the tool returns matching schools with explanations |
| **2** | **Guided Agent** | The agent asks clarifying questions, spots gaps, and investigates on the parent's behalf |
| 3 | Proactive Agent | Reaches parents who haven't searched yet (stretch goal) |

A parent types something like *"middle school in Woodstock with STEM and after-school care."* The agent pulls out their criteria as editable chips (require, prefer, avoid), asks a trade-off question such as *"after-school care ends at 5pm, is that workable?"*, and returns ranked schools. Each result shows which criteria are **confirmed, partial, or need attention**, with the evidence behind it. The agent flags stale or missing data instead of guessing. The parent can then compare two schools and save favorites to a list.

We prioritized ruthlessly so we'd always have something working:

1. **Clarify and expand the query** into ranked, evidence-backed results
2. **Compare two schools** side by side
3. **Explain detail** from a school's profile
4. **Answer questions** about education terms and GreatSchools' quality framework

## How it's built

| Piece | Choice |
| --- | --- |
| Foundation models | Amazon Bedrock ([model]) |
| Search | Amazon OpenSearch Service (keyword + vector) |
| Data | Synthetic school, program and review data in Amazon S3 (no real or student data) |
| Agent | [Strands Agents / LangGraph / custom] |
| Hosting | [Lambda / Fargate / local] |
| Frontend | [framework] |

[Add a screenshot of the search box with criteria chips, and one of the ranked result cards.]

## Outcome

[What you demoed, how far you got through the priorities, judging results, and feedback from GreatSchools.]

## Measuring success

GreatSchools' main metric is the **saves-to-searches ratio**: how often a search ends with a parent saving a school. Supporting signals are result relevance (thumbs up/down) and the number of criteria captured per search.

[Your targets or early results here.]

## What's next

[Future goals: for example, capturing the parent's final choice and a first review, and a Level 3 preview that reaches parents before they search.]

## What I learned

[One or two lessons about building responsible AI products.]
