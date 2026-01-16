# ROI Calculator Research Notes

> Supporting data for the "True Cost of Engagement" calculator on thetech.space

---

## Executive Summary

The premise: **A resource at 50% the day rate often costs 80-120% of total project cost when hidden factors are included.**

This document compiles industry research to support defensible assumptions in our ROI calculator.

---

## 1. Offshore Outsourcing Hidden Costs

### IEEE/SINTEF Study (2019)
- Projects studied showed **total cost deviation of 181%** from initial estimates
- Individual cost categories showed **more than 400% overrun**
- Main cost drivers: distance and poor process fit

*Source: [IEEE Xplore](https://ieeexplore.ieee.org/document/8807622/)*

### MIT Sloan Management Review
- Study of 50 IT outsourcing cases
- **14% of outsourcing operations deemed outright failures**
- Hidden costs consistently eroded projected benefits

*Source: [MIT Sloan](https://sloanreview.mit.edu/article/the-hidden-costs-of-it-outsourcing/)*

### Meta Group Research
- **Productivity loss adds 20% in additional costs** to offshore contracts
- **25% of offshore projects require significant rework** due to inadequate initial outputs

### CIO Magazine Analysis
- Cultural, language, and organizational differences add **3% to 27%** to outsourcing costs
- Vendor selection alone costs **0.2% to 2%** of annual contract value
- "No one saves 80% by shipping IT work to India... Few save even half that"
- **United Technologies** (acknowledged offshore leader): saves just over **20%** - not 50-80%

*Source: [CIO](https://www.cio.com/article/267239/the-hidden-costs-of-offshore-outsourcing.html)*

### Total Cost of Ownership Reality
- **TCO adds 25-150% to base rates** across hidden operational factors
- **70% of software projects exceed initial budgets** by average of 27-45%
- Companies typically **underestimate total costs by 20-30%** when planning offshore

---

## 2. Rework Rates

### Industry Benchmarks

| Performance Level | Rework Rate |
|-------------------|-------------|
| Elite teams | Below 3% |
| Healthy target | Below 15% |
| Typical industry | 30-50% of effort |
| Teams needing improvement | Above 7% |

### Key Statistics
- **30-50% of all effort on software projects is spent doing rework** (industry average)
- **Reworked code is 2.5x more costly** than new development
- High rework rates signal: unclear requirements, insufficient testing, quality gaps

*Sources: [ScopeMaster](https://www.scopemaster.com/blog/software-rework/), [Qodo](https://www.qodo.ai/glossary/rework-effort-ratio/)*

### Gartner Finding
- **67% of offshore projects require significant rework**

---

## 3. Supervision Overhead

### Junior vs Senior Resource Characteristics

| Attribute | Junior/Offshore | Senior/Experienced |
|-----------|-----------------|-------------------|
| Supervision needed | Constant | Minimal |
| Decision-making | Requires approval | Autonomous |
| Code review | Every commit | Spot-check |
| Context understanding | Must be taught | Brings expertise |
| Risk of errors | High (naive mistakes) | Low |

### Quantifiable Overhead
- Junior developers require **continuous supervision and code review**
- Mid-level developers can work with **little supervision** on familiar tasks
- Senior developers **eliminate technical debt** rather than add to it
- Studies show senior staff spend **4.3 minutes reviewing each output** vs 1.2 for junior - verification overhead compounds

*Sources: [LeanyLabs](https://leanylabs.com/blog/senior-vs-middle-vs-junior-developers/), [Full Scale](https://fullscale.io/blog/managing-senior-vs-junior-developers-remote/)*

---

## 4. Project Management Overhead

### PMI Research
- Project management costs: **7-11% of Total Installed Cost**
- With project controls: **9-15% range**
- Harold Kerzner benchmark: **2% to 15%** depending on project

### Industry Ranges
- Some projects: up to **20% of overall budget** for PM
- Median PMO budget: **4.4%** of project budget (admin overhead only)
- Rule of thumb: **10% of project hours** for project manager work

*Source: [PMI](https://www.pmi.org/learning/library/project-management-much-enough-appropriate-5072)*

---

## 5. Knowledge Transfer & Onboarding Costs

### Transition Timeframes
- Minimum transition time per vendor: **3 months**
- Complex engagements: **up to 1 year** for knowledge transfer
- "Build in up to a year for knowledge transfer and ironing out issues"

### McKinsey Estimates
- Additional transactional costs: **10%**
- Additional monitoring costs: **10%**
- Combined: **20% overhead** for offshore management

### Documentation Impact
- Good documentation reduces onboarding time by **40-60%**
- Ramp-up cost reduction: from **$3,000-$5,000** to **$1,000-$2,000** per developer

*Sources: [CIO](https://www.cio.com/article/267239/the-hidden-costs-of-offshore-outsourcing.html), [SmartDev](https://smartdev.com/what-are-common-cost-factors-for-offshore-software-development-projects-complete-budget-planning-guide-2026/)*

---

## 6. Timezone & Communication Overhead

### Fortune 100 Study (Harvard/Rice)
- **1-hour increase in temporal distance = 11% reduction in synchronous communication**
- Workers time-shift to compensate, affecting work-life balance
- Complex collaborative tasks suffer most from timezone gaps

### Strategic Findings
- **63% of executives** identify time zone alignment as critical for project success (Deloitte)
- Teams that communicate effectively boost productivity by **up to 25%** (McKinsey)
- "Follow-the-sun" works for routine tasks but **fails for complex, team-based work**

*Sources: [Harvard Business School](https://www.library.hbs.edu/working-knowledge/global-talent-local-obstacles-why-time-zones-matter-in-remote-work), [Rice University](https://news.rice.edu/news/2024/hidden-cost-working-across-time-zones)*

---

## 7. Outsourcing Failure & Dissatisfaction Rates

### Deloitte 2024 Global Outsourcing Study
- **59% of companies report dissatisfaction** with offshore development outcomes
- **70% have brought previously outsourced work back in-house** (past 5 years)
- **55%** cite lack of benefit realization tracking as key challenge

### Gartner
- **67% of offshore projects require significant rework**
- Only **30% of tech projects deliver on their promises**
- **60% of finance/accounting outsourcing contracts won't be renewed** by 2025

*Sources: [Deloitte](https://www2.deloitte.com/us/en/pages/operations/articles/global-outsourcing-survey.html), [DemandSage](https://www.demandsage.com/outsourcing-statistics/)*

---

## 8. IT Project Success Rates (Context)

### McKinsey Findings
- **59%** of IT projects completed within budget
- **47%** completed on time
- **44%** deliver intended benefits
- **Only 0.5%** (1 in 200) meet all three measures

### PMI Pulse of Profession 2021
- **9.4% of investment wasted** due to poor project performance

*Source: [Runn](https://www.runn.io/blog/it-project-management-statistics)*

---

## Calculator Assumptions (Defensible Ranges)

Based on research above, these ranges are supportable:

| Factor | Low | Default | High | Source |
|--------|-----|---------|------|--------|
| Rework rate (offshore) | 25% | 35% | 50% | Gartner, ScopeMaster |
| Rework rate (experienced) | 3% | 10% | 15% | Industry benchmark |
| Supervision hours/week (junior) | 5 | 8 | 12 | Industry observation |
| Supervision hours/week (senior) | 0.5 | 1 | 2 | Industry observation |
| Knowledge transfer (weeks) | 4 | 8 | 12 | CIO, McKinsey |
| Timeline overrun risk | 20% | 30% | 45% | McKinsey, PMI |
| Communication overhead | 5% | 15% | 27% | CIO, Meta Group |
| Contractor rotation probability | 0 | 1 | 2 | Industry observation |

---

## Key Messages for Calculator

### Don't claim "We're cheaper" - claim "Lower total cost"

1. **The day rate IS higher** - acknowledge this honestly
2. **The outcome cost is lower** - prove it with the math
3. **Risk-adjusted value** - certainty has monetary value

### Proof Points

- "That 50% day rate saving? Industry data shows it becomes 80-120% of true cost"
- "67% of offshore projects require significant rework (Gartner)"
- "59% of companies report dissatisfaction with offshore outcomes (Deloitte)"
- "United Technologies, an acknowledged offshore leader, saves just 20% - not 50-80%"

### The Honest Pitch

> "We cost more per day. We cost less per outcome. Here's the math."

---

## Future Calculator Features

### Phase 1: Simple
- Input: Project duration, day rates, senior staff cost
- Output: Side-by-side total cost comparison

### Phase 2: Detailed
- Adjustable assumption sliders
- Show breakdown of each hidden cost category
- PDF export for business cases

### Phase 3: Advanced
- Risk probability modeling
- Scenario comparison (best/likely/worst)
- Industry-specific benchmarks

---

## Citations

1. IEEE/SINTEF - https://ieeexplore.ieee.org/document/8807622/
2. MIT Sloan - https://sloanreview.mit.edu/article/the-hidden-costs-of-it-outsourcing/
3. CIO Magazine - https://www.cio.com/article/267239/the-hidden-costs-of-offshore-outsourcing.html
4. Deloitte 2024 - https://www2.deloitte.com/us/en/pages/operations/articles/global-outsourcing-survey.html
5. PMI - https://www.pmi.org/learning/library/project-management-much-enough-appropriate-5072
6. ScopeMaster - https://www.scopemaster.com/blog/software-rework/
7. Harvard/Rice Study - https://news.rice.edu/news/2024/hidden-cost-working-across-time-zones
8. Runn (McKinsey data) - https://www.runn.io/blog/it-project-management-statistics
9. SmartDev - https://smartdev.com/what-are-common-cost-factors-for-offshore-software-development-projects-complete-budget-planning-guide-2026/

---

*Document compiled: January 2026*
*For internal use in developing thetech.space ROI calculator*
