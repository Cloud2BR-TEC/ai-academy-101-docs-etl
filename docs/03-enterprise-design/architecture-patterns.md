# Architecture Patterns

This page summarizes architecture patterns to operationalize document intelligence and ETL at scale.

Its purpose is to show how pattern choice affects architecture composition, delivery complexity, and platform operating model.

<p align="center">
<img src="../../assets/img/enterprise/architecture-blocks.svg" alt="Reference architecture blocks for document ETL pipelines" style="border-radius: 10px; max-width: 100%;"/>
</p>

## Reference architecture blocks

- Ingestion: Blob Storage, queues, event triggers.
- Processing: Azure Functions and extraction services.
- Intelligence: Document Intelligence models and routing logic.
- Normalization: Schema mapping and quality validation.
- Integration: Databases, APIs, and event publishing.
- Observability: Logging, metrics, and trace correlation.

## Architecture principles

- Separate concerns by stage so ingestion, extraction, mapping, and integration can evolve independently.
- Design for idempotency to support retries and replay without duplicate side effects.
- Treat schema and routing rules as versioned assets with change control.
- Build for traceability so each output can be linked back to source file, model, and rule versions.
- Favor composable components that can be reused across document families.

## Pattern mapping

| Pattern | Recommended approach |
| --- | --- |
| Stable invoice formats | Invoice + Document Intelligence |
| Broad unstructured docs | Layout + Document Intelligence |
| High template diversity | Multi-Layout Visual Cue |
| Heavy custom orchestration | Invoice + Open Framework |

## Pattern selection depth

| Dimension | Managed invoice pattern | Layout pattern | Multi-layout pattern | Open framework pattern |
| --- | --- | --- | --- | --- |
| Delivery speed | High | Medium | Medium | Medium to low |
| Template variance tolerance | Low to medium | Medium | High | High |
| Engineering customization | Medium | Medium | High | Very high |
| Operations complexity | Low | Medium | High | High |
| Governance burden | Medium | Medium | High | High |

## Integration patterns

- Event-first integration: Publish document processing outcomes to event streams for decoupled downstream processing.
- API-first integration: Expose validated normalized payloads through governed service endpoints.
- Data-lake integration: Store curated outputs for analytics, BI, and historical benchmarking.
- Hybrid integration: Combine transactional delivery for operations and batch delivery for analytics.

## Resilience patterns

1. Retry transient failures with bounded backoff.
2. Route unrecoverable failures to poison queues with actionable metadata.
3. Implement replay tooling for controlled reprocessing.
4. Use circuit-breaking controls for unstable external dependencies.
5. Add fallback logic for low-confidence extraction outcomes.

## Enterprise rollout model

1. Start with one high-volume document domain.
2. Build quality baseline and confidence thresholds.
3. Standardize error handling and remediation workflows.
4. Expand approach catalog by document family.
5. Continuously measure extraction quality and business impact.

## Recommended architecture artifacts

- Canonical data contract for normalized document output.
- Routing and extraction rule catalog with owners and version history.
- End-to-end observability model including key traces and KPIs.
- Exception handling playbook and support runbooks.
- Security and governance control matrix mapped to pipeline stages.
