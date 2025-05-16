import express from "express";
import bodyParser from "body-parser";
import session from "express-session";

const documentroute = express.Router();

const { SESSION_SECRET } = process.env;

documentroute.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

documentroute.use(bodyParser.json());
documentroute.use(bodyParser.urlencoded({ extended: true }));

export default documentroute;
