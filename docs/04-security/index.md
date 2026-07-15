# Security and Compliance Baseline

Document ETL pipelines handle sensitive data, so security controls must be integrated from day one.

This baseline applies to all approach patterns and should be implemented as shared platform standards, not optional per-project add-ons.

<p align="center">
<img src="../assets/img/security/security-baseline.svg" alt="Defense-in-depth security baseline layers" style="border-radius: 10px; max-width: 100%;"/>
</p>

## Baseline controls

- Identity-first access with Microsoft Entra ID.
- Private network access paths where possible.
- Secrets stored only in Azure Key Vault.
- Encryption in transit and at rest.
- Centralized audit and security monitoring.

## Security concepts explained

- Zero trust: Never assume trust based on network position; validate identity, context, and policy at each access point.
- Least privilege: Grant only the minimum permissions required for each identity and workload.
- Defense in depth: Apply complementary controls across identity, network, data, and monitoring layers.
- Segregation of duties: Separate build, deploy, and approve responsibilities to reduce risk.
- Continuous assurance: Treat compliance as an ongoing control process, not a one-time checklist.

## Security services to apply

| Control domain | Services |
| --- | --- |
| Identity and access | Microsoft Entra ID, Conditional Access, RBAC, Managed Identities |
| Network security | Private Endpoints, NSG, Azure Firewall, WAF |
| Data security | Key Vault, Purview, sensitivity labels, DLP |
| Monitoring and response | Defender for Cloud, Azure Monitor, Microsoft Sentinel |

## Baseline by pipeline layer

| Pipeline layer | Minimum controls |
| --- | --- |
| Ingestion | Private endpoints, upload validation, malware scanning policy, immutable logging |
| Processing | Managed identities, least-privilege RBAC, secure configuration, runtime patch governance |
| Extraction and enrichment | Approved model endpoints, prompt and input controls, output validation |
| Storage and integration | Encryption keys in Key Vault, data classification tags, controlled API scopes |
| Operations and support | Centralized SIEM onboarding, alert routing, incident response runbooks |

## Compliance readiness

- Define document data classification matrix.
- Tag and enforce data residency requirements.
- Maintain evidence artifacts for audits.
- Review access logs and policy drift regularly.

## Implementation roadmap

<p align="center">
<img src="../assets/img/security/implementation-roadmap.svg" alt="Security implementation roadmap" style="border-radius: 10px; max-width: 100%;"/>
</p>

1. Foundation: Establish identity, network, key management, and logging baseline.
2. Enablement: Map regulatory requirements to enforceable technical controls.
3. Validation: Run control testing and close policy gaps before production launch.
4. Operations: Automate evidence collection and policy drift detection.
5. Improvement: Continuously tune controls based on incidents and audit findings.

!!! note
    Security controls should be applied consistently across all four approaches to avoid governance fragmentation.

## Threat model

Start with data flow: where documents originate, which services process them, where derivatives are stored, who can review them, and which systems receive output. Identify trust boundaries and abuse cases at each transition.

Relevant threats include:

- Unauthorized document upload or submission under another tenant or source.
- Malformed, oversized, encrypted, or malicious files exhausting processing resources.
- Sensitive content written to logs, traces, prompts, or support exports.
- Compromised workload identity reading source documents or altering outputs.
- Routing or threshold changes that cause unsafe automatic acceptance.
- Duplicate or replayed events generating duplicate business transactions.
- Dependency or software-supply-chain compromise.
- Reviewer account abuse or excessive access to document content.
- Data exfiltration through public endpoints, outbound calls, or unmanaged exports.
- Valid-looking but incorrect extraction reaching an authoritative system.

Record mitigations, detection, owner, residual risk, and review trigger. Revisit the model when a new data source, AI capability, integration, region, or human-review tool is introduced.

## Identity architecture

### Workload identities

Prefer managed identities for Azure-hosted workloads. Assign a separate identity when components have distinct permissions or owners. Scope roles to the narrowest practical resource and operation. Avoid broad subscription roles for application execution.

### Human identities

Use Microsoft Entra ID groups for role assignment, Conditional Access according to organizational policy, and privileged identity management for elevated access where available. Separate ordinary support, document review, deployment, and security administration.

### Authorization-sensitive actions

Apply additional control to actions that can change business outcomes:

- Editing confidence thresholds or routing policy.
- Promoting models, mappings, or processors.
- Replaying or redelivering documents.
- Viewing unredacted sensitive content.
- Approving high-value exceptions.
- Changing retention or audit configuration.

Use approval, time-bound elevation, and immutable audit evidence based on risk.

## Secrets and certificate lifecycle

Managed identity reduces but does not eliminate secrets. External APIs, signing certificates, database credentials, or legacy systems may still require them.

1. Inventory secrets, certificates, owners, consumers, and expiration.
2. Store them in an approved vault with restricted data-plane access.
3. Retrieve at runtime; do not place values in source, images, templates, or logs.
4. Rotate automatically where supported and test overlapping validity.
5. Alert before expiration and on unusual retrieval patterns.
6. Define emergency revocation and replacement procedures.
7. Remove unused versions and consumers after migration.

Break-glass access should be exceptional, monitored, tested, and reviewed after use. Do not share emergency credentials through ordinary collaboration tools.

## Network security

Use private endpoints and virtual-network integration when required by the risk model and supported by the service. Plan private DNS, outbound routing, subnet capacity, and management access. A private endpoint controls network reachability but does not authorize the caller; retain identity and RBAC controls.

For any remaining public endpoint:

- Disable it when unnecessary.
- Restrict allowed networks or service access where supported.
- Require strong authentication and TLS.
- Apply rate limits, request size limits, and input validation.
- Monitor denied and anomalous traffic.

Control outbound traffic as well as inbound traffic. Extraction components should not have unrestricted internet access if they only need approved Azure and enterprise endpoints.

## API and event security

- Authenticate callers with managed identity or approved delegated/application identity rather than static keys where feasible.
- Authorize by operation, tenant, source, and data scope.
- Validate content type, size, filename metadata, schema, and required claims before accepting work.
- Use rate limiting and quotas to protect availability and control cost.
- Sign or authenticate events and validate expected source.
- Treat event payloads as untrusted even when delivered by a managed broker.
- Use idempotency and replay protection for state-changing operations.
- Avoid placing sensitive document content in URLs, queue names, or event subjects.

Return non-sensitive error messages to callers while retaining detailed diagnostics in controlled telemetry.

## Document intake security

Create a controlled landing zone before documents reach high-trust processing.

1. Validate allowed file types using content inspection, not extension alone.
2. Enforce file, page, and decompression limits.
3. Detect encrypted or password-protected documents and route according to policy.
4. Apply malware-scanning or content-disarm controls required by the organization.
5. Store new files with restricted access until validation completes.
6. Record source identity, hash, validation result, and policy version.
7. Quarantine prohibited content without repeatedly processing it.

Rendering and parsing libraries can have vulnerabilities. Keep dependencies patched and isolate high-risk preprocessing according to the threat model.

## Data protection and minimization

- Collect only fields required for the defined business purpose.
- Separate source documents from normalized records and grant access independently.
- Encrypt data in transit and at rest using platform controls and approved key policy.
- Use customer-managed keys only when requirements justify added lifecycle and recovery responsibility.
- Mask or omit sensitive fields in logs, dashboards, review queues, and non-production environments.
- Tokenize or redact content before optional semantic enrichment when the use case permits.
- Define regional processing and replication constraints explicitly.

Data minimization also applies to prompts and AI requests. Send only the pages, regions, or fields necessary for the task, and document whether data is retained or used by each selected service configuration.

## Data loss prevention and exfiltration controls

Consider exfiltration paths through storage exports, support downloads, logs, public endpoints, outbound network calls, CI/CD artifacts, analytics copies, and human-review screenshots.

Apply controls such as:

- Purview classification and sensitivity labeling where applicable.
- Storage and database access restrictions.
- Approved export paths with auditing.
- Outbound network controls and DNS monitoring.
- DLP policies for collaboration and endpoint channels.
- Alerts on bulk reads, unusual locations, or access outside normal patterns.
- Watermarking or restricted views for sensitive review scenarios where required.

## Software supply-chain security

Protect application code, infrastructure definitions, containers, and dependencies.

- Require branch protection and reviewed pull requests.
- Run static analysis, dependency scanning, secret detection, and infrastructure policy checks.
- Pin and update dependencies through a controlled process.
- Generate artifact provenance and a software bill of materials where required.
- Use trusted build agents and restrict production deployment identity.
- Scan container images and use minimal supported base images.
- Sign or otherwise verify deployable artifacts according to platform policy.
- Separate build permission from production approval.

Treat custom processors and third-party libraries as part of the system risk, even if the AI service itself is managed.

## AI-specific controls

Document Intelligence and optional generative enrichment have different risk profiles.

- Validate extracted output before it can trigger business action.
- Keep deterministic checks for critical financial or compliance fields.
- Record model, API, prompt, and configuration versions used.
- Test model changes against approved datasets before deployment.
- Treat document text as untrusted input that may contain instructions or adversarial content.
- If using generative AI, constrain tools, data access, output schema, and allowed decisions.
- Do not allow generated narrative to override authoritative validation silently.
- Monitor quality by family and detect drift independently of service availability.

Managed-service confidence is not proof that a value is safe. Authorization and business validation remain application responsibilities.

## Third-party and service risk

For each external or managed service, review:

- Data location and processing region.
- Retention and service configuration.
- Contractual and compliance commitments relevant to the organization.
- Identity, encryption, logging, and private-connectivity capabilities.
- Subprocessors and support-access model where applicable.
- Availability, quotas, deprecation policy, and exit strategy.
- How data and configuration can be exported, deleted, or migrated.

Reassess when service terms, region availability, architecture, or data classification changes.

## Security monitoring

Centralize relevant logs in Azure Monitor and/or Microsoft Sentinel according to the operating model. Useful detections include:

- Repeated authorization failures or access from unusual context.
- New public exposure or network policy drift.
- Privileged role assignment and emergency-access use.
- Unusual bulk document reads or exports.
- Key Vault access spikes, denied operations, or impending expiration.
- Security-control disablement or logging gaps.
- Sudden changes in routing, thresholds, or automatic acceptance.
- Malware or prohibited-file detections.
- Unexpected outbound connections.

Tune detections to avoid overwhelming responders, and link alerts to tested investigation and containment runbooks.

## Security incident response

Prepare playbooks for credential compromise, data exposure, malicious upload, unsafe output delivery, dependency compromise, and unauthorized configuration change.

1. Preserve relevant logs, versions, document IDs, and access evidence.
2. Contain by disabling identity, route, endpoint, processor, or delivery path as appropriate.
3. Determine affected documents, data, users, regions, and downstream systems.
4. Rotate secrets or certificates and revoke sessions when identity is involved.
5. Restore known-good code and configuration through controlled deployment.
6. Replay only after safety and duplicate-impact analysis.
7. Follow legal, privacy, regulatory, and communication procedures.
8. Add detections and preventive controls based on root cause.

## Security verification checklist

- Threat model and data-flow diagram are current.
- Every workload and human role has an owner and justified scope.
- Public endpoints and outbound access are documented and approved.
- Secrets, certificates, and emergency access have tested lifecycle procedures.
- Intake controls handle malformed, malicious, oversized, and encrypted files.
- Sensitive content is excluded from general logs and lower environments.
- CI/CD enforces security gates and artifact traceability.
- Security events reach the monitoring and response platform.
- Backup, restore, deletion, and incident playbooks are tested.
- Model and rule changes cannot bypass business validation or release approval.
