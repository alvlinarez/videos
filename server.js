const express = require('express');
const compression = require('compression');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();

app.use(cors());
app.use(compression());
app.use(cookieParser());
// serving static build file that it will be built with npm run build
app.use(express.static(path.join(__dirname, 'dist')));

require('./server/strategies/google');
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile', 'openid'] })
);

// app.get('/auth/google', (req, res) => {
//   return res.status(200).json({
//     fap: 12
//   });
// });

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    if (!req.user) {
      return res.status(401).json({
        error: `Error signing in with Google`
      });
    }
    const { token, ...user } = req.user;
    res.cookie('token', token, {
      httpOnly: true,
      secure: false
    });
    return res.redirect('/auth/oauth');
    //return res.status(200).json({ token, user });
  }
);

app.get('/auth/userinfo', (req, res) => {
  const token = req.cookies.token;
  console.log(token);
  return res.status(200).json({ a: '/auth/oauth' });
  //return res.status(200).json({ token, user });
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
