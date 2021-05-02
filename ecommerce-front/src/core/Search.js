import React, { useState, useEffect } from 'react'
import { getCategories } from './apiCore';
import Card from './Card';
import { list } from './apiCore'

const Search = () => {

    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    })


    const {
        categories,
        category,
        search,
        results,
        searched
    } = data;


    const loadCategories = () => {
        getCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setData({ ...data, categories: data })
                }
            })
    }


    useEffect(() => {
        loadCategories();
    }, [])

    const searchData = () => {
        console.log(search, category);
        if (search) {
            list({ search: search || undefined, category: category })
                .then(response => {
                    if (response.error) {
                        console.log(response.error)
                    } else {
                        console.log('res', response)
                        setData({ ...data, results: response, searched: true })
                    }
                })
        }
    }

    const searchSubmit = (e) => {
        e.preventDefault();
        searchData();
    }


    const handleChange = (name) => event => {
        console.log('hd', event.target.value)
        setData({ ...data, [name]: event.target.value, searched: false })

    }

    const searchedProducts = (results = []) => {
        console.log('r', results)
        return (
            <div className="row">
                { results.map((product, i) => {
                    <Card key={i} product={product} />
                })}
            </div>
        )
    }


    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select
                            className="btn mr-2"
                            onChange={handleChange("category")}
                        >
                            <option value="All">Pick Category</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input type="search"
                        onChange={handleChange('search')}
                        placeholder="Search by name"
                        className="form-control"

                    />

                </div>
                <div className="btn input-group-append" style={{ border: 'none' }}>
                    <button className="input-group-text">
                        Search
                            </button>
                </div>
            </span>
        </form>
    )

    return (
        <div>
            <div className="container mb-3">
                {searchForm()}
                <div className="container-fluid mb-3">
                    {searchedProducts(results)}
                </div>
            </div>
        </div>
    )
}

export default Search
