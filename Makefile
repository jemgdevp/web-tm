# ──────────────────────────────────────────────────────────
#  web-pf-ts · Makefile
# ──────────────────────────────────────────────────────────

PKG := pnpm

# ── colors ────────────────────────────────────────────────
RESET  := \033[0m
BOLD   := \033[1m
DIM    := \033[2m
CYAN   := \033[36m
GREEN  := \033[32m
YELLOW := \033[33m

# ── helpers ───────────────────────────────────────────────
define HEADER
	@printf '\n  $(BOLD)$(CYAN)web-pf-ts$(RESET)$(DIM) · available commands$(RESET)\n\n'
endef

# ── default ───────────────────────────────────────────────
.DEFAULT_GOAL := help

# ── targets ───────────────────────────────────────────────

.PHONY: help
help: ## Show this help
	$(HEADER)
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		sort | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  $(GREEN)%-20s$(RESET) %s\n", $$1, $$2}'
	@echo ''

.PHONY: dev
dev: ## Start Vite dev server (HMR)
	@$(PKG) dev

.PHONY: build
build: ## Type-check → production build
	@$(PKG) build

.PHONY: preview
preview: ## Preview production build locally
	@$(PKG) preview

.PHONY: type-check
type-check: ## Run vue-tsc --build
	@$(PKG) type-check

.PHONY: lint
lint: ## oxlint → eslint (auto-fix)
	@$(PKG) lint

.PHONY: format
format: ## Format src/ with Prettier
	@$(PKG) format

.PHONY: check
check: type-check lint format ## Full CI pass: types + lint + format
	@printf '$(GREEN)✓ all checks passed$(RESET)\n'

.PHONY: install
install: ## Install deps (frozen lockfile)
	@$(PKG) install --frozen-lockfile

.PHONY: clean
clean: ## Remove build artifacts & caches
	@rm -rf dist node_modules/.tmp .eslintcache
	@printf '$(GREEN)✓ cleaned$(RESET)\n'

.PHONY: nuke
nuke: clean ## Remove node_modules too
	@rm -rf node_modules
	@printf '$(GREEN)✓ node_modules removed$(RESET)\n'
