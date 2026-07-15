# Layout Processing with Document Intelligence

**Repository:** [PDFs-Layouts-Processing-Fapp-DocIntelligence](https://github.com/Cloud2BR-MSFTLearningHub/PDFs-Layouts-Processing-Fapp-DocIntelligence)

<div align="center">
  <img src="../../assets/img/approaches/layout-docint.svg" alt="Layout processing with Document Intelligence architecture" style="border-radius:10px;max-width:100%;"/>
</div>

## What this approach does

Extracts layout structures (paragraphs, lines, tables, key blocks) from PDFs, then applies transformation logic to produce machine-usable ETL outputs.

## Typical flow

1. Receive source documents.
2. Execute Document Intelligence layout extraction.
3. Transform structural outputs into target schema.
4. Apply quality checks and business rules.
5. Deliver structured output for analytics or downstream automation.

## Best fit

- Mixed business documents (reports, forms, statements).
- Workloads where table and positional structure are critical.
- ETL pipelines that need reusable structural extraction.

## Strengths

- Flexible extraction for many document types.
- Rich structural output for advanced transformations.
- Reusable document-to-schema transformation layer.

## Considerations

- Requires robust transformation mapping.
- Schema drift handling should be versioned.
- Observability is key for extraction quality trends.
