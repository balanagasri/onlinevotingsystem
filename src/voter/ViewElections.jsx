import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For redirecting to VoteNow
import config from '../config';
import './voter.css'; // Use voter.css for styling

export default function ViewElections() {
  const [elections, setElections] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    axios.get(`${config.url}/voter/viewallelections`)
      .then(response => {
        setElections(response.data);
      })
      .catch(() => {
        setError('Failed to fetch elections.');
      });
  }, []);

  const getStatus = (start, end) => {
    const today = new Date();
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (today < startDate) return "Upcoming";
    if (today >= startDate && today <= endDate) return "Ongoing";
    return "Completed";
  };

  const handleVote = (electionId) => {
    navigate(`/votenow/${electionId}`); // Redirect to VoteNow page with electionId
  };

  return (
    <div className="voter-home-container">
      <div className="elections-card">
        <h2>Available Elections</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {elections.length === 0 ? (
          <p>No elections found.</p>
        ) : (
          <div className="election-list">
            {elections.map(election => (
              <div className="election-item" key={election.id}>
                <h3>{election.name}</h3>
                <p><strong>Type:</strong> {election.electionType}</p>
                <p><strong>City:</strong> {election.city}</p>
                <p><strong>Station:</strong> {election.station}</p>
                <p><strong>Start Date:</strong> {election.startDate}</p>
                <p><strong>End Date:</strong> {election.endDate}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span
                    style={{
                      color:
                        getStatus(election.startDate, election.endDate) === 'Ongoing'
                          ? 'green'
                          : getStatus(election.startDate, election.endDate) === 'Upcoming'
                          ? 'orange'
                          : 'red',
                    }}
                  >
                    {getStatus(election.startDate, election.endDate)}
                  </span>
                </p>
                <p><strong>Description:</strong> {election.description}</p>
                <button
                  className="vote-button"
                  onClick={() => handleVote(election.id)}
                  disabled={getStatus(election.startDate, election.endDate) !== 'Ongoing'}
                >
                  Vote
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}