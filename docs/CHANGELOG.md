# Changelog

## 1.3.0 (2026-07-25)

### Added
- Added configurable homepage statements, index metrics, article-card cover policy, navigation menu, visitor IP, footer links, accent color, and color mode controls
- Added title-derived formula covers and animated SVG loading placeholders for post cards and article covers
- Added a left-side article table of contents with active-section tracking and optional display
- Added Halo search, comment, gallery-content, and footer extension integration
- Added client-side health probing for Links entries with `checking`, `online`, `warn`, and `idle` states
- Added a terminal-style 404 diagnostic with the requested path and blinking cursor

### Changed
- Reworked the homepage into a denser blog index led by the Halo site title, configurable statement, metrics, and latest posts
- Changed page transitions to an optional lightweight fade and disabled them by default
- Expanded light mode and configurable accent support across formula covers and plugin widgets
- Refined post excerpts, cover loading behavior, navigation path labels, footer controls, and auxiliary-page consistency
- Bumped theme version to `1.3.0`

### Fixed
- Fixed homepage comments metrics to use comment counts instead of duplicate visit counts
- Fixed formula visibility in light mode and live system color-scheme updates
- Fixed visitor IP refresh after PJAX navigation
- Fixed grouped Links rendering and removed fabricated link availability states
- Fixed plugin widgets and comments disappearing when components mount after initial page load

## 1.2.0 (2026-07-03)

### Added
- Added a unified `empty-state` base class for shared empty views across tag, category, archive, and links related pages
- Added release notes for the `1.2.0` milestone

### Changed
- Refined the post page hero typography, cover area, code block styling, and overall reading flow
- Restored the post page structure to a more stable baseline while keeping the refreshed article head
- Consolidated duplicated CSS for auxiliary pages, tag/category detail pages, and shared empty states
- Updated project documentation and release references to `1.2.0`
- Bumped theme version to `1.2.0`

### Fixed
- Fixed conflicting legacy post cover styles by removing unused selectors and reducing old article-page leftovers
- Fixed consistency issues between tag and category detail pages by merging duplicated style branches
- Fixed maintainability issues in `style.css` by collapsing repeated shell, frame, and empty-state definitions

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
