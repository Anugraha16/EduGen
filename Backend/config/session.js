const session = require("express-session");

module.exports = (app) => {
  app.use(
    session({
      secret: "your_session_secret",
      resave: false,
      saveUninitialized: true,
    })
  );
};
