import React, { useState, useEffect } from 'react';
import './Voter.css'; // Using shared CSS styles

const sampleBallots = [
  {
    electionName: "Presidential Election 2025",
    candidates: ["Alice Johnson", "Bob Smith", "Carol Lee"]
  },
  {
    electionName: "City Council Election",
    candidates: ["David Kim", "Eva Brown"]
  }
];

export default function VoteNow() {
  const [ballots, setBallots] = useState([]);

  useEffect(() => {
    // Replace with real fetch logic if needed
    setBallots(sampleBallots);
  }, []);

  return (
    <div className="voter-home-container">
      <div className="elections-card">
        <h2>Vote Now</h2>
        {ballots.length === 0 ? (
          <p>No ballots available at this time.</p>
        ) : (
          ballots.map((ballot, index) => (
            <div key={index} className="election-item">
              <h3>{ballot.electionName}</h3>
              <p>Select your candidate:</p>
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {ballot.candidates.map((candidate, i) => (
                  <li key={i} style={{ marginBottom: '10px' }}>
                    <label>
                      <input type="radio" name={`vote-${index}`} /> {candidate}
                    </label>
                  </li>
                ))}
              </ul>
              <button className="vote-btn">Submit Vote</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
