const express = require('express');
const jwt = require('jsonwebtoken');
var Did = require('../schemas/did');

const { verifyToken } = require('./middlewares');

const router = express.Router();

router.post('/issue', async (req, res) => {
    const { address } = req.body;
    try {
        const did = await Did.findOne({ address });
        console.log(did);
        if(!did) {
            return res.status(401).json({
                code: 401,
                message: '등록되지 않은 DID입니다. 먼저 DID를 등록하세요',
            });
        }

        if(!did.valid){
            return res.status(401).json({
                code: 401,
                message: '만료된 DID를 사용하셨습니다. 다시 확인하세요',
            });
        }
        const token = jwt.sign({
            didAddress: did.address,
            didValid: did.valid,
        }, process.env.JWT_SECRET, {
            expiresIn: '1m',
            issuer: 'mongodb-api',
        });
        return res.json({
            code: 200,
            message: '토큰이 발급되었습니다',
            token
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            code: 500,
            message: '서버 에러',
        });
    }
});

router.get('/test', verifyToken, (req, res) => {
    res.json(req.decoded);
});

module.exports = router;