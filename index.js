const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit'); // New import for rate limiting

const app = express();

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: { error: 'Too many requests, please try again later.' }
});

// Apply rate limiter to all requests
app.use(limiter);

// Body parser middleware
app.use(bodyParser.json());
app.use(express.json());

// Enhanced CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Replace with your frontend URL in production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204
}));

// Basic route
app.get('/', (req, res) => {
    return res.status(200).send({message: "API is running", status: true});
});

// Routes
const authRouters = require("./routes/authRoute");
app.use('/auth', authRouters);

const userRouters = require("./routes/userRoute");
app.use('/api/users', userRouters);

const productRouter = require("./routes/productRoute");
app.use('/api/products', productRouter);

const adminProductRouter = require("./routes/adminProductsRoute");
app.use('/api/admin/products', adminProductRouter);

const cartRouter = require("./routes/cartRoute");
app.use('/api/cart', cartRouter);

const cartItemRouter = require("./routes/cartItemsRoute");
app.use('/api/cart_items', cartItemRouter);

const orderRouter = require("./routes/orderRoute");
app.use('/api/orders', orderRouter);

const adminOrderRouter = require("./routes/adminOrderRoute");
app.use('/api/admin/orders', adminOrderRouter);

const reviewRouter = require("./routes/reviewRoute");
app.use('/api/reviews', reviewRouter);

const ratingRouter = require("./routes/ratingRoute");
app.use('/api/ratings', ratingRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send({ error: 'Route not found' });
});

module.exports = app;