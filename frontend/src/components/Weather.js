import { useState, useEffect } from 'react';
import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaBolt } from 'react-icons/fa';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';

const Weather = () => {
  const theme = useTheme();
  const [weatherData, setWeatherData] = useState(null);
  const city = 'Montreal';

  // Fetch weather data using the Fetch API
  const fetchWeather = async () => {
    try {
      const response = await fetch(`/weather?city=${city}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  // Map weather conditions to icons using react-icons
  const renderWeatherIcon = (main) => {
    switch (main) {
      case 'Clear':
        return <FaSun size={50} color={theme.palette.primary.main} />;
      case 'Clouds':
        return <FaCloud size={50} color={theme.palette.primary.main} />;
      case 'Rain':
        return <FaCloudRain size={50} color={theme.palette.primary.main} />;
      case 'Snow':
        return <FaSnowflake size={50} color={theme.palette.primary.main} />;
      case 'Thunderstorm':
        return <FaBolt size={50} color={theme.palette.primary.main} />;
      default:
        return <FaSun size={50} color={theme.palette.primary.main} />;
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh" // Use full viewport height
      padding={2} // Add padding for responsiveness
    >
      <Box
        maxWidth={{ sm: 720, md: 1236 }}
        width={1}
        marginBottom={4} // Space below the weather box
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box marginBottom={4}>
          <Typography
            variant="h3"
            align="center"
            fontWeight={700}
            marginTop={2}
            gutterBottom
          >
            Weather Information
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color={theme.palette.text.secondary}
            marginTop={4}
            marginBottom={6}
          >
            Current weather conditions in your city
          </Typography>
        </Box>

        {weatherData && (
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} md={6}>
              <Box
                component={Card}
                display="flex"
                flexDirection="column"
                alignItems="center"
                boxShadow={0}
                variant="outlined"
                borderRadius={2}
                data-aos="fade-up"
              >
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'all .2s ease-in-out',
                    '&:hover': {
                      transform: `translateY(-${theme.spacing(1)})`,
                    },
                  }}
                >
                  <Box marginBottom={2}>
                    {renderWeatherIcon(weatherData.weather[0].main)}
                  </Box>
                  <Typography align="center" color={theme.palette.text.primary} fontWeight="bold" variant="h5">
                    {weatherData.name}
                  </Typography>
                  <Typography align="center" color={theme.palette.text.secondary} variant="body1">
                    {weatherData.weather[0].description}
                  </Typography>
                  <Typography align="center" color={theme.palette.text.primary} variant="h6" marginTop={2}>
                    {Math.round(weatherData.main.temp)}°C
                  </Typography>
                </CardContent>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
      <Divider />
    </Box>
  );
};

export default Weather;
