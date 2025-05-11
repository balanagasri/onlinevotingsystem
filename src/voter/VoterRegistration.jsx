import { useState } from 'react';
import axios from 'axios';
import config from '../config';

export default function VoterRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    email: '',
    username: '',
    password: '',
    mobileno: '',
    votingArea: '',
    voterID: '',
    aadharID: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/voter/registration`, formData);
      if (response.status === 200) {
        setMessage(response.data);
        setError('');
        setFormData({
          name: '',
          gender: '',
          dob: '',
          email: '',
          username: '',
          password: '',
          mobileno: '',
          votingArea: '',
          voterID: '',
          aadharID: ''
        });
      }
    } catch (error) {
      setMessage('');
      setError(error.response ? error.response.data : 'An unexpected error occurred.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #fff3e0, #e8f5e9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '50px 10px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '550px',
        backgroundColor: '#fff',
        padding: '35px 30px',
        borderRadius: '12px',
        boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
        border: '1px solid #f0f0f0'
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '25px',
          fontSize: '1.8rem',
          color: '#2c3e50'
        }}>
          Voter Registration
        </h2>

        {message && <p style={{ color: 'green', textAlign: 'center', fontWeight: 'bold' }}>{message}</p>}
        {error && <p style={{ color: 'red', textAlign: 'center', fontWeight: 'bold' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          {[
            ['name', 'Full Name', 'text'],
            ['gender', 'Gender', 'select'],
            ['dob', 'Date of Birth', 'date'],
            ['email', 'Email', 'email'],
            ['username', 'Username', 'text'],
            ['password', 'Password', 'password'],
            ['mobileno', 'Mobile No', 'tel'],
            ['votingArea', 'Voting Area', 'text'],
            ['voterID', 'Voter ID', 'text'],
            ['aadharID', 'Aadhar ID', 'text']
          ].map(([id, label, type]) => (
            <div key={id} style={{ marginBottom: '15px' }}>
              <label htmlFor={id} style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', color: '#2c3e50' }}>
                {label}
              </label>
              {type === 'select' ? (
                <select
                  id={id}
                  value={formData[id]}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    fontSize: '1rem'
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                <input
                  type={type}
                  id={id}
                  value={formData[id]}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    fontSize: '1rem'
                  }}
                />
              )}
            </div>
          ))}

          <button type="submit" style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#2e7d32',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background 0.3s ease'
          }}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
