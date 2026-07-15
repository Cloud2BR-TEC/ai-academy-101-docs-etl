# Architecture Patterns

This page summarizes architecture patterns to operationalize document intelligence and ETL at scale.

## Reference architecture blocks

- Ingestion: Blob Storage, queues, event triggers.
- Processing: Azure Functions and extraction services.
- Intelligence: Document Intelligence models and routing logic.
- Normalization: Schema mapping and quality validation.
- Integration: Databases, APIs, and event publishing.
- Observability: Logging, metrics, and trace correlation.

## Pattern mapping

| Pattern | Recommended approach |
| --- | --- |
| Stable invoice formats | Invoice + Document Intelligence |
| Broad unstructured docs | Layout + Document Intelligence |
| High template diversity | Multi-Layout Visual Cue |
| Heavy custom orchestration | Invoice + Open Framework |

## Enterprise rollout model

1. Start with one high-volume document domain.
2. Build quality baseline and confidence thresholds.
3. Standardize error handling and remediation workflows.
4. Expand approach catalog by document family.
5. Continuously measure extraction quality and business impact.
