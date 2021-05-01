import React, { useState } from 'react'
import Layout from '../core/Layout'
import { signin, authenticate, isAuthenticated } from '../auth';
import { Redirect } from 'react-router-dom';

const Signin = () => {
    const [values, setValues] = useState({

        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false
    });



    /**
     * destrucring fields
     */
    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();


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
        setValues({ ...values, error: false, loading: true })

        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false })

            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    })
                })
            }
        });
    }


    /**
     * signinForm
     */
    const signinForm = () => (
        <form>
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
     * showLoading
     */
    const showLoading = () => loading && (<div className="alert alert-info">
        <h2>Loading...</h2>
    </div>
    )

    /**
     * redirectUser
     */
    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to='/admin/dashboard' />
            } else {
                return <Redirect to='/user/dashboard' />
            }
        }
        if(isAuthenticated()){
            return <Redirect to='/' />        }
    }

    return (
        <Layout title='Signin' description="Signin to Node React E-Commerce App" className="container col-md-8 offset-md-2">

            {showLoading()}
            {showError()}
            {signinForm()}
            {redirectUser()}

        </Layout>
    )
}

export default Signin
