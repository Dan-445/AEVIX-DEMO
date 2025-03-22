require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Route imports
const authRoutes = require('./routes/auth.routes');
const careerRoutes = require('./routes/career.routes');
const contactRoutes = require('./routes/contact.routes');
const blogRoutes = require('./routes/blog.routes');
const newsletterRoutes = require('./routes/newsletter.routes');
const testRoutes = require('./routes/test.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Comment out MongoDB connection temporarily
/*
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));
*/

// Add temporary data storage
const tempDB = {
    users: [],
    careers: [],
    blogs: []
};

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/test', (req, res) => {
    res.json({ message: 'API is working without database!' });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
}

const errorHandler = require('./middleware/error');

// Add this after your routes
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 