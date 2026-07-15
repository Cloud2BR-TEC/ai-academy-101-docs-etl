# Layout Processing with Document Intelligence

**Repository:** [PDFs-Layouts-Processing-Fapp-DocIntelligence](https://github.com/Cloud2BR-MSFTLearningHub/PDFs-Layouts-Processing-Fapp-DocIntelligence)

<div align="center">
  <img src="../assets/img/approaches/layout-docint.svg" alt="Layout processing with Document Intelligence architecture" style="border-radius:10px;max-width:100%;"/>
</div>

## What this approach does

Extracts layout structures (paragraphs, lines, tables, key blocks) from PDFs, then applies transformation logic to produce machine-usable ETL outputs.

This approach is useful when structure matters as much as content, for example when table relationships and section placement drive business meaning.

## Typical flow

1. Receive source documents.
2. Execute Document Intelligence layout extraction.
3. Transform structural outputs into target schema.
4. Apply quality checks and business rules.
5. Deliver structured output for analytics or downstream automation.

## Concepts explained

- Layout extraction: Captures structural signals such as text blocks, lines, tables, and positional boundaries.
- Transformation mapping: Converts generic layout output into business-specific schema and entities.
- Structural validation: Confirms that expected sections, headers, or table patterns exist before integration.
- Versioned mappings: Keeps transformation logic traceable as document formats evolve over time.

## Best fit

- Mixed business documents (reports, forms, statements).
- Workloads where table and positional structure are critical.
- ETL pipelines that need reusable structural extraction.

## Architecture responsibilities

- Ingestion layer: Accepts multiple document types and metadata.
- Extraction layer: Produces comprehensive layout artifacts.
- Mapping layer: Applies deterministic transformation rules.
- Quality layer: Detects mapping failures and schema mismatches.
- Delivery layer: Publishes validated outputs to data and process consumers.

## Strengths

- Flexible extraction for many document types.
- Rich structural output for advanced transformations.
- Reusable document-to-schema transformation layer.

## Design guidance

1. Keep extraction and mapping logic separate to simplify maintenance.
2. Build reusable mapping components for recurring document sections.
3. Maintain a representative golden dataset for regression testing.
4. Capture mapping-level metrics, not only extraction-level metrics.
5. Treat mapping updates as versioned changes with approvals.

## Considerations

- Requires robust transformation mapping.
- Schema drift handling should be versioned.
- Observability is key for extraction quality trends.

## Implementation phases

<p align="center">
<img src="../assets/img/approaches/layout-docint-phases.svg" alt="Implementation phases for layout processing with Document Intelligence" style="border-radius: 10px; max-width: 100%;"/>
</p>

1. Discover: Inventory document families and define target canonical schema.
2. Build: Implement first-pass extraction and transformation components.
3. Validate: Test against edge templates and low-quality scans.
4. Operate: Add alerts, runbooks, and quality dashboards.
5. Evolve: Expand mappings while controlling change risk through versioning.

## Understanding layout output

Layout extraction describes where content appears and how elements relate spatially. Depending on the source and API capabilities, output can include pages, words, lines, paragraphs, tables, cells, selection marks, spans, and bounding regions. These are structural observations, not final business entities.

For example, a table cell containing `31/07/2026` does not reveal whether the value is a statement date, due date, or transaction date. Transformation logic must combine text, position, neighboring labels, page context, and document-family knowledge to assign business meaning.

## Source-document characteristics

### Digitally generated PDFs

These often contain embedded text and consistent geometry, but may still use complex reading order, nested tables, or vector elements. Validate whether extracted order matches human reading order.

### Scanned documents

Quality depends on resolution, contrast, skew, noise, shadows, and compression. Add input-quality checks and distinguish extraction failure from poor source quality. Reacquiring a document can be more effective than tuning mapping rules around an unreadable scan.

### Forms and reports

Forms may use repeated labels, empty fields, checkboxes, and positional grouping. Reports can include multi-column text, headers, footers, charts, and tables spanning pages. Define which structural elements are authoritative and which should be ignored.

### Mixed-document packages

A single file can contain several document types. Detect boundaries before mapping; otherwise fields from one section can be attributed to another. Preserve original page references after splitting.

## Canonical mapping design

Keep three representations separate:

1. Raw layout response: Immutable provider output retained according to policy for troubleshooting and replay.
2. Intermediate document model: Provider-neutral representation of pages, blocks, tables, and coordinates.
3. Canonical business contract: Validated entities consumed by downstream systems.

This separation limits provider coupling and makes mapping rules easier to test. A provider upgrade may change the raw response adapter without changing every business mapping.

Mapping rules should be explicit about:

- Preconditions: Document family, expected labels, section, or table signature.
- Extraction method: Exact label, relative position, table coordinates, pattern, or semantic rule.
- Normalization: Date locale, decimal separator, currency, units, whitespace, and code lookup.
- Validation: Required status, allowed values, range, cross-field relationship, and fallback.
- Provenance: Source page, region, text span, and mapping-rule version.

## Table extraction considerations

Tables are frequently the most complex part of layout processing. Test merged cells, repeated headers, blank columns, wrapped descriptions, tables spanning pages, continuation rows, and subtotal lines. Avoid assuming the first row is always the header or that every page repeats identical columns.

Measure table quality at several levels:

- Table detection: Was the correct table boundary found?
- Structure: Were rows, columns, and merged cells represented correctly?
- Cell text: Was the visible value extracted accurately?
- Semantic mapping: Was each column mapped to the correct business field?
- Reconciliation: Do row totals and summary values agree where expected?

## Schema evolution

Document layouts and downstream requirements both change. Use independent versions for the raw adapter, intermediate model, mapping rules, and canonical contract.

- Add optional fields before making them required.
- Avoid changing meaning while retaining the same field name.
- Store the contract and mapping version with each output.
- Run old and new mappings against the same golden documents during migration.
- Support consumers through a defined compatibility window for breaking changes.
- Keep replay behavior explicit: reprocessing historical documents can produce a newer contract and must not overwrite authoritative records silently.

## Mapping test framework

### Rule-level tests

Provide small structural fixtures for each mapping rule, including missing labels, duplicated labels, malformed tables, and locale variants.

### Golden-document tests

Run representative files through extraction and mapping. Compare normalized fields, table rows, provenance, validation status, and exception reason with reviewed expectations.

### Mutation tests

Vary whitespace, page breaks, row order, optional sections, and non-critical labels to confirm mappings are not unnecessarily brittle.

### Contract tests

Validate generated payloads against schema and consumer expectations. Test both the current and supported prior contract versions.

## Quality dashboard

Track more than OCR accuracy:

- Schema-conformance rate.
- Required-field completion by document family.
- Mapping precision and correction rate by field.
- Table structure and row reconciliation failures.
- Unknown-family and unsupported-layout volume.
- Exceptions by mapping rule and source.
- Quality changes after extraction, mapping, or contract releases.

## Failure handling

| Failure | Meaning | Recommended response |
| --- | --- | --- |
| No readable text | Corrupt, protected, or poor-quality source | Quarantine and request reacquisition |
| Unexpected layout | Mapping preconditions do not match | Route to unknown-family review |
| Missing section | Optional content or template drift | Apply explicit optional rule or exception |
| Table structure mismatch | Columns/rows differ from known shape | Preserve raw table and route for mapping review |
| Contract validation failure | Normalized output is unsafe to publish | Stop delivery and record field-level errors |
| Downstream rejects version | Consumer compatibility issue | Retry only after contract or adapter correction |

## Scaling mapping ownership

As document families grow, a central team can become a bottleneck. Define a mapping contribution model with templates, code review, golden-data requirements, ownership metadata, and release gates. Domain teams can own business interpretation while a platform team maintains shared extraction adapters, contracts, tooling, security, and observability.
