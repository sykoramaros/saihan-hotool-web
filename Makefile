.PHONY: start cms frontend

start:
	$(MAKE) -j2 cms frontend

cms:
	cd apps/cms && bun run dev

frontend:
	bun run dev
