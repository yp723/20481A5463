import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container, Typography, Card, CardContent } from '@mui/material';

const HomePage = () => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    fetchTrainSchedules();
  }, []);

  const fetchTrainSchedules = async () => {
    // Fetch train schedules from John Doe Railway API
    const response = await fetch('http://your-api-url/train-schedules');
    const data = await response.json();
    setTrains(data);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        All Trains Schedule
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
    // Fetch train details from John Doe Railway API based on train ID
    const response = await fetch('http://your-api-url/train-details/123');
    const data = await response.json();
    setTrain(data);
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
