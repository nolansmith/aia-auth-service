const router = require('express').Router();


router.get('/health', (req,res) => res.send('Server OK'));


module.exports = router;