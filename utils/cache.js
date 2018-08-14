const cache = require('memory-cache');
const crypto = require('crypto');

const set = object => {
  const key = crypto.randomBytes(20).toString('hex');
  object.effectiveDate = new Date().toISOString();
  const val = cache.put(key, object);
  if (val) {
    return key;
  }
  return null;
};

const get = key => {
  const val = cache.get(key);
  if (val) {
    return val;
  }
  return null;
};


const getAll = _ => {
  const keys = cache.keys();
  const tx = [];
  for (const k of keys) {
    tx.push(cache.get(k));
  }

  return tx;
};

module.exports = { get, set, getAll };
