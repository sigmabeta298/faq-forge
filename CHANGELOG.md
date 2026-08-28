## 0.1.1

### Added
- Browser/Worker-safe entry point at `@saulwalltech/faq-forge/browser`.

### Changed
- Separated Node-only file loading from the browser-safe FAQ parser.

### Compatibility
- Existing root imports remain unchanged.
- `loadFaqFromFile` continues to be available from `@saulwalltech/faq-forge`.