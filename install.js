var resolve = require("path").resolve;
var join = require("path").join;
var cp = require("child_process");
var os = require("os");

var npmCmd = os.platform().startsWith("win") ? "npm.cmd" : "npm";

function npm_install(where) {
  var props = { env: process.env, stdio: "inherit" };
  props["cwd"] = where;
  cp.spawn(npmCmd, ["i"], props);
}

function docker_build(where) {
  var props = { env: process.env, stdio: "inherit" };
  props["cwd"] = where;
  cp.spawn("docker-compose", ["build"], props);
}

var base = resolve(__dirname);
npm_install(base);
npm_install(join(base, "server"));
docker_build(join(base, "server"));
npm_install(join(base, "client"));
