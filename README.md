# herbage-runner

1. Make shell script file
```bash
#!/bin/bash
cd [DOCKER_COMPOSE_YML_PATH] || exit
docker-compose up -d
```
2. Set volume ex) "/srv/script.sh:RUN_SCRIPT_PATH"
3. Define its path to environment variable (RUN_SCRIPT_PATH)
