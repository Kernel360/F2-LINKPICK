# techpick backend

0. create .env file

```
touch .env
```

1. Run with local docker compose

```bash
# 1. build jar
./gradlew clean build --exclude-task test
# 2. build image && run containers
docker compose up -d
```