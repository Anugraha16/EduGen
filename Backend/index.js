const express=require('express');
const connectDB = require('./lib/db'); 
const cors=require('cors');
const app = express();
const passport = require('passport');
const signupRouter = require('./routes/signup');
const signinRouter=require('./routes/signin');
const authRoutes = require('./routes/auth');
const sessionConfig = require('./config/session');
const passportConfig = require('./config/passport');

require('dotenv').config();

connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the backend server');
});

try {
  sessionConfig(app);
  passportConfig(passport);
} catch (err) {
  console.error('Error in session or passport configuration:', err.message);
  process.exit(1);
}

app.use('/auth', authRoutes);
app.use('/signup', signupRouter);
app.use('/signin', signinRouter);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});