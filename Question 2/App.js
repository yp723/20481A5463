import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
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
        const response = await axios.get(`${API_BASE_URL}/train/trains`, {
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
      <Typography variant="h4" gutterBottom>
        Train Schedule
      </Typography>
      {trains.length > 0 ? (
        <List>
          {trains.map((train) => (
            <ListItem key={train.trainNumber}>
              <ListItemText primary={train.trainName} />
              <ListItemText
                primary="Seats Available"
                secondary={
                  <List>
                    <ListItem>
                      <ListItemText primary={`Sleeper: ${train.seatsAvailable.sleeper}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`AC: ${train.seatsAvailable.AC}`} />
                    </ListItem>
                  </List>
                }
              />
              <ListItemText
                primary="Price"
                secondary={
                  <List>
                    <ListItem>
                      <ListItemText primary={`Sleeper: ${train.price.sleeper}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`AC: ${train.price.AC}`} />
                    </ListItem>
                  </List>
                }
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No train schedules available.</Typography>
      )}
    </div>
  );
};

export default App;
