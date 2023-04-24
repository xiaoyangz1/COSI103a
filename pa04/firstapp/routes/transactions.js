/*
  transactions.js -- Router for the Transaction
*/
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const TransactionItem = require('../models/TransactionItem')
const User = require('../models/User')


/*
this is a very simple server which maintains a key/value
store using an object where the keys and values are lists of strings

*/

isLoggedIn = (req,res,next) => {
  if (res.locals.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
}

router.get('/transactions/',
  isLoggedIn,
  async (req, res, next) => {
      const sortBy = req.query.sortBy
      const userId = req.user._id;
      let transactions;
      if (sortBy === 'category') {
        transactions = await TransactionItem.find({userId}).sort({category: 1});
      } else if (sortBy === 'amount') {
        transactions = await TransactionItem.find({userId}).sort({amount: -1});
      } else if (sortBy === 'description') {
        transactions = await TransactionItem.find({userId}).sort({description: 1});
      } else if (sortBy === 'date') {
        transactions = await TransactionItem.find({userId}).sort({date: 1});
      } else {
        transactions = await TransactionItem.find({userId});
      }
    
      res.render('transactions',{transactions});
});

router.get('/transactions/groupByCategory',
  isLoggedIn,
  async (req, res, next) => {
    console.dir(req.user._id+"")
    let results =
      await TransactionItem.aggregate(
        [ 
            {$match:{userId:new mongoose.Types.ObjectId(req.user._id)}},
            {$group:{
            _id:"$category",
            amount:{$sum:"$amount"}
            }},
            {$sort:{_id:1}}         
        ])

    //res.json(results)
    res.render('groupByCategory',{results})
});


router.post('/transactions',
  isLoggedIn,
  async (req, res, next) => {
      const transaction = new TransactionItem(
        {description:req.body.description,
         amount:parseFloat(req.body.amount),
         date: req.body.date,
         category:req.body.category,
         userId: req.user._id
        })
      await transaction.save();
      res.redirect('/transactions')
});

router.get('/transactions/remove/:itemId',
  isLoggedIn,
  async (req, res, next) => {
      console.log("inside /transactions/remove/:itemId")
      await TransactionItem.deleteOne({_id:req.params.itemId});
      res.redirect('/transactions')
});


router.get('/transactions/edit/:itemId',
  isLoggedIn,
  async (req, res, next) => {
      console.log("inside /transactions/edit/:itemId")
      const item = 
       await TransactionItem.findById(req.params.itemId);
      //res.render('edit', { item });
      res.locals.item = item
      res.render('editTransaction')
      //res.json(item)
});

router.post('/transactions/updateTransactionItem',
  isLoggedIn,
  async (req, res, next) => {
      const {itemId,description,amount,date,category} = req.body;
      console.log("inside /transactions/:itemId");
      await TransactionItem.findOneAndUpdate(
        {_id:itemId},
        {$set: {description,amount,date,category}} );
      res.redirect('/transactions')
});

module.exports = router;
