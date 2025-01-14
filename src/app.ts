import express from 'express';
import { connectToMongoDB } from './database/mongodb';

const app = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
    try {

        // Connect to MongoDB
        await connectToMongoDB();
        console.log('Database connection established successfully');

        // Middleware
        app.use(express.json());

        // Define routes
        app.get('/', (req, res) => {
            res.send('Welcome to the API!');
        });

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
        process.exit(1); 
    }
}

startServer();
