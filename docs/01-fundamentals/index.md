# Fundamentals

This view consolidates the Azure services referenced across all four repositories and explains how they work together in the end-to-end document ETL pipeline.

It is designed to provide a common language for technical and non-technical stakeholders before they choose a specific implementation approach.

## Repositories in scope

- [PDFs-Invoice-Processing-Fapp-DocIntelligence](https://github.com/Cloud2BR-MSFTLearningHub/PDFs-Invoice-Processing-Fapp-DocIntelligence)
- [PDFs-Layouts-Processing-Fapp-DocIntelligence](https://github.com/Cloud2BR-MSFTLearningHub/PDFs-Layouts-Processing-Fapp-DocIntelligence)
- [PDFs-MultiLayout-VisualCue-AzureAI-Document-Processing](https://github.com/Cloud2BR-MSFTLearningHub/PDFs-MultiLayout-VisualCue-AzureAI-Document-Processing)
- [PDFs-Invoice-Processing-Fapp-OpenFramework](https://github.com/Cloud2BR-MSFTLearningHub/PDFs-Invoice-Processing-Fapp-OpenFramework)

## End-to-end flow

1. Documents are uploaded to Azure Storage Blob containers.
2. Event-driven processing is triggered by Azure Functions (via blob trigger and/or Event Grid subscription patterns).
3. Extraction and understanding run through Azure AI services:
	- Azure AI Document Intelligence for invoice/layout extraction.
	- Azure AI Vision for visual cue detection in multi-layout scenarios.
	- Azure OpenAI for semantic interpretation and enrichment in advanced scenarios.
4. Structured outputs are validated and stored in Azure Cosmos DB (and optionally Azure SQL Database, depending on workload preference).
5. Telemetry and diagnostics are tracked through Application Insights.
6. Access is secured with managed identities, Microsoft Entra ID, and RBAC assignments.

## Why this flow matters

- It separates ingestion, extraction, normalization, and integration responsibilities so each stage can scale and evolve independently.
- It provides clear quality gates where confidence and validation rules can be applied.
- It supports incremental rollout because each stage can be improved without rewriting the full pipeline.
- It creates auditable checkpoints for compliance and operational troubleshooting.

## Azure services overview

| Azure service | How it works in these implementations | Where used |
| --- | --- | --- |
| Azure Resource Group | Logical boundary that groups all resources for lifecycle management, permissions, and tagging. | All four repos |
| Azure Storage Account (Blob) | Stores source PDFs/images and acts as the ingestion boundary. New blob writes trigger downstream processing. | All four repos |
| Azure Functions / Function App | Serverless execution layer that reacts to upload events, orchestrates extraction logic, and writes normalized outputs. Hosting plans vary by latency and scale requirements. | All four repos |
| Azure AI Document Intelligence | Core extraction engine for prebuilt invoice and layout models. Reads documents and returns structured fields, tables, key-value pairs, and layout elements. | Invoice DocInt, Layout DocInt, Multi-Layout Visual Cue |
| Azure AI Vision | Detects visual patterns and cues (checkmarks, highlights, selected regions) to complement layout extraction when templates vary. | Multi-Layout Visual Cue |
| Azure OpenAI | Adds semantic reasoning on extracted content and context-aware interpretation where deterministic extraction alone is not enough. | Multi-Layout Visual Cue |
| Azure Cosmos DB (NoSQL) | Persists extracted and enriched document payloads at scale with low-latency access and flexible schema support. | All four repos |
| Azure SQL Database (optional pattern) | Alternate persistence option for relational-heavy workloads that require strict schema and transactional queries. | Mentioned in Layout/OpenFramework architecture guidance |
| Azure Event Grid (System Topics / subscriptions) | Event routing pattern for blob-created events to serverless handlers; enables real-time decoupled processing. | Explicitly discussed in Layout and Multi-Layout repos |
| Application Insights | Centralized telemetry for function execution traces, errors, performance diagnostics, and operational analysis. | All function-based repos |
| Managed Identity + Microsoft Entra ID + RBAC | Identity and access model for secure service-to-service authentication and least-privilege authorization without storing credentials in code. | All four repos |

## Concepts behind the services

- Event-driven processing: New file arrival becomes the trigger for work, reducing polling overhead and improving responsiveness.
- Schema normalization: Different source formats are transformed into a stable internal model so downstream systems receive predictable outputs.
- Confidence management: Extraction confidence is treated as a business signal used to automate acceptance, rejection, or human review.
- Contract-first integration: Downstream APIs and databases should consume versioned payload contracts to avoid breaking changes.
- Observability by design: Logs, metrics, and traces should be created as part of the pipeline architecture, not added later.

## Service interaction model

- Ingestion: Storage accepts document uploads.
- Triggering: Function runtime receives event notifications and starts processing.
- Extraction: Document Intelligence and optional Vision/OpenAI process raw content.
- Persistence: Cosmos DB (or optional SQL) stores normalized outputs.
- Operations: Application Insights captures processing health and diagnostics.
- Security: Managed identities and RBAC enforce controlled access across services.

## Quality and exception strategy

1. Define minimum confidence thresholds per critical field and per document family.
2. Validate extracted payloads against business rules and schema contracts.
3. Route low-confidence or invalid outputs into exception queues.
4. Add human review workflows for high-impact exceptions.
5. Feed validated corrections back into rule updates and template onboarding.

## Performance and cost fundamentals

- Throughput: Tune function concurrency, queue/batch settings, and payload size.
- Latency: Track document arrival-to-output duration and stage-level timing.
- Cost drivers: AI extraction calls, function execution duration, storage operations, and data retention.
- Optimization: Use lifecycle policies, right-size hosting plans, and route documents to the simplest effective pattern.

## How to use this overview

- Use this page to understand the common Azure baseline across all four approaches.
- Use [Overview and Decision Guide](../02-approaches/index.md) to select the implementation path.
- Then open each deep-dive page in [02. Approaches Catalog](../02-approaches/index.md) for approach-specific architecture and trade-offs.

!!! note
	This page provides the shared platform baseline. The approach pages explain how each pattern changes extraction logic, routing complexity, and operating model.
