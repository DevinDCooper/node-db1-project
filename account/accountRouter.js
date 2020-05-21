const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const accounts = await db("accounts");
    res.json(accounts);
  } catch (err) {
    console.log(err);
    res.json(500).json({ message: "problem with db", error: err });
  }
});

router.post('/', async (req, res) => {
    const accountData = req.body;
    try {
        const numAccount = await db('accounts').insert(accountData);
        res.status(201).json(numAccount);
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'problem with db', error:err});
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const newAccount = req.body;
    try {
        const count = await db('accounts').update(newAccount).where({ id });
        if (count) {
            res.json({ updated: count });
        } else {
            res.status(404).json({ message: 'invalid id' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'problem with db', error: err });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const count = await db('accounts').del().where({ id });
        if (count) {
            res.json({ deleted: count });
        } else {
            res.status(404).json({ message: 'invalid id' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'problem with db', error: err });
    }
});



module.exports =  router;