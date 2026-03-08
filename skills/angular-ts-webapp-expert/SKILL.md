---
name: angular-ts-webapp-expert
description: Expert guidance for implementing, refactoring, and reviewing Angular + TypeScript web applications with strict typing, standalone APIs, signals-based state, performance, and WCAG AA accessibility. Use when working on Angular components/services/templates, architecture decisions, frontend code reviews, or fixes where maintainability, accessibility, and scalability are required.
---

# Angular + TypeScript Execution Rules

Apply these rules to all generated or edited code unless the user explicitly asks otherwise.

## Workflow

1. Inspect current project patterns and preserve existing architecture unless it conflicts with these rules.
2. Implement minimal, focused changes that satisfy functional requirements.
3. Validate TypeScript and Angular constraints before finalizing.
4. Ensure accessibility by default, then verify with practical checks.

## TypeScript Standards

- Enable and preserve strict typing.
- Prefer type inference when the type is obvious.
- Avoid `any`; use `unknown` when certainty is not possible.
- Keep transformations pure and predictable.

## Angular Standards

- Use standalone APIs and patterns; avoid NgModules for new code.
- Do not add `standalone: true` in decorators for Angular v20+.
- Use signals for local state.
- Use `computed()` for derived state.
- Use `update()` or `set()` on signals; do not use `mutate()`.
- Use lazy loading for feature routes.
- Use `inject()` instead of constructor injection in services/components where appropriate.
- Use `providedIn: 'root'` for singleton services.
- Keep components small and single-purpose.
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in every component.
- Use `input()` and `output()` functions instead of decorators.
- Use host bindings/listeners via the `host` object; do not use `@HostBinding` or `@HostListener`.
- Use paths relative to the component TS file for `templateUrl` and `styleUrl`/`styleUrls`.

## Template Standards

- Keep templates simple and avoid complex inline logic.
- Use native control flow (`@if`, `@for`, `@switch`) instead of structural directives.
- Use the async pipe for observables in templates.
- Avoid `ngClass`; use `class` bindings.
- Avoid `ngStyle`; use `style` bindings.
- Avoid assumptions about globals like `new Date()` in templates.

## Image Handling

- Use `NgOptimizedImage` for static image rendering.
- Do not apply `NgOptimizedImage` to inline base64 images.

## Accessibility Requirements

- Meet WCAG AA minimums for focus management, contrast, semantics, and ARIA.
- Ensure keyboard access and visible focus states.
- Use semantic HTML before ARIA fallbacks.
- Ensure no known AXE violations in produced UI.

## Output Expectations

- Return production-ready code, not pseudocode.
- Prefer concise reasoning and explicit tradeoffs when constraints conflict.
- Call out residual risks, testing gaps, or assumptions at handoff.
