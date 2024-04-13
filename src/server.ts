// Import necessary modules
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';

// Initialize Express app
const app = express();
const port = process.env.PORT || 9000;

// Middleware to parse JSON body
app.use(bodyParser.json());

// Define Mongoose schema for user data
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Create User model based on the schema
const UserModel = mongoose.model('User', userSchema);

// MongoDB connection URL

mongoose.connect("mongodb+srv://admin:changeme@cluster0.yylksxb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Example API endpoint to handle GET requests
app.get("/api/data", async (req, res) => {
  try {
    // Retrieve data from MongoDB
    const data = await UserModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to handle fetching all users
app.get('/users', async (req, res) => {
  try {
    // Fetch all users from MongoDB
    const users = await UserModel.find();

    // Respond with the list of users
    res.status(200).json(users);
  } catch (error) {
    // Handle errors
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to handle user registration
app.post('/auth/register', async (req, res) => {
  try {
    // Extract user data from request body
    const { name, email, password } = req.body;

    // Create a new user document
    const newUser = new UserModel({ name, email, password });

    // Save the new user to MongoDB
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
