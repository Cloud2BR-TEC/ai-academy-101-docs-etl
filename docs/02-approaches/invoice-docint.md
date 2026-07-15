# Invoice Processing with Document Intelligence

**Repository:** [PDFs-Invoice-Processing-Fapp-DocIntelligence](https://github.com/Cloud2BR-MSFTLearningHub/PDFs-Invoice-Processing-Fapp-DocIntelligence)

<div align="center">
  <img src="../../assets/img/approaches/invoice-docint.svg" alt="Invoice processing with Document Intelligence architecture" style="border-radius:10px;max-width:100%;"/>
</div>

## What this approach does

Processes invoice PDFs using Azure Functions and Azure AI Document Intelligence to extract normalized invoice fields for downstream systems.

## Typical flow

1. Ingest invoice PDF into storage.
2. Trigger Function App processing.
3. Run Document Intelligence invoice extraction.
4. Validate and normalize extracted fields.
5. Persist output in storage/DB and publish integration event.

## Best fit

- AP automation and invoice reconciliation.
- Known invoice patterns with moderate template variation.
- Teams prioritizing managed AI service acceleration.

## Strengths

- Fast time to value.
- Strong built-in invoice extraction.
- Lower ML operations burden.

## Considerations

- Add confidence threshold handling for low-confidence fields.
- Implement retry and dead-letter strategy for failed documents.
- Keep a human-in-the-loop fallback for edge cases.
