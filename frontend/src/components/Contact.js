import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';
import LocationIcon from '@mui/icons-material/LocationOn';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Contact = () => {
  const theme = useTheme();

  const [contact, setContact] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  const fetchContact = () => {
    axios
      .get('/contact', {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((response) => {
        setContact(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchContact();
  }, []);

  const Map = useMemo(
    () =>
      dynamic(() => import('./Map'), {
        loading: () => <p>A map is loading...</p>,
        ssr: false,
      }),
    []
  );

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.message) newErrors.message = 'Message is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Submit the form data to your backend or log it
      console.log('Form submitted:', formData);
      setSnackMessage('Your message has been sent successfully!');
      setSnackOpen(true);
      // Reset the form
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    }
  };

  return (
    <div id='contact'>
      <Box position='relative' marginBottom={15}>
        <Box
          maxWidth={{ sm: 720, md: 1236 }}
          width={1}
          margin='0 auto'
          paddingX={2}
          paddingY={{ xs: 4, sm: 6, md: 8 }}
          paddingBottom={10}
        >
          <Box marginBottom={4}>
            <Typography
              variant='h3'
              align='center'
              fontWeight={700}
              marginTop={theme.spacing(1)}
              gutterBottom
              data-aos='fade-up'
            >
              Contact
            </Typography>
            <Typography
              variant='h6'
              align='center'
              color={theme.palette.text.secondary}
              marginTop={4}
              marginBottom={6}
              data-aos='fade-up'
            >
              Feel free to reach out to me
            </Typography>
          </Box>

          {/* Contact Form */}
          <Box component="form" onSubmit={handleSubmit} marginBottom={4}>
            <TextField
              fullWidth
              margin='normal'
              label='Name'
              variant='outlined'
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              fullWidth
              margin='normal'
              label='Email'
              variant='outlined'
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              margin='normal'
              label='Message'
              variant='outlined'
              multiline
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              error={!!errors.message}
              helperText={errors.message}
            />
            <Button type='submit' variant='contained' color='primary'>
              Send Message
            </Button>
          </Box>

          {/* Snackbar for success message */}
          <Snackbar open={snackOpen} autoHideDuration={6000} onClose={() => setSnackOpen(false)}>
            <Alert onClose={() => setSnackOpen(false)} severity="success">
              {snackMessage}
            </Alert>
          </Snackbar>

          {contact.map((item, i) => (
            <Box key={i}>
              <Box marginBottom={4}>
                <Map coordinates={[item.latitude, item.longitude]} zoom={13} />
              </Box>
              <Box
                display='flex'
                flexDirection={{ xs: 'column', sm: 'row' }}
                justifyContent='center'
                marginTop={6}
                marginBottom={3}
              >
                <Box
                  component={ListItem}
                  disableGutters
                  width='auto'
                  padding={0}
                  marginRight={10}
                >
                  <Box
                    component={ListItemAvatar}
                    minWidth='auto !important'
                    marginRight={2}
                  >
                    <Box
                      component={Avatar}
                      backgroundColor={theme.palette.primary.main}
                      width={40}
                      height={40}
                    >
                      <EmailIcon fontSize='small' />
                    </Box>
                  </Box>
                  <ListItemText primary='Email' secondary={item.email} />
                </Box>
                <Box
                  component={ListItem}
                  disableGutters
                  width='auto'
                  padding={0}
                >
                  <Box
                    component={ListItemAvatar}
                    minWidth='auto !important'
                    marginRight={2}
                  >
                    <Box
                      component={Avatar}
                      backgroundColor={theme.palette.primary.main}
                      width={40}
                      height={40}
                    >
                      <LocationIcon fontSize='small' />
                    </Box>
                  </Box>
                  <ListItemText primary='Location' secondary={item.address} />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Contact;
