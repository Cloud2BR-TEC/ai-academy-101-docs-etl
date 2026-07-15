# Multi-Layout Visual Cue Processing

**Repository:** [PDFs-MultiLayout-VisualCue-AzureAI-Document-Processing](https://github.com/Cloud2BR-MSFTLearningHub/PDFs-MultiLayout-VisualCue-AzureAI-Document-Processing)

<div align="center">
  <img src="../../assets/img/approaches/multilayout-visualcue.svg" alt="Multi-layout visual cue processing architecture" style="border-radius:10px;max-width:100%;"/>
</div>

## What this approach does

Routes each document to a specialized extraction path based on detected layout signatures and visual cues, improving accuracy for highly variable templates.

## Typical flow

1. Ingest document and compute visual/layout features.
2. Classify template or layout family.
3. Select extraction strategy per family.
4. Extract fields and structural data.
5. Consolidate output into normalized schema.

## Best fit

- Multi-vendor or multi-template document estates.
- Documents where field meaning depends on location and visual markers.
- Programs requiring high extraction precision despite format variance.

## Strengths

- Better accuracy for heterogeneous templates.
- Separation of routing and extraction concerns.
- Scales through strategy packs per layout family.

## Considerations

- Requires lifecycle management for cue rules/classifiers.
- Template onboarding process should be formalized.
- Regression testing is important as new templates are introduced.
