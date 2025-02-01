import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./health.css";

const HealthForm = () => {
    const { id } = useParams(); // Get participant ID from URL
    const [formData, setFormData] = useState({
        heartRate: "",
        bloodPressure: "",
        respiratoryRate: "",
        bodyTemperature: "",
        oxygenSaturation: "",
        weight: "",
        height: "",
        ecg: "",
        bloodGlucose: "",
        urineOutput: "",
        smoking: "",
        alcoholUse: "",
        drugUse: "",
        physicalActivityLevel: "",
    });

    // Fetch participant's health data when the component mounts
    useEffect(() => {
        const fetchHealthData = async () => {
            try {
                const response = await fetch(`/getHealthData/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setFormData(data); // Set the form data with fetched data
                } else {
                    console.error("Error fetching health data");
                }
            } catch (error) {
                console.error("Error fetching health data:", error);
            }
        };

        fetchHealthData();
    }, [id]); // Run this effect when the id changes

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const healthData = {
            healthStatus: {
                heartRate: formData.heartRate,
                bloodPressure: formData.bloodPressure,
                respiratoryRate: formData.respiratoryRate,
                bodyTemperature: formData.bodyTemperature,
                oxygenSaturation: formData.oxygenSaturation,
                weight: formData.weight,
                height: formData.height,
                ecg: formData.ecg,
                bloodGlucose: formData.bloodGlucose,
                urineOutput: formData.urineOutput,
            },
            smoking: formData.smoking,
            alcoholUse: formData.alcoholUse,
            drugUse: formData.drugUse,
            physicalActivityLevel: formData.physicalActivityLevel,
        };

        try {
            const response = await fetch(`/updateHealthData/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(healthData),
            });

            if (response.ok) {
                alert("Health data submitted successfully!");
            } else {
                const errorData = await response.json();
                console.error("Error response:", errorData);
                alert(`Failed to submit health data. Server returned: ${response.status} - ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error submitting health data:", error);
            alert(`Error submitting health data: ${error.message || "Unknown error"}`);
        }
    };



    return (
        <div className="health-form-container">
            <h1>Health Data Form</h1>
            <h2>Participant ID: {id}</h2>
            <form onSubmit={handleSubmit}>
                <label>Heart Rate (bpm):</label>
                <input
                    type="number"
                    name="heartRate"
                    value={formData.heartRate}
                    onChange={handleChange}
                    required
                />

                <label>Blood Pressure (mmHg) (e.g., 120/80):</label>
                <input
                    type="text"
                    name="bloodPressure"
                    value={formData.bloodPressure}
                    onChange={handleChange}
                    required
                />

                <label>Respiratory Rate (breaths/min):</label>
                <input
                    type="number"
                    name="respiratoryRate"
                    value={formData.respiratoryRate}
                    onChange={handleChange}
                    required
                />

                <label>Body Temperature (°F):</label>
                <input
                    type="number"
                    name="bodyTemperature"
                    value={formData.bodyTemperature}
                    onChange={handleChange}
                    required
                />

                <label>Oxygen Saturation (%):</label>
                <input
                    type="number"
                    name="oxygenSaturation"
                    value={formData.oxygenSaturation}
                    onChange={handleChange}
                    required
                />

                <label>Weight (kg):</label>
                <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                />

                <label>Height (cm):</label>
                <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    required
                />

                <label>Electrocardiogram (ECG/EKG) Result:</label>
                <input
                    type="text"
                    name="ecg"
                    value={formData.ecg}
                    onChange={handleChange}
                    required
                />

                <label>Blood Glucose Levels (mg/dL):</label>
                <input
                    type="number"
                    name="bloodGlucose"
                    value={formData.bloodGlucose}
                    onChange={handleChange}
                    required
                />

                <label>Urine Output (mL/day):</label>
                <input
                    type="number"
                    name="urineOutput"
                    value={formData.urineOutput}
                    onChange={handleChange}
                    required
                />

                {/* Add extra fields */}
                <label>Smoking:</label>
                <input
                    type="text"
                    name="smoking"
                    value={formData.smoking}
                    onChange={handleChange}
                    required
                />

                <label>Alcohol Use:</label>
                <input
                    type="text"
                    name="alcoholUse"
                    value={formData.alcoholUse}
                    onChange={handleChange}
                    required
                />

                <label>Drug Use:</label>
                <input
                    type="text"
                    name="drugUse"
                    value={formData.drugUse}
                    onChange={handleChange}
                    required
                />

                <label>Physical Activity Level:</label>
                <input
                    type="text"
                    name="physicalActivityLevel"
                    value={formData.physicalActivityLevel}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default HealthForm;
