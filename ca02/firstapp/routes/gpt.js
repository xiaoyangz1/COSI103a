/*
  gpt.js -- Router for the Gpt
*/
const express = require('express');
const router = express.Router();
const GptItem = require('../models/gptItem')
const User = require('../models/User')
const openai = require('openai');

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

router.get('/recommendations',
  isLoggedIn,
  async (req, res, next) => {
    const recommendations = await GptItem.find({userId: req.user._id}).sort({date: -1});
    const genre = recommendations.length > 0 ? recommendations[0].genre : null;
    res.render('gpt', { recommendations: recommendations.length > 0 ? recommendations[0].recommendations : [], genre });
});

const axios = require('axios');

router.post('/recommendations',
  isLoggedIn,
  async (req, res, next) => {
    console.log("Inside /recommendations route");
    const genre = req.body.genre;
    const prompt = `Generate a list of top 5 movie recommendations for the ${genre} genre.`;

    try {
      const response = await axios.post('http://gracehopper.cs-i.brandeis.edu:3500/openai', { prompt: prompt });
      const recommendations = response.data.choices[0].message.content.match(/(?<=\d\.\s)(.*?)(?=\n|$)/g);

      const gptItem = new GptItem({
        userId: req.user._id,
        genre: genre,
        recommendations: recommendations,
      });

      await gptItem.save();

      res.redirect('/recommendations');

    } catch (error) {
        console.error('Error:', error.message);
        console.error(error.stack);
        res.status(500).send('Error generating recommendations');
    }
});


module.exports = router;
