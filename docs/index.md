# Document Intelligence Approaches

This documentation presents a practical guide for designing document ETL pipelines with Azure services and implementation patterns from four real repositories.

The goal is to help architecture, platform, and delivery teams choose the right implementation path for each document domain, then scale that path with security, governance, and operations built in.

<p align="center">
<img src="assets/img/approaches/overview-map.svg" alt="Document intelligence approaches overview map" style="border-radius: 10px; max-width: 100%;"/>
</p>

## Included repositories

| Repository | Best for | Core pattern |
| --- | --- | --- |
| <a href="https://github.com/Cloud2BR-MSFTLearningHub/PDFs-Invoice-Processing-Fapp-DocIntelligence" target="_blank" rel="noopener noreferrer">PDFs-Invoice-Processing-Fapp-DocIntelligence</a> | Standardized invoices | Managed extraction using Document Intelligence invoice capabilities |
| <a href="https://github.com/Cloud2BR-MSFTLearningHub/PDFs-Layouts-Processing-Fapp-DocIntelligence" target="_blank" rel="noopener noreferrer">PDFs-Layouts-Processing-Fapp-DocIntelligence</a> | Generic documents and forms | Layout-first extraction and transformation |
| <a href="https://github.com/Cloud2BR-MSFTLearningHub/PDFs-MultiLayout-VisualCue-AzureAI-Document-Processing" target="_blank" rel="noopener noreferrer">PDFs-MultiLayout-VisualCue-AzureAI-Document-Processing</a> | Multiple templates with positional cues | Visual cue and multi-layout routing |
| <a href="https://github.com/Cloud2BR-MSFTLearningHub/PDFs-Invoice-Processing-Fapp-OpenFramework" target="_blank" rel="noopener noreferrer">PDFs-Invoice-Processing-Fapp-OpenFramework</a> | Custom invoice orchestration | Open framework pipeline with extensible stages |

## Core concepts explained

- Document ETL: A pipeline that ingests source documents, extracts structured meaning, transforms that data to business-ready schema, and loads it into downstream systems.
- Pattern selection: You do not implement one universal pipeline for every document type. You select a pattern based on document variability, extraction accuracy targets, and integration complexity.
- Managed versus open orchestration: Managed services can accelerate delivery and reduce maintenance, while open frameworks provide deeper customization and ownership.
- Shared enterprise layers: Regardless of pattern, each solution still needs identity, observability, quality controls, exception handling, and compliance controls.

## How to use this documentation

1. Start in [Overview and Decision Guide](02-approaches/index.md) to select a pattern based on document characteristics and team constraints.
2. Review [Fundamentals](01-fundamentals/index.md) to understand the common Azure baseline and service interactions.
3. Open the selected deep-dive in [Approaches Catalog](02-approaches/index.md) and validate architecture fit, strengths, and watchouts.
4. Apply [Architecture Patterns](03-enterprise-design/architecture-patterns.md), [Governance and Operations](03-enterprise-design/governance-operations.md), and [Security and Compliance Baseline](04-security/index.md) before production rollout.

## Typical adoption path

1. Pilot with one high-value document family.
2. Establish confidence thresholds, quality checks, and exception routes.
3. Measure throughput, accuracy, and cost per document.
4. Expand to adjacent document families with reusable controls.
5. Standardize platform patterns across teams.

## Learning outcomes

- Identify the right approach from document complexity and business outcomes.
- Understand architecture building blocks for each pattern.
- Apply enterprise considerations for operations, security, and governance.
- Build a rollout plan from PoC to production.

!!! tip
    Start with the [Overview and Decision Guide](02-approaches/index.md) to select the right implementation quickly.
