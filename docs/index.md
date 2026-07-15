# Document Intelligence Approaches

This course presents a practical guide for designing document ETL pipelines using Azure services and implementation patterns from four real repositories.

<p align="center">
<img src="assets/img/approaches/overview-map.svg" alt="Document intelligence approaches overview map" style="border-radius: 10px; max-width: 100%;"/>
</p>

## What you will learn

- How each approach handles ingestion, extraction, normalization, and output.
- Which approach is best for fixed invoices vs variable layouts.
- Where visual-cue analysis adds value for complex documents.
- When to use Open Framework-based pipelines for extensibility.

## Approach families

<div class="home-grid">

  <a class="home-card" href="02-approaches/invoice-docint.md">
    <h3>Invoice + Document Intelligence</h3>
    <p>Use prebuilt/custom models to extract structured invoice fields reliably.</p>
  </a>

  <a class="home-card" href="02-approaches/layout-docint.md">
    <h3>Layout + Document Intelligence</h3>
    <p>Extract layout primitives and semantic structure from generic PDF content.</p>
  </a>

  <a class="home-card" href="02-approaches/multilayout-visualcue.md">
    <h3>Multi-Layout Visual Cue</h3>
    <p>Combine layout detection and visual anchors for mixed document templates.</p>
  </a>

  <a class="home-card" href="02-approaches/invoice-openframework.md">
    <h3>Invoice + Open Framework</h3>
    <p>Open, modular invoice pipeline for custom enrichment and orchestration.</p>
  </a>

</div>

!!! tip
    Start with the [Overview and Decision Guide](02-approaches/index.md) to select the right implementation quickly.
