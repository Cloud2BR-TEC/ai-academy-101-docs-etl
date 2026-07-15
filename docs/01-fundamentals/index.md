# Fundamentals

This view consolidates the Azure services referenced across all four repositories and explains how they work together in the end-to-end document ETL pipeline.

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

## Service interaction model

- Ingestion: Storage accepts document uploads.
- Triggering: Function runtime receives event notifications and starts processing.
- Extraction: Document Intelligence and optional Vision/OpenAI process raw content.
- Persistence: Cosmos DB (or optional SQL) stores normalized outputs.
- Operations: Application Insights captures processing health and diagnostics.
- Security: Managed identities and RBAC enforce controlled access across services.

## How to use this overview

- Use this page to understand the common Azure baseline across all four approaches.
- Use [Overview and Decision Guide](../02-approaches/index.md) to select the implementation path.
- Then open each deep-dive page in [02. Approaches Catalog](../02-approaches/index.md) for approach-specific architecture and trade-offs.
