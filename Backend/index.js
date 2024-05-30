const express=require('express');
const connectDB = require('./lib/db'); 
const cors=require('cors');
const signupRouter = require('./api/signup');
const app = express();


connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the backend server');
});

app.use('/signup', signupRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});