# Security and Compliance Baseline

Document ETL pipelines handle sensitive data, so security controls must be integrated from day one.

## Baseline controls

- Identity-first access with Microsoft Entra ID.
- Private network access paths where possible.
- Secrets stored only in Azure Key Vault.
- Encryption in transit and at rest.
- Centralized audit and security monitoring.

## Security services to apply

| Control domain | Services |
| --- | --- |
| Identity and access | Microsoft Entra ID, Conditional Access, RBAC, Managed Identities |
| Network security | Private Endpoints, NSG, Azure Firewall, WAF |
| Data security | Key Vault, Purview, sensitivity labels, DLP |
| Monitoring and response | Defender for Cloud, Azure Monitor, Microsoft Sentinel |

## Compliance readiness

- Define document data classification matrix.
- Tag and enforce data residency requirements.
- Maintain evidence artifacts for audits.
- Review access logs and policy drift regularly.

!!! note
    Security controls should be applied consistently across all four approaches to avoid governance fragmentation.
