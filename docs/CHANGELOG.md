# Changelog

## 1.1.0 (2026-07-03)

### Added
- Added a unified auxiliary page design language for `tags`, `categories`, `archives`, and `links`
- Added a terminal-style links index that supports grouped friend links and single-page fallback
- Added release notes for the `1.1.0` milestone

### Changed
- Refreshed the tag cloud into a panel-based layout while keeping frequency-driven weights
- Reworked categories into a tree index and archives into a timeline stream
- Updated project documentation structure, installation guide, and development notes
- Bumped theme version to `1.1.0`

### Fixed
- Fixed short-page layout behavior by stabilizing the global PJAX container width and flex growth
- Fixed footer transparency and bottom placement in the shared page shell
- Fixed Halo compatibility issues in category and links templates caused by overly aggressive template expressions

## 1.0.0 (2026-07-02)

### Added
- First stable release of Echo 0x for Halo `2.25.0+`
- Added `AGENTS.md` collaboration guidelines and the initial `docs/` documentation set
- Added animated math-driven covers for AI, crypto, and original styles
- Added configurable homepage metrics, theme color mode, and cover style options
- Added page templates for posts, pages, tags, categories, archives, authors, About, and Links
- Added optional TOC, visitor IP, clock, and page transition effects

### Improved
- Optimized animated covers to start when entering the viewport via `IntersectionObserver`
- Unified asset versioning through `theme.yaml` to reduce cache issues
- Organized shared modules and frontend assets into a clearer structure

### Fixed
- Fixed static cover output so covers render dynamically on the client side
- Fixed hard-coded version handling in theme assets
- Fixed duplicate script inclusion across multiple templates
