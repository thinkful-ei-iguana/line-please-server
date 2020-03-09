
# Line Please Server

Created by Anugrah Lambogo

## Live Link

[Live API](https://shielded-temple-40772.herokuapp.com)

[Client Repo](https://github.com/thinkful-ei-iguana/line-please-app)

[Live Site](https://line-please-app.now.sh/)

## About this API

This is the API for the Line Please App. Line please is an application to help users commit text to memory using a teleprompt-like tool.

This API pulls from a SQL database with one table of uploaded texts. Users may upload texts via the client, view the text through the client's teleprompt tool, or delete texts via the client's request.

## Routes

/teleprompt, /textTitles, /upload, /listText

## Local dev setup

If using user `dunder-mifflin`:

```bash
mv example.env .env
createdb -U dunder-mifflin line-please
createdb -U dunder-mifflin line-please-test
```

If your `dunder-mifflin` user has a password be sure to set it in `.env` for all appropriate fields. Or if using a different user, update appropriately.

```bash
npm install
npm run migrate
env MIGRATION_DB_NAME=line-please-test npm run migrate
```

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.
