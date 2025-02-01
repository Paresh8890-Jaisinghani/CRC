const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const mongoURI = "mongodb+srv://ce21btech11031:oCoQU8mcUHnYBCkZ@cluster0.wm7ny.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

const dataSchema = new mongoose.Schema({
  personalInformation: {
    fullName: String,
    dateOfBirth: Date,
    age: Number,
    gender: String,
    maritalStatus: String
  },
  contactInformation: {
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String
    },
    phoneNumber: String,
    email: String
  },
  socioeconomicData: {
    employmentStatus: String,
    occupation: String
  },
  culturalEthnicBackground: {
    educationLevel: String,
    raceEthnicity: String,
    nationality: String,
    primaryLanguages: [String]
  },
  healthAndLifestyle: {
    healthStatus: {
      chronicConditions: [String],
      disabilities: [String]
    },
    smoking: String,
    alcoholUse: String,
    drugUse: String,
    physicalActivityLevel: String
  }
});

const Data = mongoose.model('Data', dataSchema);

app.get('/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
