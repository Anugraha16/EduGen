const express=require('express');
const connectDB = require('./lib/db'); 
const cors=require('cors');
const app = express();
const passport = require('passport');
const signupRouter = require('./routes/signup');
const authRoutes = require('./routes/auth');
const sessionConfig = require('./config/session');
const passportConfig = require('./config/passport');



connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the backend server');
});

sessionConfig(app);

app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

app.use('/auth', authRoutes);
app.use('/signup', signupRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});