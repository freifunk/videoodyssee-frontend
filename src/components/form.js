import {
  Grid,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Autocomplete,
  InputLabel,
  Button
} from '@mui/material';

import './styles/form.css'
import logo from '../assets/logo-small.png';
import { useState } from 'react';


const initialValues = {
  title: "",
  subtitle: "",
  persons: [],
  tags: [],
  event: "Wireless Community Weekend 2017",
  language: "Russian",
  date: new Date().toISOString().split('T')[0],
  url: "",
  name: "",
  email: "",
  link: "",
  description: ""
};


const Form = () => {

  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value,values.persons);
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
  };




  return (
    <Grid>
      <Paper elevation={10} className="paper">
        <img src={logo} alt='Friefunk logo' />
        <h2 align='center'>Video Upload </h2>
        <p>
          <FormControl fullWidth >
            <TextField
              value={values.title}
              name="title"
              onChange={handleInputChange}
              id="outlined-basic"
              label="Title"
              variant="outlined"
              size='small'
            />
          </FormControl>
        </p>
        <p>
          <FormControl fullWidth >
            <TextField
              value={values.subtitle}
              name="subtitle"
              onChange={handleInputChange}
              id="outlined-basic"
              label="Subtitle"
              variant="outlined"
              size='small'
            />

          </FormControl>
        </p>

        <p>
          <FormControl fullWidth >
            <Autocomplete

              multiple
              id="persons"
              onChange={handleInputChange}
              options={[]}
              freeSolo
              size='small'
              renderInput={(params) => <TextField {...params} label="Persons" />}
            />
          </FormControl>
        </p>

        <p>
          <FormControl fullWidth >
            <Autocomplete

              multiple
              id="tags"
              onChange={handleInputChange}
              options={[]}
              freeSolo
              size='small'
              renderInput={(params) => <TextField {...params} label="Tags" />}
            />
          </FormControl>
        </p>

        <p>
          <FormControl fullWidth >
            <InputLabel id="event-select-label">Event</InputLabel>
            <Select
              labelId="event-select-label"
              id="event"
              name="event"
              value={values.event}
              onChange={handleInputChange}
              label="Event"
              size='small'
            >
              <MenuItem value={'Wireless Meshup'}>Wireless Meshup</MenuItem>
              <MenuItem value={'Wireless Community Weekend 2017'}>Wireless Community Weekend 2017</MenuItem>
              <MenuItem value={'Friefunk Festival 2017'}>Friefunk Festival 2017</MenuItem>
            </Select>
          </FormControl>
        </p>

        <p>
          <FormControl fullWidth >
            <InputLabel id="lang-select-label">Language</InputLabel>
            <Select
              labelId="lang-select-label"
              id="language"
              name="language"
              value={values.language}
              onChange={handleInputChange}
              label="Language"
              size='small'
            >
              <MenuItem value={'Russian'}>Russian</MenuItem>
              <MenuItem value={'French'}>French</MenuItem>
              <MenuItem value={'Spanish'}>Spanish</MenuItem>
              <MenuItem value={'German'}>German</MenuItem>
              <MenuItem value={'Japaneese'}>Japaneese</MenuItem>
              <MenuItem value={'English'}>English</MenuItem>
            </Select>
          </FormControl>
        </p>

        <p>
          <FormControl fullWidth >
            <TextField
              value={values.date}
              name="date"
              onChange={handleInputChange}
              id="date"
              label="Date"
              type="date"
              size='small'

            />
          </FormControl>

        </p>

        <p>
          <FormControl fullWidth >
            <TextField
              value={values.url}
              onChange={handleInputChange}
              name="url"
              id="url"
              label="Video URL"
              type='url'
              size='small'
            />
          </FormControl>
        </p>

        <p>
          <FormControl fullWidth >
            <TextField
              value={values.name}
              onChange={handleInputChange}
              name="name"
              id="name"
              label="Name"
              size='small'
            />
          </FormControl>
        </p>


        <p>
          <FormControl fullWidth >
            <TextField
              value={values.email}
              onChange={handleInputChange}
              name="email"
              id="email"
              label="Email"
              type="email"
              size='small'
            />
          </FormControl>
        </p>

        <p>
          <FormControl fullWidth >
            <TextField
              value={values.link}
              onChange={handleInputChange}
              name="link"
              id="link"
              label="Link"

              size='small'
            />
          </FormControl>
        </p>

        <p>
          <FormControl fullWidth >
            <TextField
              value={values.description}
              onChange={handleInputChange}
              name="description"
              id="description"
              label="Description"
              size='small'
              multiline
            />
          </FormControl>
        </p>
        <FormControl fullWidth >
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </FormControl>

      </Paper>

    </Grid>
  )
}

export default Form;
