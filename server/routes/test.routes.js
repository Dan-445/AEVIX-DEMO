const router = require('express').Router();

router.get('/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

module.exports = router; 