function stableHash(s = '') {
  let hash1 = 5381 | 0;
  let hash2 = hash1 | 0;

  for (let i = 0; i < s.length; i += 2) {
    hash1 = ((hash1 << 5) + hash1) ^ s.charCodeAt(i);
    if (i == s.length - 1 || s[i + 1] == '\0') break;
    hash2 = ((hash2 << 5) + hash2) ^ s.charCodeAt(i + 1);
  };

  return (hash1 + Math.imul(hash2, 1566083941)) | 0;
};

exports.GetStableHash = stableHash;