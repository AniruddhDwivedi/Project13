"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var port = process.env.PORT || 9000;
// Serve static files from the parent directory of 'dist'
app.use(express_1.default.static('../'));
// Define an API endpoint to handle GET requests
app.get("/api/data", function (req, res) {
    // Mock data for demonstration purposes
    var data = {
        message: "This is data from the server!"
    };
    // Respond with JSON data
    res.json(data);
});
app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port, "/"));
});
