import { useState } from 'react';

const initialValues = {
    email: "",
    password: "",
};

const LoginForm = () => {
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
                setSuccess({ success: true, message: "Authentication Successful !!" });
                localStorage.setItem('x-token', resJson.data);
                window.location.href = "/dashboard";
            } else {
                setErr({ err: true, message: resJson.message });
                setTimeout(() => setErr({ err: false, message: '' }), 5000);
            }
        } catch (err) {
            console.log(err);
            setErr({ err: true, message: 'Ein Fehler ist aufgetreten.' });
            setTimeout(() => setErr({ err: false, message: '' }), 5000);
        }
    };

    return (
        <div className="form-container">
            <img src="/static/images/logo/logo-small.png" alt='Freifunk logo' className="logo" />
            <h2 className="form-title">Login</h2>
            
            {success.success && (
                <div className="alert alert-success">
                    {success.message}
                </div>
            )}
            
            {err.err && (
                <div className="alert alert-error">
                    {err.message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        className="form-input"
                        type="email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                        className="form-input"
                        type="password"
                        id="password"
                        name="password"
                        value={values.password}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit" className="form-button">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
