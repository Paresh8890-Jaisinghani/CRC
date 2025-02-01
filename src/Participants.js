import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import './participants.css';

const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/data");
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const data = await response.json();
        setParticipants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error}</h1>;
  }

  return (
    <div>
      <h1>Existing Participants</h1>
      <div className="participant-list">
        {participants.map((participant, index) => (
          <div key={index} className="participant-box">
            <h3>{participant.personalInformation.fullName}</h3>
            <p><strong>Date of Birth:</strong> {participant.personalInformation.dateOfBirth}</p>
            <p><strong>Age:</strong> {participant.personalInformation.age}</p>
            <p><strong>Gender:</strong> {participant.personalInformation.gender}</p>
            <p><strong>Marital Status:</strong> {participant.personalInformation.maritalStatus}</p>
            
            <h4>Contact Information</h4>
            <p><strong>Address:</strong> {participant.contactInformation.address.street}, {participant.contactInformation.address.city}, {participant.contactInformation.address.state} {participant.contactInformation.address.postalCode}, {participant.contactInformation.address.country}</p>
            <p><strong>Phone Number:</strong> {participant.contactInformation.phoneNumber}</p>
            <p><strong>Email:</strong> {participant.contactInformation.email}</p>
            
            <h4>Socioeconomic Data</h4>
            <p><strong>Employment Status:</strong> {participant.socioeconomicData.employmentStatus}</p>
            <p><strong>Occupation:</strong> {participant.socioeconomicData.occupation}</p>
            
            <h4>Cultural & Ethnic Background</h4>
            <p><strong>Education Level:</strong> {participant.culturalEthnicBackground.educationLevel}</p>
            <p><strong>Race/Ethnicity:</strong> {participant.culturalEthnicBackground.raceEthnicity}</p>
            <p><strong>Nationality:</strong> {participant.culturalEthnicBackground.nationality}</p>
            <p><strong>Primary Languages:</strong> {participant.culturalEthnicBackground.primaryLanguages.join(", ")}</p>
            
            <h4>Health & Lifestyle</h4>
            <p><strong>Health Status:</strong> {participant.healthAndLifestyle.healthStatus.chronicConditions.join(", ")}</p>
            <p><strong>Disabilities:</strong> {participant.healthAndLifestyle.healthStatus.disabilities.length > 0 ? participant.healthAndLifestyle.healthStatus.disabilities.join(", ") : "None"}</p>
            <p><strong>Smoking:</strong> {participant.healthAndLifestyle.smoking}</p>
            <p><strong>Alcohol Use:</strong> {participant.healthAndLifestyle.alcoholUse}</p>
            <p><strong>Drug Use:</strong> {participant.healthAndLifestyle.drugUse}</p>
            <p><strong>Physical Activity Level:</strong> {participant.healthAndLifestyle.physicalActivityLevel}</p>
            
            <Link to={`/health_data/${participant._id}`}>
              <button>Health Form</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Participants;
