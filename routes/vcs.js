var express = require('express');
var VC = require('../schemas/vc');
var Did = require('../schemas/did');

const { verifyToken } = require('./middlewares');

var router = express.Router();

router.get('/', verifyToken, async (req, res, next) => {
    try {
        var targetObject = await Did.findOne({ address: req.body.ownerDid }, { _id: 1 });
        var targetObjectId = targetObject._id;

        const vcs = await VC.find({ owner: targetObjectId }).populate('owner');
        console.log(vcs);
        res.json(vcs);
    } catch (err) {
        console.error(err);
        next(err);
    }
});
router.post('/', verifyToken, async (req, res, next) => {
    try {
        var targetObject = await Did.findOne({ address: req.body.ownerDid }, { _id: 1 });
        var targetObjectId = targetObject._id;

        const vc = new VC({
            owner: targetObjectId,
            vc: req.body.vcJson,
        });

        var result = await vc.save();
        // result = await VC.populate(result, { path: 'ownerDid' });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});
router.delete('/', verifyToken, async (req, res, next) => {
    try {
        const result = await VC.remove({ _id: req.body.vcId });
        res.json(result);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;