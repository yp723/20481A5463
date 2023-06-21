import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://104.211.219.98';

const App = () => {
  const [accessToken, setAccessToken] = useState('');
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const registerCompany = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/train/register`, {
          companyName: 'Pooja63',
          ownerName: 'Yakkala Pooja',
          rollNo: '20481A5463',
          ownerEmail: 'ypooja72003@gmail.com',
          accessCode: 'dWGzNM',
        });
        const clientId = response.data.clientID;
        const clientSecret = response.data.clientSecret;
        authenticateCompany(clientId, clientSecret);
      } catch (error) {
        console.error('Error registering company:', error);
      }
    };

    registerCompany();
  }, []);

  const authenticateCompany = async (clientId, clientSecret) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/train/auth`, {
        companyName: 'Pooja63',
        clientID: clientId,
        ownerName: 'Yakkala Pooja',
        ownerEmail: 'ypooja72003@gmail.com',
        rollno: '20481A5463',
        clientSecret: clientSecret,
      });
      const accessToken = response.data.access_token;
      setAccessToken(accessToken);
    } catch (error) {
      console.error('Error authenticating company:', error);
    }
  };

  useEffect(() => {
    const fetchTrainSchedules = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/train/schedule`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTrains(response.data);
      } catch (error) {
        console.error('Error fetching train schedules:', error);
      }
    };

    if (accessToken) {
      fetchTrainSchedules();
    }
  }, [accessToken]);

  return (
    <div>
      <h1>Train Schedule</h1>
      {trains.length > 0 ? (
        <ul>
          {trains.map((train) => (
            <li key={train.trainNumber}>
              <p>Name: {train.trainName}</p>
              <p>Seats Available:</p>
              <ul>
                <li>Sleeper: {train.seatsAvailable.sleeper}</li>
                <li>AC: {train.seatsAvailable.AC}</li>
              </ul>
              <p>Price:</p>
              <ul>
                <li>Sleeper: {train.price.sleeper}</li>
                <li>AC: {train.price.AC}</li>
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No train schedules available.</p>
      )}
    </div>
  );
};

export default App;
