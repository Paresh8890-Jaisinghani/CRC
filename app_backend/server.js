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

// Add this GET route to fetch participant details by ID
app.get('/getHealthData/:id', async (req, res) => {
    const { id } = req.params; // Participant ID from URL
  
    try {
      // Find participant by ID
      const participant = await Data.findById(id);
  
      if (!participant) {
        return res.status(404).send('Participant not found');
      }
  
      // Send back the health-related data of the participant
      const healthData = {
        heartRate: participant.healthAndLifestyle.heartRate || "",
        bloodPressure: participant.healthAndLifestyle.bloodPressure || "",
        respiratoryRate: participant.healthAndLifestyle.respiratoryRate || "",
        bodyTemperature: participant.healthAndLifestyle.bodyTemperature || "",
        oxygenSaturation: participant.healthAndLifestyle.oxygenSaturation || "",
        weight: participant.healthAndLifestyle.weight || "",
        height: participant.healthAndLifestyle.height || "",
        ecg: participant.healthAndLifestyle.ecg || "",
        bloodGlucose: participant.healthAndLifestyle.bloodGlucose || "",
        urineOutput: participant.healthAndLifestyle.urineOutput || "",
        smoking: participant.healthAndLifestyle.smoking || "",
        alcoholUse: participant.healthAndLifestyle.alcoholUse || "",
        drugUse: participant.healthAndLifestyle.drugUse || "",
        physicalActivityLevel: participant.healthAndLifestyle.physicalActivityLevel || "",
      };
  
      res.status(200).json(healthData);
    } catch (error) {
      console.error('Error fetching participant health data:', error);
      res.status(500).send('Server Error');
    }
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
