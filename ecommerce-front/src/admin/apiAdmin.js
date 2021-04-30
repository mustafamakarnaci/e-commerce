import { API } from '../config';

/**
* create/category fetch
*/
export const createCategory = (userId, token, category) => {
     console.log(userId, token, category);
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    }).then(response => {
        return response.json()
    }).catch(err => {
        console.log(err)
    })
}

/**
* create/product fetch
*/
export const createProduct = (userId, token, product) => {
    console.log(userId, token, product);
   return fetch(`${API}/product/create/${userId}`, {
       method: "POST",
       headers: {
           Accept: 'application/json',
           Authorization: `Bearer ${token}`
       },
       body: product
   }).then(response => {
       return response.json()
   }).catch(err => {
       console.log(err)
   })
}


