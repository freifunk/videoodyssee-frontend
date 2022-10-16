import {
    Grid,
    Paper,
    TextField,
    FormControl,
    Button,
    Alert,
    Snackbar,

} from '@mui/material';

import './styles.css'
import { useState } from 'react';



const initialValues = {
    email: "",
    password: "",

};



const Form = () => {

    const [values, setValues] = useState(initialValues);
    const [err, setErr] = useState({ err: false, message: '' });
    const [success, setSuccess] = useState({ success: false, message: '' });



    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };



    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
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

                setSuccess({ success: true, message: "Authentication Successful !!" })
                localStorage.setItem('x-token', resJson.data);
                window.location.href =  "/dashboard";
            } else {
                setErr({ err: true, message: resJson.message })
            }
        } catch (err) {
            console.log(err);
        }

    };




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
                {/* <img src="/static/images/logo/logo-small.png" alt='Friefunk logo'/> */}
                <h2 align='center'>Login</h2>
                <p>
                    <FormControl fullWidth >
                        <TextField
                            value={values.email}
                            type="email"
                            name="email"
                            onChange={handleInputChange}
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            size='small'
                            autoFocus
                        />
                    </FormControl>
                </p>
                <p>
                    <FormControl fullWidth >
                        <TextField
                            value={values.password}
                            type="password"
                            name="password"
                            onChange={handleInputChange}
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            size='small'
                        />

                    </FormControl>
                </p>


                <FormControl fullWidth >
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </FormControl>

            </Paper>
        </Grid>
    )
}

export default Form;
