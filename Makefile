.PHONY: start stop clean

stop:
	@pkill -f "next dev" 2>/dev/null || true
	@pkill -f "vite" 2>/dev/null || true

start: stop
	bunx concurrently \
		--kill-others-on-fail \
		--names "cms,frontend" \
		"bun run dev:cms" \
		"bun run dev"

clean:
	rm -rf apps/cms/.next
