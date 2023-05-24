# Setup Instructions
- Use docker image `beenhamo/bean-bot`
- Set environment variables as follows

```
TOKEN=<YOUR_DISCORD_TOKEN_HERE>
APPLICATION_ID=<YOUR_DISCORD_APP_ID_HERE>
```

# Example docker run command

```
docker run -d --name bean-bot --restart=always beenhamo/bean-bot:latest
```