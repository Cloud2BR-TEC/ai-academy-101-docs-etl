# Overview and Decision Guide

Use this page as the selection entry point for the four implementation repositories.

The purpose is not only to compare features, but to align pattern selection with document behavior, delivery constraints, and long-term ownership.

<p align="center">
<img src="../assets/img/approaches/decision-matrix.svg" alt="Decision matrix for document intelligence approaches" style="border-radius: 10px; max-width: 100%;"/>
</p>

!!! important "Eliminate infeasible options first"
	Apply hard constraints such as data residency, unsupported file characteristics, response time, and ownership capacity before optimizing for delivery speed or flexibility.

> **Selection principle:** Evidence from representative documents should eliminate options before preference is allowed to rank them.

## Quick comparison

| Approach | Strengths | Watchouts | Repo |
| --- | --- | --- | --- |
| Invoice + Document Intelligence | Fast onboarding, high precision for invoice fields, managed model lifecycle | Less flexible for highly unusual invoice formats | [PDFs-Invoice-Processing-Fapp-DocIntelligence](https://github.com/Cloud2BR-MSFTLearningHub/PDFs-Invoice-Processing-Fapp-DocIntelligence) |
| Layout + Document Intelligence | Works across broad PDF layouts, keeps structural context | Requires stronger post-processing rules | [PDFs-Layouts-Processing-Fapp-DocIntelligence](https://github.com/Cloud2BR-MSFTLearningHub/PDFs-Layouts-Processing-Fapp-DocIntelligence) |
| Multi-Layout Visual Cue | Handles mixed templates and positional anchors well | More complex routing and visual rule maintenance | [PDFs-MultiLayout-VisualCue-AzureAI-Document-Processing](https://github.com/Cloud2BR-MSFTLearningHub/PDFs-MultiLayout-VisualCue-AzureAI-Document-Processing) |
| Invoice + Open Framework | Maximum extensibility and custom business logic integration | Higher engineering ownership and governance needs | [PDFs-Invoice-Processing-Fapp-OpenFramework](https://github.com/Cloud2BR-MSFTLearningHub/PDFs-Invoice-Processing-Fapp-OpenFramework) |

## Decision criteria explained

<p align="center">
<img src="../assets/img/approaches/decision-criteria.svg" alt="Six decision criteria at a glance" style="border-radius: 10px; max-width: 100%;"/>
</p>

| Criterion | What to evaluate | Why it matters |
| --- | --- | --- |
| Document variability | Number of templates, layout drift, and field position consistency | Determines whether simple extraction is sufficient or routing logic is required |
| Accuracy target | Business tolerance for extraction errors by field and process | Drives confidence thresholds and review strategy |
| Time to value | How quickly the team must deliver production capability | Influences managed-first versus custom-first approach |
| Engineering ownership | Team capacity for custom pipeline maintenance | Higher ownership enables flexibility but increases operational burden |
| Integration complexity | Number and strictness of downstream contracts and systems | Impacts normalization logic and orchestration depth |
| Compliance constraints | Data residency, audit, and control requirements | Affects storage, access model, and evidence workflows |

## Decision flow

- If your documents are mostly invoices with stable fields, start with **[Invoice + Document Intelligence](invoice-docint.md)**.
- If document types vary and table/structure extraction is key, use **[Layout + Document Intelligence](layout-docint.md)**.
- If you have many vendor templates and positional markers, use **[Multi-Layout Visual Cue](multilayout-visualcue.md)**.
- If you need a highly customizable and pluggable pipeline, choose **[Invoice + Open Framework](invoice-openframework.md)**.

## Practical selection workflow

> **Pilot principle:** The purpose of a pilot is to expose quality, exception, cost, and ownership realities before architecture becomes expensive to change.

1. Pick one representative document set for each major business flow.
2. Score each set on variability, required accuracy, and integration complexity.
3. Select the simplest pattern that can satisfy quality and control requirements.
4. Run a short pilot to measure extraction accuracy, latency, and exception rate.
5. Confirm operational readiness before expanding to additional document families.

!!! tip
	Start conservative: if two approaches seem viable, choose the lower-complexity option first and add complexity only when metrics prove the need.

## Hard constraints and optimization levers

Not every decision criterion has equal weight. Separate non-negotiable constraints from preferences before scoring options.

Hard constraints can eliminate an approach. Examples include a required deployment boundary, unsupported file characteristics, mandatory response time, data-residency rule, or downstream contract that cannot change. Optimization levers help choose among the remaining feasible options. These include delivery speed, customization flexibility, operating cost, and maintenance effort.

Create a short decision record containing:

1. Business process and decision being automated.
2. Representative document families and volume profile.
3. Critical fields and maximum acceptable error outcomes.
4. Hard constraints with evidence and owners.
5. Weighted optimization criteria.
6. Pilot findings and unresolved risks.
7. Selected pattern, alternatives rejected, and review date.

## When not to use each approach

| Approach | Avoid or reconsider when |
| --- | --- |
| Invoice + Document Intelligence | Documents are not invoices, key meaning depends heavily on unusual visual cues, or custom orchestration dominates the workload |
| Layout + Document Intelligence | The required business entities cannot be derived reliably from generic structure and mappings become a large rule system |
| Multi-Layout Visual Cue | Templates are nearly identical, visual cues are unstable, or the organization cannot maintain family-specific strategy packs |
| Invoice + Open Framework | Managed capabilities satisfy requirements and the team cannot own custom modules, security, testing, and support over time |

The simplest technically viable pattern is often preferable, but migration cost matters. A quick implementation that tightly couples provider output to downstream systems can become more expensive than a slightly more structured initial design.

??? info "Hybrid patterns and migration signals"
	The four approaches are not mutually exclusive. A production estate can route documents through several paths while preserving one canonical output contract.

	- **Managed-first with fallback:** Process ordinary invoices with the prebuilt invoice model and route unsupported variants to review or a custom processor.
	- **Classification then specialization:** Use visual cues to identify a family, then call either invoice or layout extraction.
	- **Layout plus semantic enrichment:** Extract structure deterministically, then use language reasoning only for ambiguous or unstructured sections.
	- **Open orchestration with managed processors:** Use a modular framework for control flow while retaining Document Intelligence as an extraction component.

	**Move beyond managed invoice extraction when:**

	- A growing share of documents needs family-specific preprocessing or postprocessing.
	- Critical fields depend on positional or visual signals not captured reliably.
	- Exception volume is concentrated in stable, identifiable template families.
	- Custom branching, enrichment, or integration work exceeds the extraction logic itself.

	**Add multi-layout routing when:**

	- Quality varies materially by vendor or template.
	- Templates can be classified with stable distinguishing features.
	- Family-specific extraction strategies outperform one generic path.
	- The team can own classifier evaluation and strategy-pack lifecycle.

	**Introduce an open framework when:**

	- Pipeline stages require independent versioning and deployment.
	- Several business domains need shared custom processors.
	- Portability or orchestration control is a strategic requirement.
	- Engineering and operations teams can support a platform, not only a project.

	Hybrid designs add routing and testing complexity. Adopt them only when segmented metrics show that one path cannot meet requirements efficiently.

## Proof-of-value design

A useful proof of value tests uncertainty rather than demonstrating a happy path.

1. Sample documents by family and risk, not only by availability.
2. Label expected critical fields and classification outcomes.
3. Define acceptance thresholds before running the evaluation.
4. Measure field quality, straight-through rate, latency, exceptions, and cost drivers.
5. Test at least one downstream integration and one recovery scenario.
6. Document unsupported cases and estimate manual-review demand.

Avoid presenting a single accuracy percentage. Report results by field, family, scan quality, and business criticality. Include the sample size and confidence policy so stakeholders can interpret the result.

## Delivery effort and team shape

Delivery effort depends on existing platform maturity, document diversity, integrations, and control requirements. Use relative sizing rather than treating a generic calendar estimate as a commitment.

| Approach | Relative initial effort | Ongoing ownership | Skills emphasized |
| --- | --- | --- | --- |
| Invoice + Document Intelligence | Lower | Quality monitoring, rules, integration | Azure Functions, API integration, finance validation |
| Layout + Document Intelligence | Medium | Mapping and schema lifecycle | Document structure, transformation, data contracts |
| Multi-Layout Visual Cue | Higher | Classification and strategy packs | Vision/layout analysis, evaluation, routing |
| Invoice + Open Framework | Higher | Platform modules and orchestration | Software architecture, testing, DevOps, integration |

All approaches still need business-domain expertise, security review, infrastructure automation, observability, and support ownership.

## Downstream integration choices

- ERP or finance system: Favor validated commands or APIs with idempotency keys and explicit acknowledgement.
- Data warehouse or lake: Publish immutable curated records and processing metadata for trend analysis.
- Workflow platform: Send only exceptions or approval tasks, with links to controlled document views.
- Search or knowledge system: Separate retrieval-oriented enrichment from authoritative transactional fields.
- Event consumers: Use versioned events and a schema registry or equivalent contract-governance process.

The extraction pipeline should not decide every downstream workflow. Its primary responsibility is to produce a trustworthy, traceable business record and a clear processing outcome.
