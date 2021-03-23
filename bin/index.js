#!/usr/bin/env node
require = require("esm")(module);

const init = require("../lib");

const _defaultConfig = {
  passiveMode: false,
};

init(_defaultConfig);
