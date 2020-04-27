var express = require('express');
var Did = require('../schemas/did');

var router = express.Router();

router.post('/signup', async (req, res, next) => {
  const did = new Did({
    address: req.body.address,
    valid: true,
  });
  try{
    const result = await did.save();
    console.log(result);
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    next(err);
  };
});

router.patch('/expire', async (req, res, next) => {
  try {
    // console.log(req.params.did);
    // const result = await Did.find({ address: req.body.address});
    const result = await Did.update({ address: req.body.address }, { valid: false });
    console.log(result);  
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;