---
title: "Atlas: agent-guided school search"
summary: "A GreatSchools x AWS hackathon prototype that turns a parent's own words into best-fit school recommendations, each with a confidence level and evidence they can check."
cover: ../../assets/atlas-cover.png
coverAlt: "Atlas logo, a folded map with a route to a location pin, above the Atlas guided-search screen: priority chips, the AI school guide, and a matching school card"
heroImage: ../../assets/greatschools-guided-search.jpg
heroAlt: "Atlas guided search on GreatSchools: priority chips from a parent's sentence, the AI school guide, and a matching school card"
role: "Product Manager"
team: "Two software engineers, a search and data engineer, and me"
timeline: "3 days, 2026"
tools: "Amazon Bedrock, OpenSearch, Rails on EC2"
year: "2026"
tags: ["AI Agents", "Amazon Bedrock", "EdTech"]
order: 2
# Matches the Team Atlas deck: deep navy cards with white numbers.
statsTheme:
  bg: "#1b2440"
  number: "#ffffff"
  label: "rgba(255,255,255,.78)"
  weight: 800
tileBg: "linear-gradient(135deg, #2342a8 0%, #0e1f63 100%)"
tileStyle: logo
tileImage: ../../assets/atlas-logo.svg
tileText: "Atlas"
tileLogo: ../../assets/aws-logo-white.png
tileLogoPartner: ../../assets/greatschools-logo-white.png
---

## Overview

GreatSchools is a nonprofit whose 150,000+ school profiles help about 40 million families a year choose schools. At a GreatSchools x AWS hackathon, our four-person team, **Team Atlas**, spent three days on one question: how do you turn a parent's real priorities into a list they can trust?

<div class="stats">
  <div><strong>150,000+</strong><span>School profiles on GreatSchools</span></div>
  <div><strong>~40M</strong><span>Families who use it each year</span></div>
  <div><strong>3 days</strong><span>To build Atlas, as a team of four</span></div>
</div>

<div class="pair">

![A speaker with a microphone on stage beside a screen reading Breaking Barriers Challenge 2026, with an audience of participants in the foreground](../../assets/atlas-hackathon-kickoff.jpg "Kickoff of the AWS Breaking Barriers Challenge 2026.")

![Teams working on laptops at tables in a bright room with city and water views, an AWS Breaking Barriers backdrop and a projected screen behind them](../../assets/atlas-hackathon-teams.jpg "Teams building side by side over the three days.")

</div>

## Meet Maria

We designed around one parent. Maria works two jobs and lives in Riverview. Her son Leo starts middle school next fall. He loves drawing and painting, plays soccer on weekends, and needs teachers who notice him.

![Maria's persona card: works two jobs, lives in Riverview, her son starts middle school next fall. What matters for Leo: arts programs, sports programs, small class sizes](../../assets/atlas-maria.jpg "The persona we designed around, from our hackathon deck.")

At 9 PM, after her shift, her question isn't "which school has an 8/10?" It's this:

> "Where will Leo do well?"

## The problem

GreatSchools has the data. Parents still need the right terms and filters to reach it.

1. **Filters, not fit.** Parents think in sentences, but search makes them translate needs into filters and jargon like "CTE."
2. **A rating isn't a reason.** An 8/10 says how a school scores, not whether it has the arts program your kid loves.
3. **Hard to trust.** Details sit across tabs, and parents can't tell what's confirmed, outdated, or missing.

The families with the least access to clear information lose the most.

## The solution: guided search

Atlas lets parents ask in their own words.

- **Understands you.** "Middle school in Riverview with arts, sports and small class sizes" becomes priority chips the parent can edit.
- **Shows its work.** Each school card says which priorities matched, using the school's own data.
- **Guides the next step.** A school-guide chat explains why a school fits, suggests questions for a visit, and lets parents compare and save schools to a list.


### How it works

1. **Ask.** Different starting points for new and experienced parents.
2. **Understand.** Amazon Nova Pro on Bedrock extracts the parent's needs.
3. **Find and check.** OpenSearch retrieves schools and programs, and Rails checks each priority against the data.
4. **Guide.** Best-fit cards with a confidence level, a map, the school-guide chat, save and compare.

## Built on AWS

Everything runs in us-east-1. A parent's request passes through AWS WAF and CloudFront to an internal load balancer, then to a Rails app on EC2 that talks to **OpenSearch 2.19** (schools and programs), **RDS MySQL** (search sessions) and **Amazon Bedrock** (Nova Pro).

![Architecture: parent's browser, AWS WAF, CloudFront, an internal load balancer, then Rails on EC2, which talks to OpenSearch 2.19, RDS MySQL and Amazon Bedrock](../../assets/atlas-architecture.jpg "Everything runs in us-east-1 inside one VPC.")

**How schools are matched:** 50% keyword match and 50% meaning match. Each priority is then checked in Ruby code against the school's record, so **the AI explains the results but never invents the facts.**

| Design goal | How we met it |
| --- | --- |
| Fast | A full search took about 2 seconds in our demo |
| Trustworthy | Facts come from GreatSchools' data and are checked in code; the model only explains |
| Light to run | Managed AWS services, so a nonprofit team runs code, not servers |

**Trade-off:** always-on infrastructure plus usage charges, including Bedrock tokens. We kept token use low by calling the model only where language understanding is needed.

## Results

We ran 20 parent-style queries against the live app. 16 had valid matches in the sample data, and 4 were expected to return none.

<div class="stats">
  <div><strong>23 / 24</strong><span>Priorities captured per search</span></div>
  <div><strong>15 / 16</strong><span>Test queries with a relevant top result</span></div>
  <div><strong>54 / 54</strong><span>Missing or outdated data flagged correctly</span></div>
  <div><strong>1.98s</strong><span>Median search response time (2.24s average)</span></div>
</div>

[Impact: what GreatSchools said, judging results, and how this could move their saves-to-searches ratio.]

## What's next

- **Now:** guided search, evidence checks, save and compare.
- **Next:** GreatSchools' full school data and reviews, side-by-side compare, and plain-language school terms.
- **Later:** saved searches that tell parents when a new matching program opens.
- **Reach goal:** an agent that calls a school to check a detail, like when soccer practice is, then shares the answer with every parent who asks. Ten parents don't have to make the same call.

## What I learned

[One or two lessons from leading product on an AI build, for example keeping the model out of the facts.]
