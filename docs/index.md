# Document Intelligence Approaches

This documentation presents a practical guide for designing document ETL pipelines using Azure services and implementation patterns from four real repositories.

<p align="center">
<img src="assets/img/approaches/overview-map.svg" alt="Document intelligence approaches overview map" style="border-radius: 10px; max-width: 100%;"/>
</p>

## Overview

Document ETL at enterprise scale is not one implementation, it is a set of patterns chosen by document variability, required accuracy, and integration constraints.

## Objective

This content helps you evaluate and implement four Azure-focused document intelligence approaches with clear trade-offs.

## Included repositories

| Repository | Best for | Core pattern |
| --- | --- | --- |
| PDFs-Invoice-Processing-Fapp-DocIntelligence | Standardized invoices | Managed extraction using Document Intelligence invoice capabilities |
| PDFs-Layouts-Processing-Fapp-DocIntelligence | Generic documents and forms | Layout-first extraction and transformation |
| PDFs-MultiLayout-VisualCue-AzureAI-Document-Processing | Multiple templates with positional cues | Visual cue and multi-layout routing |
| PDFs-Invoice-Processing-Fapp-OpenFramework | Custom invoice orchestration | Open framework pipeline with extensible stages |

## Learning outcomes

- Identify the right approach from document complexity and business outcomes.
- Understand architecture building blocks for each pattern.
- Apply enterprise considerations for operations, security, and governance.
- Build a rollout plan from PoC to production.

## Repositories

<div class="home-grid">

  <a class="home-card" href="https://github.com/Cloud2BR-MSFTLearningHub/PDFs-Invoice-Processing-Fapp-DocIntelligence">
    <h3>PDFs-Invoice-Processing-Fapp-DocIntelligence</h3>
    <p>Direct implementation repository for invoice extraction with Document Intelligence.</p>
  </a>

  <a class="home-card" href="https://github.com/Cloud2BR-MSFTLearningHub/PDFs-Layouts-Processing-Fapp-DocIntelligence">
    <h3>PDFs-Layouts-Processing-Fapp-DocIntelligence</h3>
    <p>Direct implementation repository for layout-first document extraction.</p>
  </a>

  <a class="home-card" href="https://github.com/Cloud2BR-MSFTLearningHub/PDFs-MultiLayout-VisualCue-AzureAI-Document-Processing">
    <h3>PDFs-MultiLayout-VisualCue-AzureAI-Document-Processing</h3>
    <p>Direct implementation repository for multi-layout and visual-cue routing.</p>
  </a>

  <a class="home-card" href="https://github.com/Cloud2BR-MSFTLearningHub/PDFs-Invoice-Processing-Fapp-OpenFramework">
    <h3>PDFs-Invoice-Processing-Fapp-OpenFramework</h3>
    <p>Direct implementation repository for open-framework invoice pipelines.</p>
  </a>

</div>

!!! tip
    Start with the [Overview and Decision Guide](02-approaches/index.md) to select the right implementation quickly.
