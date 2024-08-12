import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./App.css";
import RCard from "./components/Card";
import { Grid, Button } from "@mui/material";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

function App() {
  const [count, setCount] = useState(0);

  const [places, setPlaces] = useState([]);

  const [city, setCity] = useState("");

  const [loading, setLoading] = useState(false);

  const fetchLocation = async () => {
    const options = {
      method: "GET",
      url: "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation",
      params: { query: city },
      headers: {
        "x-rapidapi-key": "ff9d1926demsh46dc15c466acf04p109a87jsn5b885ed984a7",
        "x-rapidapi-host": "tripadvisor16.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      return response.data.data[0].locationId;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRestaurant = async () => {
    setLoading(true);
    const locationId = await fetchLocation();

    const options = {
      method: "GET",
      url: "https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants",
      params: {
        locationId: locationId,
      },
      headers: {
        "x-rapidapi-key": "ff9d1926demsh46dc15c466acf04p109a87jsn5b885ed984a7",
        "x-rapidapi-host": "tripadvisor16.p.rapidapi.com",
      },
    };

    console.log(options);

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setPlaces(response.data.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="center" alignItems="flex-end">
        <TextField
          id="find-restaurant"
          label="Find Restaurant"
          variant="standard"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <Button variant="contained" size="small" onClick={fetchRestaurant}>
          Search
        </Button>
      </Box>

      {loading === true ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          marginTop="90px"
        >
          {places.map((place) => (
            <Grid
              item
              xs={4}
              display="flex"
              justifyContent="center"
              gap={20}
              marginBottom="20px"
            >
              <RCard place={place} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default App;
