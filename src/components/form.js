import {
  Grid,
  Paper,
  TextField,
  Select,
  MenuItem,
  Chip,
  FormControl,
  Autocomplete,
  InputLabel
} from '@mui/material';

import './styles/form.css'




const Form = () => {
  let event = 'Wireless Community Weekend 2017';
  let language = 'Russian';

  const paperStyle = {
    padding: 20,
    width: 330,
    height: '120vh',
    margin: '20px auto'
  }
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <img src="https://videoodyssee.freifunk.net/pics/logo-small.png" alt='Friefunk logo' />
        <h2 align='center'>Video Upload </h2>
        <p>
          <FormControl fullWidth className='input-field'>
            <TextField id="outlined-basic" label="Title" variant="outlined" size='small' />
          </FormControl>
        </p>
        <p>
          <FormControl fullWidth className='input-field'>
            <TextField id="outlined-basic" label="Subtitle" variant="outlined" size='small' />

          </FormControl>
        </p>

        <p>
          <FormControl fullWidth >
            <Autocomplete
              className='input-field'
              multiple
              id="combo-box-demo"
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
              className='input-field'
              multiple
              id="combo-box-demo"
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
            className='input-field'
            labelId="event-select-label"
            id="demo-simple-select"
            value={event}
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
            className='input-field'
            labelId="lang-select-label"
            id="demo-simple-select"
            value={language}
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
            className='input-field'
            id="date"
            label="Date"
            type="date"
            defaultValue="2017-05-24"
            size='small'

          />
        </FormControl>

        </p>
        
        <p>
        <FormControl fullWidth >
          <TextField
            className='input-field'
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
            className='input-field'
            id="name"
            label="Name"
            size='small'
          />
        </FormControl>
        </p>


        <p>
        <FormControl fullWidth >
          <TextField
            className='input-field'
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
            className='input-field'
            id="link"
            label="Link"

            size='small'
          />
        </FormControl>
        </p>

        <p>
        <FormControl fullWidth >
          <TextField
            className='input-field'
            id="description"
            label="Description"
            size='small'
          />
        </FormControl>
        </p>
      </Paper>

    </Grid>
  )
}

export default Form;

