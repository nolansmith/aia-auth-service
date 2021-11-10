import regeneratorRuntime from 'regenerator-runtime/runtime';
const express = require("express");
const session = require("express-session");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const compress = require("compression");
const uuid = require("uuid/v4");
const services = require("./services/index.js");
const { loginRoutes, healthRoutes, tokenRoutes } = require("./routes/index.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    cookie: {
      secure: true
    },
    secret: process.env.SERVER_SESSION,
    name: process.env.SERVER_SESSION_COOKIE,
    resave: false,
    saveUninitialized: true,
    unset: "destroy",
    genid: req => {
      // Returns a random string to be used as a session
      return uuid();
    }
  })
);

/* some middleware */
/* header security */
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "*.googleapis.com", "*.gstatic.com", "'unsafe-inline'"],
      fontSrc: ["*.googleapis.com", "*.gstatic.com"],
      imgSrc: ["'self'", 'data:', '*.amazonaws.com'],
    },
  }),
);
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

/* CORS */
app.use(cors());

/* compression */
app.use(compress());

app.disable("x-powered-by");

const httpPort = process.env.PORT || 3000;
const httpsPort = process.env.HTTPS || 443;


app.use(tokenRoutes);
app.use(loginRoutes);
app.use(healthRoutes);

app.get("/*", (req, res) => {
  res.send('API Server')
});

app.listen(httpPort, () =>
  console.log(`[+] AIA API Server Started on ${httpPort}`)
);

/* listen with https service */
if (process.env.USING_HTTPS === "yes") {
  services
    .https(app)
    .listen(httpsPort, () =>
      console.log(`[+] HTTPS AIA API Server Started on ${httpsPort}`)
    );
}
