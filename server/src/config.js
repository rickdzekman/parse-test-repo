const config = {
  mongoURL: process.env.MONGO_URL || "mongodb://localhost:27017/testdb",
  parseURL: process.env.SERVER_URL || "http://localhost:3001/api",
  parseAppId: "TestAppId",
  parseMasterKey: "TestAppMasterKey",
  parseAppName: "TestApp"
};

export default config;
