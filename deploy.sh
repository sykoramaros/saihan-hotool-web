#!/bin/bash

source .env.deploy

echo "📄 Načítám data z .env"


echo "🚀 Začínám deployment..."

if [ ! -d "build" ]; then
    echo "❌ Build složka neexistuje. Spusťte nejdříve 'npm run build'"
    exit 1
fi

echo "📦 Nahrávám build soubory na server..."

# Nahrát pouze build složku a .htaccess
rsync -avz --delete ./build/ $SERVER_USER@$SERVER_HOST:$SERVER_PATH/build/

if [ -f ".htaccess" ]; then
    scp ./.htaccess $SERVER_USER@$SERVER_HOST:$SERVER_PATH/
fi

echo "🐳 Restartování kontejneru..."

ssh $SERVER_USER@$SERVER_HOST "
    cd $SERVER_PATH &&
    # Zastavit a odstranit starý kontejner
    docker stop $CONTAINER_NAME 2>/dev/null || true &&
    docker rm $CONTAINER_NAME 2>/dev/null || true &&
    
    # DŮLEŽITÉ: Rebuild image s novými soubory
    docker build -t $IMAGE_NAME . &&
    
    # Spustit nový kontejner
    docker run -d -p $CONTAINER_PORT --name $CONTAINER_NAME $IMAGE_NAME
"