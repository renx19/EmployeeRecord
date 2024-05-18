const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const routes = require('./routes/routes');
const EmployeRoutes = require('./routes/EmployeeRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Health check route


// Connect to the first MongoDB database
const userDataBaseConnection = mongoose.createConnection(process.env.MONGODB_URI_USERDATABASE, {
    useNewUrlParser: true,
    dbName: 'users'
});
userDataBaseConnection.on('error', err => {
    console.error('UserDataBase connection error:', err);
});
userDataBaseConnection.once('open', () => {
    console.log('Connected to UserDataBase');
});

// Connect to the second MongoDB database
mongoose.connect(process.env.MONGODB_URI_EMPLOYEEDATABASE, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to EmployeeMongoDB');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is healthy' });
});
app.use('/', routes);
app.use('/', EmployeRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);

    // Keep-alive function
    const https = require('https');

    const keepAlive = () => {
        const url = 'https://employeerecordcrud.onrender.com/health'; // Replace with your Render app URL

        https.get(url, (res) => {
            console.log('Keep-alive ping successful', res.statusCode);
        }).on('error', (e) => {
            console.error('Keep-alive ping failed', e);
        });
    };

    // Set up keep-alive interval (every 5 minutes)
    setInterval(keepAlive, 5 * 60 * 1000);
});