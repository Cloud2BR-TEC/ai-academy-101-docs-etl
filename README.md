# Document Intelligence Approaches

This repository contains the course content and architecture guidance for **Document Intelligence approaches** across four implementation repos.

## Scope

The course compares and explains these implementations:

- [PDFs-Invoice-Processing-Fapp-DocIntelligence](https://github.com/Cloud2BR-MSFTLearningHub/PDFs-Invoice-Processing-Fapp-DocIntelligence)
- [PDFs-Layouts-Processing-Fapp-DocIntelligence](https://github.com/Cloud2BR-MSFTLearningHub/PDFs-Layouts-Processing-Fapp-DocIntelligence)
- [PDFs-MultiLayout-VisualCue-AzureAI-Document-Processing](https://github.com/Cloud2BR-MSFTLearningHub/PDFs-MultiLayout-VisualCue-AzureAI-Document-Processing)
- [PDFs-Invoice-Processing-Fapp-OpenFramework](https://github.com/Cloud2BR-MSFTLearningHub/PDFs-Invoice-Processing-Fapp-OpenFramework)

## Documentation site

- GitHub Pages: https://cloud2br-tec.github.io/ai-academy-101-docs-etl/

## Local development

```bash
pip install mkdocs mkdocs-material pymdown-extensions
mkdocs serve
mkdocs build --strict
```

## Structure

- `docs/index.md`: landing page
- `docs/01-fundamentals/index.md`: course context and outcomes
- `docs/02-approaches/`: per-approach technical guidance
- `docs/03-enterprise-design/`: architecture and operations guidance
- `docs/04-security/index.md`: security and compliance baseline
