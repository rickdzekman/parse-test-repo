import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";

var ParseServer = require("parse-server").ParseServer;
var ParseDashboard = require("parse-dashboard");

import config from "./config";

//@FIXME: See: https://github.com/ecohealthalliance/parse-server-amazon-ses-email-adapter/issues/5#issuecomment-424871812
require("@babel/polyfill");

const cloudpath = process.env.CLOUD_CODE_MAIN || __dirname + "/cloud/main.js";

var api = new ParseServer({
  databaseURI: config.mongoURL,
  cloud: cloudpath,
  appId: config.parseAppId,
  masterKey: config.parseMasterKey,
  liveQuery: {
    classNames: ["Test"]
  },
  serverURL: config.parseURL,
  verbose: 1
});

const dashConfig = {
  apps: [
    {
      serverURL: config.parseURL,
      appId: config.parseAppId,
      masterKey: config.parseMasterKey,
      appName: config.parseAppName
    }
  ],
  users: [
    {
      user: "admin",
      pass: "admin"
    }
  ]
};

if (process.env.NODE_ENV !== "production") {
  dashConfig.allowInsecureHTTP = true;
}

const dashOptions =
  process.env.NODE_ENV !== "production"
    ? { allowInsecureHTTP: true }
    : {
        allowInsecureHTTP: false,
        cookieSessionSecret: "TestCookieSecret"
      };

var dashboard = new ParseDashboard(dashConfig, dashOptions);

var app = express();

var httpServer = require("http").createServer(app);

if (process.env.NODE_ENV !== "production") {
  app.use(cors());
  app.use(logger("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", api);
app.use("/dashboard", dashboard);

app.use(express.static(path.join(__dirname, "public")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const liveQueryPort = 8000;
httpServer.listen(liveQueryPort);
ParseServer.createLiveQueryServer(httpServer);

export default app;
