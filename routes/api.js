const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { get, set, getAll } = require('../utils/cache.js');

router.use(bodyParser.json());

router.post('/save_tx', async (req, res) => {
  req.check('amount', "amount is required").exists();
  req.check('amount', "amount can't be negative").isInt({gt: 0});
  req.check('type', 'type is required').exists();
  req.check('type', 'type must be credit or debit').isIn(['credit', 'debit']);
  const errors = req.validationErrors();
  if (errors) {
    res.status(412);
    res.json(errors);
    return;
  }
  const tx = { amount: req.body.amount, type: req.body.type };
  const key = await set(tx);
  if (key) {
    res.status(200);
    res.json({ key, msg: 'transaction completed' });
    return;
  }
  res.status(412);
  res.json({ error: 'Error on saving transaction' });
});

router.get('/get_all', (req, res, next) => {
  const txs = getAll();
  res.status(200);
  res.json(txs);
});

router.get('/get_tx', (req, res, next) => {
  req.check('key', "key is required").exists();
  req.check('key', "key must be a string").isString();
  const errors = req.validationErrors();
  if (errors) {
    res.status(412);
    res.json(errors);
    return;
  }

  const tx = get(req.query.key);
  if (tx) {
    res.status(200);
    res.json(tx);
    return;
  }
  res.status(412);
  res.json({ error: 'Transaction not found' });
});

module.exports = router;
