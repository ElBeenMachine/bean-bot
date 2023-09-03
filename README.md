# Setting Up Your Bot

## Installing Docker

Before running Bean-Bot, you must ensure that you have docker installed on your system. More information on this can be found [here](https://www.docker.com/get-started/).

## Set up your database

In order for the bot to run, you must have an accessible MongoDB database. I would recommend hosting your database on the free tier of MongoDB's Atlas service. You can set up a database cluster [here](https://cloud.mongodb.com).

Now that your database is set up, you will need to get your connection string. It should look something like this:

`mongodb+srv://<username>:<password>@<db_url>.mongodb.net/`

## Getting your bot token

Next, you need to register a bot with Discord and enable all intents. This can be accomplished on the [Discord Developer Portal](https://discord.com/developers).

## Starting the bot

Now that you have your database connection string and your bot token, you are ready to deploy your bot. Simply run the command below, and the bot will download and start.

`docker run --name bean-bot -e BOT_TOKEN="<BOT_TOKEN>" -e DB_URI="<DB_URI>" beenhamo/bean-bot`
