# Overview and Decision Guide

Use this page as the selection entry point for the four implementation repositories.

<p align="center">
<img src="../assets/img/approaches/decision-matrix.svg" alt="Decision matrix for document intelligence approaches" style="border-radius: 10px; max-width: 100%;"/>
</p>

## Quick comparison

| Approach | Strengths | Watchouts | Repo |
| --- | --- | --- | --- |
| Invoice + Document Intelligence | Fast onboarding, high precision for invoice fields, managed model lifecycle | Less flexible for highly unusual invoice formats | [PDFs-Invoice-Processing-Fapp-DocIntelligence](https://github.com/Cloud2BR-MSFTLearningHub/PDFs-Invoice-Processing-Fapp-DocIntelligence) |
| Layout + Document Intelligence | Works across broad PDF layouts, keeps structural context | Requires stronger post-processing rules | [PDFs-Layouts-Processing-Fapp-DocIntelligence](https://github.com/Cloud2BR-MSFTLearningHub/PDFs-Layouts-Processing-Fapp-DocIntelligence) |
| Multi-Layout Visual Cue | Handles mixed templates and positional anchors well | More complex routing and visual rule maintenance | [PDFs-MultiLayout-VisualCue-AzureAI-Document-Processing](https://github.com/Cloud2BR-MSFTLearningHub/PDFs-MultiLayout-VisualCue-AzureAI-Document-Processing) |
| Invoice + Open Framework | Maximum extensibility and custom business logic integration | Higher engineering ownership and governance needs | [PDFs-Invoice-Processing-Fapp-OpenFramework](https://github.com/Cloud2BR-MSFTLearningHub/PDFs-Invoice-Processing-Fapp-OpenFramework) |

## Decision flow

- If your documents are mostly invoices with stable fields, start with **Invoice + Document Intelligence**.
- If document types vary and table/structure extraction is key, use **Layout + Document Intelligence**.
- If you have many vendor templates and positional markers, use **Multi-Layout Visual Cue**.
- If you need a highly customizable and pluggable pipeline, choose **Invoice + Open Framework**.

## Deep dives

- [Invoice Processing with Document Intelligence](invoice-docint.md)
- [Layout Processing with Document Intelligence](layout-docint.md)
- [Multi-Layout Visual Cue Processing](multilayout-visualcue.md)
- [Invoice Processing with Open Framework](invoice-openframework.md)
