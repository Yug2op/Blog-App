import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // Import cookie-parser
import connectDB from './db/index.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({ 
    origin: [
        'http://localhost:5173',
        'https://blog-app-lyart-mu.vercel.app'
    ], // Allow both local and deployed frontend origins
    credentials: true // Allow cookies to be sent
}));
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     if (req.method === 'OPTIONS') {
//         return res.sendStatus(200); // Handle preflight requests
//     }
//     next();
// });

app.use(cookieParser()); // Use cookie-parser middleware

// app.use((req, res, next) => {
//     console.log("Incoming Request Content-Type:", req.headers['content-type']);
//     if (req.method === 'POST' || req.method === 'PUT') {
//         let data = '';
//         req.on('data', chunk => {
//             data += chunk;
//         });
//         req.on('end', () => {
//             console.log("Incoming Request Raw Body:", data);
//             next();
//         });
//     } else {
//         next();
//     }
// });

app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
