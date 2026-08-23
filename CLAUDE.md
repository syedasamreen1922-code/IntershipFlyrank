# Flyrank AI Internship Project

## Stack
- Runtime: Node.js LTS
- Language: JavaScript
- IDE: Cursor with AI assistance

## Conventions
- Commits follow Conventional Commits format (feat:, fix:, docs:, chore:)
- Keep functions small and well-commented
- Use clear variable names

## Project Rules

1. All settings form validation must be implemented in `src/validation/settingsValidation.js`.

2. Every validation rule must have an automated test in `tests/validation.test.js`, including important edge cases.

3. Changes to the settings API must be tested in `tests/api.test.js`.

4. Validation errors must clearly identify the field that needs correction.

5. Run `npm test` before committing changes and confirm that all tests pass.
