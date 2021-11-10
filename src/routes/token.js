
const { Router } = require('express');
const router = Router();
const services = require("../services/index.js");
const utils = {
    db: services.db
}
/* server auth */
const auth = services.auth(utils);

router.get('/token/:token', (req, res, next) => {
    res.json(auth.checkUserLoginToken(req.params.token));

});

module.exports = router;