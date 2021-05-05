docker-compose down -v
echo "stopped containers and volumes, building nami ..."
docker-compose build nami
echo "nami was built"
docker-compose up -d 