import React, { useState } from 'react'
import Layout from '../core/Layout'
import { signup } from '../auth';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });


    /**
     * destrucring fields
     */
    const { name, email, password, success, error } = values;


    /**
     * handleChange
     */
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }


    /**
     * clickSubmit
     */
    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false })

        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false })
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                })
            }
        });
    }


    /**
     * signupFrom
     */
    const signupForm = () => (
        <form>
            <div className="from-group">
                <label className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} value={name} className="form-control" />
            </div>
            <div className="from-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={handleChange('email')} value={email} className="form-control" />
            </div>
            <div className="from-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange('password')} value={password} className="form-control" />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    );


    /**
     * showError
     */
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )


    /**
     * showSuccess
     */
    const showSuccess = () => (<div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
        New account is created. Please <Link to="/signin" >Signin</Link>
    </div>
    )


    return (
        <Layout title='Signup' description="Signup to Node React E-Commerce App" className="container col-md-8 offset-md-2">

            {showSuccess()}
            {showError()}
            {signupForm()}

        </Layout>
    )
}

export default Signup
