.PHONY: start stop deploy clean

PAYLOAD_PORT := $(shell grep '^PAYLOAD_PORT' .env | cut -d= -f2)

stop:
	@pkill -f "next dev" 2>/dev/null || true
	@pkill -f "vite" 2>/dev/null || true

start: stop
	bunx concurrently \
		--kill-others-on-fail \
		--names "cms,frontend" \
		"cd apps/cms && NODE_OPTIONS=--no-deprecation bunx next dev --port $(PAYLOAD_PORT) --hostname 0.0.0.0 --no-server-fast-refresh" \
		"bun run dev"

deploy:
	/opt/homebrew/bin/docker-compose down --rmi local
	git pull origin main
	/opt/homebrew/bin/docker-compose up -d --build

clean:
	rm -rf apps/cms/.next
