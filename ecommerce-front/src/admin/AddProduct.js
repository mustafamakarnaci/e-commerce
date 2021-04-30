import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuthenticated } from '../auth'
import { Link, Redirect } from 'react-router-dom'
import { createProduct } from './apiAdmin'


const AddProduct = () => {


    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        photo,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values


    useEffect(() => {
        setValues({ ...values, formData: new FormData() })

    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value);
        console.log(formData);
        setValues({ ...values, [name]: value })
    }

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: '', loading: true })
        createProduct(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        description: '',
                        price: '',
                        quantity: '',
                        photo: '',
                        loading: false,
                        createdProduct: data.name,
                    })
                }
            })
    }

    const newPostForm = () => (
        <form className="mb-3" onSubmit={
            clickSubmit
        }>

            <h4>Post Photo</h4>

            <div className="form-group">
                <label htmlFor="" className="btn btn-secondary">
                    <input type="file" onChange={handleChange('photo')} name="photo" id="" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label htmlFor="" className="text-muted">Name</label>
                <input type="text" onChange={handleChange('name')} name="" id="" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label htmlFor="" className="text-muted">Description</label>
                <textarea type="text" onChange={handleChange('description')} name="" id="" className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label htmlFor="" className="text-muted">Price</label>
                <input type="text" onChange={handleChange('price')} name="" id="" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label htmlFor="" className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control" >
                    <option value="608a08e398338042f417f265">fake</option>
                    <option value="608a08e398338042f417f265">ruby</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="" className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control" >
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="" className="text-muted">Quantity</label>
                <input type="text" onChange={handleChange('quantity')} name="" id="" className="form-control" value={quantity} />
            </div>

            <button className="btn btn-primary">Create Product</button>
        </form>
    )
    /* {showError()}
    {showSuccess()}
    {newPostForm()}
    {goBack()} */


    return (
        <Layout title="Add a new product" description={`G-day ${user.name}, ready to add a new product`}>

            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    )
}

export default AddProduct
