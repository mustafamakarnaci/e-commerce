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
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};

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
        return response.json();
    }).catch(err => {
        console.log(err);
    });
};


/**
 * listOrders fetch
 */

export const listOrders = (userId, token) => {
    return fetch(`${API}/order/list/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



/**
 * getStatusValues fetch
 */
export const getStatusValues = (userId, token) => {
    return fetch(`${API}/order/status-values/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

/**
 * updateOrderStatus fetch
 */
export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status, orderId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};




/**
 * getCategories fetch
 */

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};