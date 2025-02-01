import React from "react";
import { Routes, Route } from "react-router-dom";
import Participants from "./Participants";
import HealthForm from "./health.js";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Participants />} />
      <Route path="/health_data/:participantId" element={<HealthForm />} />
    </Routes>
  );
};

export default App;
