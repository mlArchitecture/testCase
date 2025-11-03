import express from 'express';
import mongoConnection from './db/connection.js';
import User from './models/users.js';

const app = express();
const PORT = process.env.PORT || 3000;

// middleware to parse JSON bodies
app.use(express.json());

// connect to MongoDB and start server
try {
  mongoConnection().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });
} catch (error) {
  console.error('Failed to connect to the database:', error);
  process.exit(1);
}

// simple route
app.get('/', (req, res) => {
  res.send('Hello,');
});

// get all users
app.get('/users', async (req, res) => {
  try {
    const data = await User.find({});
    res.json(data);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// add a new user
app.post('/users', async (req, res) => {
  try {
    const { name, rollno } = req.body;
    const newUser = new User({ name, rollno });
    await newUser.save();
    res.status(201).json({ message: 'User added successfully', newUser });
  } catch (error) {
    console.error('Error inserting user data:', error);
    res.status(500).json({ message: 'Error inserting user data' });
  }
});
