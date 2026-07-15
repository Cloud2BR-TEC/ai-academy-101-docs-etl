# Invoice Processing with Document Intelligence

**Repository:** [PDFs-Invoice-Processing-Fapp-DocIntelligence](https://github.com/Cloud2BR-MSFTLearningHub/PDFs-Invoice-Processing-Fapp-DocIntelligence)

<div align="center">
  <img src="../assets/img/approaches/invoice-docint.svg" alt="Invoice processing with Document Intelligence architecture" style="border-radius:10px;max-width:100%;"/>
</div>

!!! info "At a glance"
    Use this pattern when invoices are the dominant document type, standard fields drive the process, and the team wants managed extraction with a controlled validation and review layer.

> **Best-fit signal:** Standard invoice fields and moderate layout variation favor a managed-first implementation.

## What this approach does

Processes invoice PDFs using Azure Functions and Azure AI Document Intelligence to extract normalized invoice fields for downstream systems.

It focuses on rapid delivery by using prebuilt invoice intelligence while still allowing enterprise controls around quality, exceptions, and auditability.

## Typical flow

1. Ingest invoice PDF into storage.
2. Trigger Function App processing.
3. Run Document Intelligence invoice extraction.
4. Validate and normalize extracted fields.
5. Persist output in storage/DB and publish integration event.

## Concepts explained

- Prebuilt invoice model: A managed model optimized for common invoice entities such as vendor, invoice number, dates, totals, tax, and line items.
- Normalization contract: A stable output schema that downstream systems can trust regardless of source invoice format.
- Confidence thresholding: A policy layer that decides whether fields are auto-accepted, auto-rejected, or sent for review.
- Exception path: A controlled process for documents that fail extraction quality checks or business validation rules.

## Best fit

- AP automation and invoice reconciliation.
- Known invoice patterns with moderate template variation.
- Teams prioritizing managed AI service acceleration.

## Architecture responsibilities

- Ingestion layer: Collects invoice files and metadata from upstream channels.
- Extraction layer: Calls Document Intelligence and receives structured invoice output.
- Validation layer: Enforces required fields, value ranges, and consistency checks.
- Integration layer: Delivers approved records to ERP, finance, or data platforms.
- Operations layer: Captures traces, metrics, and errors for support and optimization.

## Strengths

- Fast time to value.
- Strong built-in invoice extraction.
- Lower ML operations burden.

## Quality model recommendations

1. Define field criticality tiers, for example payment amount and due date as high criticality.
2. Set confidence thresholds per field tier instead of one global threshold.
3. Capture confidence distribution by vendor and template to identify drift.
4. Create deterministic fallback rules for known weak fields.
5. Track false-positive and false-negative rates from reviewed samples.

## Considerations

- Add confidence threshold handling for low-confidence fields.
- Implement retry and dead-letter strategy for failed documents.
- Keep a human-in-the-loop fallback for edge cases.

!!! warning "Managed extraction is not automatic approval"
  Critical payment fields still require field-specific confidence policies, arithmetic validation, duplicate checks, and a staffed exception process.

> **Control principle:** Treat extraction as proposed data until confidence, business rules, and duplicate checks approve it.

## Implementation phases

<p align="center">
<img src="../assets/img/approaches/invoice-docint-phases.svg" alt="Implementation phases for invoice processing with Document Intelligence" style="border-radius: 10px; max-width: 100%;"/>
</p>

1. Pilot: Start with a narrow invoice domain and baseline quality metrics.
2. Harden: Add exception handling, runbooks, and governance controls.
3. Scale: Onboard new invoice families using reusable normalization contracts.
4. Optimize: Improve thresholding and cost-performance ratios with real data.

## Invoice data model

Separate header-level fields from repeating line items and processing metadata. Common header fields include supplier identity, invoice number, purchase-order reference, issue date, due date, currency, subtotal, tax, discount, freight, and total. Line items can include description, quantity, unit, unit price, tax, and line total.

Do not assume that a field appearing in model output is valid for payment. Apply checks such as:

- Invoice number is present and not already processed for the same supplier.
- Currency is explicit or derived through an approved rule.
- Subtotal, tax, adjustments, and total reconcile within a defined tolerance.
- Line totals reconcile with quantities and unit prices when those fields are available.
- Purchase order and supplier identifiers exist in authoritative systems.
- Dates are plausible and normalized without ambiguous locale interpretation.
- Bank-account changes or unusual payment instructions trigger additional controls.

## Confidence and acceptance policy

Model confidence is one input into acceptance, not the final decision. Define field tiers based on business impact.

| Tier | Example fields | Typical handling principle |
| --- | --- | --- |
| Critical | Supplier, invoice number, currency, total, payment destination | Require strong confidence plus deterministic validation or review |
| Important | Dates, purchase order, tax, line totals | Accept when confidence and cross-field checks agree |
| Descriptive | Free-text description, notes | Lower threshold may be acceptable if not used for financial decisions |

Calibrate thresholds on reviewed examples. For each proposed threshold, measure false acceptance, false rejection, and resulting review volume. A threshold that maximizes overall accuracy may still expose unacceptable risk on a critical field.

## Common invoice variants

### Multi-page invoices

Verify that page boundaries do not split line items incorrectly and that totals are taken from the authoritative summary rather than repeated headers or footers. Retain page references for review.

### Credit notes and corrected invoices

Classify these explicitly rather than treating every financial document as a standard invoice. Normalize signs, link corrections to original invoices where possible, and avoid duplicate payment workflows.

### Multiple currencies and locales

Store the numeric value and ISO currency separately. Normalize dates only when locale evidence is sufficient. Preserve original text when ambiguity cannot be resolved automatically.

### Attachments and combined files

A PDF may contain an invoice plus receipts, delivery records, or terms. Define whether to split, ignore, retain, or classify supporting pages, and prevent their values from contaminating invoice totals.

### Poor-quality or handwritten inputs

Skew, compression, shadows, handwriting, and damaged scans can reduce extraction quality. Apply input-quality checks and route unreadable pages to reacquisition or review rather than repeatedly calling extraction.

## Human review operating model

Human review is a production component, not an emergency fallback.

1. Present the source page beside extracted fields and confidence indicators.
2. Prioritize queues by payment risk, due date, value, and service level.
3. Require reason codes for corrections and rejected documents.
4. Capture reviewed values as evaluation evidence, subject to privacy controls.
5. Prevent a reviewer from approving changes outside authorized fields or thresholds.
6. Track review time, correction rate, backlog age, and repeated failure causes.

Define escalation paths for suspected fraud, supplier-master mismatch, duplicate invoices, and documents that cannot be interpreted confidently.

## Golden dataset and regression gates

Build the dataset from production-like families and maintain explicit subsets:

- Baseline set representing normal document volume.
- Edge set covering rare layouts, multi-page documents, low-quality scans, and unusual currencies.
- Failure set containing previously observed defects.
- Security set with malformed, oversized, or prohibited inputs.

For each release, compare field-level results with the current production baseline. Block promotion when critical-field quality, straight-through rate, or exception quality falls outside approved tolerance. Review intentional changes separately from regressions.

!!! tip "Keep past failures in the test set"
  Every corrected production defect should become a regression example so future model, mapping, or threshold changes cannot silently reintroduce it.

## Integration and idempotency

Use a stable idempotency key based on trusted source identity, supplier, invoice number, or content hash according to business rules. Record delivery state before and after calling downstream systems. A retry must either return the original result or safely complete the pending transaction without creating a duplicate invoice.

Do not publish raw model responses as the finance contract. Map approved fields into a versioned canonical invoice schema and include provenance so disputes can be traced back to the source, extraction version, rules, and reviewer.

## Operational dashboard

Monitor at least:

- Volume, pages, and processing latency by source and supplier family.
- Critical-field exact-match rate on reviewed samples.
- Confidence distribution and threshold outcomes by field.
- Straight-through, human-review, rejection, and failure rates.
- Duplicate detection and downstream rejection counts.
- Retry volume, poison-queue age, and dependency throttling.
- Cost per processed and successfully accepted invoice.

??? warning "Invoice exception response guide"
  | Scenario | Automated response | Operational action |
  | --- | --- | --- |
  | Extraction timeout | Retry with bounded backoff | Check dependency health and queue age |
  | Unsupported or corrupt file | Quarantine without repeated extraction | Request a valid source document |
  | Missing critical field | Route to review | Correct or reject with reason code |
  | Arithmetic mismatch | Route to review or supplier workflow | Validate totals and business tolerance |
  | Downstream unavailable | Retain accepted payload and retry delivery | Monitor acknowledgement backlog |
  | Duplicate detected | Stop new delivery and link prior record | Confirm duplicate policy and audit trail |
