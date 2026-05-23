.PHONY: start cms frontend clean

start: clean
	$(MAKE) -j2 cms frontend

cms:
	cd apps/cms && bun run dev

frontend:
	bun run dev

clean:
	rm -rf apps/cms/.next
