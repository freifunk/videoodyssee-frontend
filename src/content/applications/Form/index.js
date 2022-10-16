import {
    Grid,
    Paper,
    TextField,
    Select,
    MenuItem,
    FormControl,
    Autocomplete,
    InputLabel,
    Button,
    Alert,
    Snackbar,
  
  } from '@mui/material';
  
  import './styles.css'
  import { useState , useEffect } from 'react';
  import Footer from 'src/components/Footer';
  
  
  const initialValues = {
    title: "",
    subtitle: "",
    persons: [],
    tags: [],
    conference: "",
    language: "eng",
    date: new Date().toISOString().split('T')[0],
    url: "",
    name: "",
    email: "",
    link: "",
    description: ""
  };
  
  
  const Form = () => {
  
    const [values, setValues] = useState(initialValues);
    const [err, setErr] = useState({ err: false, message: '' });
    const [success, setSuccess] = useState({ success: false, message: '' });
    const [conferences,setConferences] = useState([]);
  
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    };

    const handleAutocompleteInputChange = (name,value) => {
      setValues({
        ...values,
        [name]: value,
      });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        let res = await fetch(`${process.env.REACT_APP_API_URL}/video/`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(values),
        });
        let resJson = await res.json();
        console.log(resJson);
        if (res.status === 200) {

          setSuccess({ success: true, message: resJson.data })
        } else {
          setErr({ err: true, message: resJson.message })
        }
      } catch (err) {
        console.log(err);
      }
  
    };

    useEffect(() => {
      const getConferences = async () => {
        try {
          let res = await fetch(`${process.env.REACT_APP_VOCTOWEB_API_URL}/public/conferences`, {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }
          })
          let resJson = await res.json();
          setConferences(resJson.conferences);
          setValues({...values,conference:resJson.conferences[0].acronym});
        }
        catch (err) {
          console.log(err);
        }
      }
      getConferences();
  
    },[])
  
  
    return (
      <Grid>

       
        <Snackbar
          open={success.success}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={6000}
          onClose={() => setSuccess({ success: false })}
        >
          <Alert onClose={() => setSuccess({ success: false })} severity="success" sx={{ width: '100%' }}>
            {success.message}
          </Alert>
        </Snackbar>
  
        <Snackbar
          open={err.err}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          autoHideDuration={6000}
          onClose={() => setErr({ err: false })}
        >
          <Alert onClose={() => setErr({ err: false })} severity="error" sx={{ width: '100%' }}>
            {err.message}
          </Alert>
        </Snackbar>
  
        <Paper elevation={10} className="paper">
          <img src="/static/images/logo/logo-small.png" alt='Friefunk logo'/>
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
                autoFocus
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
                onChange={(event, value) => handleAutocompleteInputChange('persons',value)}
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
                onChange={(event, value) => handleAutocompleteInputChange('tags',value)}
                options={[]}
                freeSolo
                size='small'
                renderInput={(params) => <TextField {...params} label="Tags" />}
              />
            </FormControl>
          </p>
  
          <p>
            <FormControl fullWidth >
              <InputLabel id="event-select-label">Conference</InputLabel>
              <Select
                labelId="event-select-label"
                id="conference"
                name="conference"
                value={values.conference}
                onChange={handleInputChange}
                label="Conference"
                size='small'
              >
                {conferences.map(({ acronym, title }, index) => <MenuItem value={acronym}>{title}</MenuItem>)}
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
                <MenuItem value={'eng'}>English</MenuItem>
                <MenuItem value={'deu'}>German</MenuItem>
                <MenuItem value={'rus'}>Russian</MenuItem>
                <MenuItem value={'fra'}>French</MenuItem>
                <MenuItem value={'spa'}>Spanish</MenuItem>
                <MenuItem value={'jpn'}>Japaneese</MenuItem>
                <MenuItem value={'hin'}>Hindi</MenuItem>
               
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
  