# Governance and Operations

## Governance priorities

- Define data classification and retention per document type.
- Enforce role-based access and least privilege.
- Track model versions and extraction schema versions.
- Require change control for routing and extraction rules.
- Maintain auditable logs for extraction and downstream actions.

## Operational excellence checklist

| Area | Practice |
| --- | --- |
| Reliability | Retry policies, poison queue handling, fallback flow |
| Quality | Confidence thresholds, sampling review, benchmark set |
| Performance | Batch strategy, queue scaling, cold-start mitigation |
| Cost | Workload-based scaling, storage lifecycle, budget alerts |
| Support | Runbooks, alert routing, incident response playbooks |

## KPI model

- Extraction precision and recall by document family.
- End-to-end processing latency.
- Auto-processing rate vs human review rate.
- Failure rate by pipeline stage.
- Cost per processed document.
