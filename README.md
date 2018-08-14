Accounting notebook
===========================

Overview
--------
Very simple REST Api to handle account transactions.

The api allow the user to:
- Get all transactions
- Get specific transaction by key
- Add new transactions

Install
-------
Requirements:
Node JS >= v10.8.0
```
git clone git@github.com:grunch/accounting.git
cd accounting
npm install
```

Run
-------
```
npm run start
```
API
-------
```
# Adding new transactions
curl -X POST -d 'amount=12499&type=debit' http://localhost:3000/api/v1/save_tx

# get all transactions
curl http://localhost:3000/api/v1/get_all

# get by key
curl http://localhost:3000/api/v1/get_tx?key=tx-key
```
Open the site on the web browser and see the transactions you just add it.
`http://localhost:3000`
