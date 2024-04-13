"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
// Initialize Express app
const app = (0, express_1.default)();
const port = process.env.PORT || 9000;
// Middleware to parse JSON body
app.use(body_parser_1.default.json());
// Define Mongoose schema for user data
const userSchema = new mongoose_1.default.Schema({
    name: String,
    email: String,
    password: String,
});
// Create User model based on the schema
const UserModel = mongoose_1.default.model('User', userSchema);
// MongoDB connection URL
mongoose_1.default.connect("mongodb+srv://admin:changeme@cluster0.yylksxb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../index.html'));
});
// Example API endpoint to handle GET requests
app.get("/api/data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Retrieve data from MongoDB
        const data = yield UserModel.find();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
// Route to handle fetching all users
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Fetch all users from MongoDB
        const users = yield UserModel.find();
        // Respond with the list of users
        res.status(200).json(users);
    }
    catch (error) {
        // Handle errors
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Route to handle user registration
app.post('/auth/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract user data from request body
        const { name, email, password } = req.body;
        // Create a new user document
        const newUser = new UserModel({ name, email, password });
        // Save the new user to MongoDB
        yield newUser.save();
        // Respond with success message
        res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
        // Handle errors
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Start the Express server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}/`);
});
//# sourceMappingURL=server.js.map