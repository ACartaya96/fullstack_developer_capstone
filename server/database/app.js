/*jshint esversion: 8 */
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3030;

app.use(cors());
app.use(require('body-parser').urlencoded({ extended: false }));


const reviews_data = JSON.parse(fs.readFileSync("./data/reviews.json", 'utf8'));
const dealerships_data = JSON.parse(fs.readFileSync("./data/dealerships.json", 'utf8'));

const Reviews = require('./review');
const Dealerships = require('./dealership');

const dbUri = process.env.MY_DATABASE_URL || process.env.MONGO_URI;
if (!dbUri) {
  console.error('Missing MongoDB URI. Set MY_DATABASE_URL or MONGO_URI in environment.');
  process.exit(1);
}

(async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(dbUri, { dbName: 'dealershipsDB' });
    console.log('MongoDB connected');

    try {
      await Reviews.deleteMany({});
      await Reviews.insertMany(reviews_data.reviews);
      console.log('Reviews seeded');
    } catch (err) {
      console.error('Error seeding reviews:', err);
    }

    try {
      await Dealerships.deleteMany({});
      await Dealerships.insertMany(dealerships_data.dealerships);
      console.log('Dealerships seeded');
    } catch (err) {
      console.error('Error seeding dealerships:', err);
    }

  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
})();


// Express route to home
app.get('/', async (req, res) => {
  res.send("Welcome to the Mongoose API");
});

// Express route to fetch all reviews
app.get('/fetchReviews', async (req, res) => {
  try {
    const documents = await Reviews.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch reviews by a particular dealer
app.get('/fetchReviews/dealer/:id', async (req, res) => {
  try {
    const documents = await Reviews.find({ dealership: req.params.id });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching documents' });
  }
});

// Express route to fetch all dealerships
app.get('/fetchDealers', async (req, res) => {
  //Write your code here
  try {
    const documents = await Dealerships.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealers' });
  }
});

// Express route to fetch Dealers by a particular state
app.get('/fetchDealers/:state', async (req, res) => {
  //Write your code here
  try {
    const documents = await Dealerships.find({ state: req.params.state });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealers' });
  }
});

// Express route to fetch dealer by a particular id
app.get('/fetchDealer/:id', async (req, res) => {
  //Write your code here
  try {
    const documents = await Dealerships.find({ id: req.params.id });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching dealer' });
  }
});

//Express route to insert review
app.post('/insert_review', express.raw({ type: '*/*' }), async (req, res) => {
  data = JSON.parse(req.body);
  const documents = await Reviews.find().sort({ id: -1 });
  let new_id = documents[0].id + 1;

  const review = new Reviews({
    "id": new_id,
    "name": data.name,
    "dealership": data.dealership,
    "review": data.review,
    "purchase": data.purchase,
    "purchase_date": data.purchase_date,
    "car_make": data.car_make,
    "car_model": data.car_model,
    "car_year": data.car_year,
  });

  try {
    const savedReview = await review.save();
    res.json(savedReview);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error inserting review' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
