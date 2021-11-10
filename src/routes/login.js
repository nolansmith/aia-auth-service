const { Router } = require('express');
const router = Router();
const services = require("../services/index.js");
/* utilities to pass down through our application */
const utils = {
    db: services.db
};
/* server auth */
const auth = services.auth(utils);


router.post("/login", async (req, res, next) => {

    if (req.session.user) return res.json({ loginError: "already logged in" });

    let { username, password } = req.body;
    let { loginError } = await auth.tryToLogUserIn({ username, password });
    if (loginError) return res.json({ loginError });
    req.session.user = { username };
    req.session.salt = uuid();

    next();
});

router.post("/login", async (req, res, next) => {
    let { username } = req.session.user;
    let token = auth.createUserLoginToken({
        username,
        salt: req.session.salt,
        time: new Date().toLocaleDateString()
    });
    let response = { username, token };
    req.session.user = { ...response, lastActive: new Date().getTime() };

    res.json(response);
    next();
});

module.exports = router;
