import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container, Typography, Card, CardContent } from '@mui/material';

const API_BASE_URL = 'http://104.211.219.98';

const HomePage = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    fetchTrainSchedules();
  }, []);

  const fetchTrainSchedules = async () => {
    try {
      const token = await authenticate(); // Authenticate to obtain the access token
      const response = await fetch(`${API_BASE_URL}/train-schedules`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTrains(data);
    } catch (error) {
      console.error('Error fetching train schedules:', error);
    }
  };

  const authenticate = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/train/register`, {
        method: 'POST',
        body: JSON.stringify({
          companyName: 'Train Central',
          ownerName: 'Ram',
          rollNo: '20481A5463',
          ownerEmail: 'ram@abc.edu',
          accessCode: 'FKDLjg',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Error authenticating:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        All Train Schedules
      </Typography>
      {trains.map((train) => (
        <Card key={train.id} sx={{ marginBottom: '1rem' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Train Number: {train.number}
            </Typography>
            <Typography variant="body1">Departure Time: {train.departureTime}</Typography>
            <Typography variant="body1">Seat Availability: {train.seatAvailability}</Typography>
            <Typography variant="body1">Price: {train.price}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

const TrainDetailsPage = () => {
  const [train, setTrain] = useState(null);

  useEffect(() => {
    fetchTrainDetails();
  }, []);

  const fetchTrainDetails = async () => {
    try {
      const token = await authenticate(); // Authenticate to obtain the access token
      const response = await fetch(`${API_BASE_URL}/train-details/123`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTrain(data);
    } catch (error) {
      console.error('Error fetching train details:', error);
    }
  };
  if (!train) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Train Details
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Train Number: {train.number}
          </Typography>
          <Typography variant="body1">Departure Time: {train.departureTime}</Typography>
          <Typography variant="body1">Seat Availability: {train.seatAvailability}</Typography>
          <Typography variant="body1">Price: {train.price}</Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/train/123">Train Details</Link>
          </li>
        </ul>
      </nav>

      <Route exact path="/" component={HomePage} />
      <Route path="/train/:id" component={TrainDetailsPage} />
    </Router>
  );
};

export default App;
