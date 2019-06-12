What is this?
===

This is a sample repository to try and pinpoint the problem in this issue: https://github.com/parse-community/Parse-SDK-JS/issues/835

Getting started
===

Quick start
---

Run `node install.js` (this will run `npm install` for both the client and the server)

Then `npm start` will begin a development environment (for both the client and the server)

**IMPORTANT**: If you do this way the React client will almost certainly start faster than the server so you will need to refresh the page once the server loads

The longer way
---

If you'd rather run the client and server independently: you will need to run `npm install` in both `/client` and `/server`

Then in `/server` run:

    docker-compose up

And in `/client` run:

    npm start
