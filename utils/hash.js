const XXH = require("xxhashjs");

function stableHash(s = '') {
  return XXH.h64(s, 0x0).toString();
};

exports.GetStableHash = stableHash;