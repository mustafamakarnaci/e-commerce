import { API } from '../config';

/**
* signup fetch
*/
export const signup = (user) => {
    // console.log(name, email, password);
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
        return response.json()
    }).catch(err => {
        console.log(err)
    })
}


/**
* signin fetch
*/
export const signin = (user) => {
    // console.log(name, email, password);
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => {
        return response.json()
    }).catch(err => {
        console.log(err)
    })
}


/**
 * authenticate
 */

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data))
        next();
    }
}

/**
 * signout
 */


export const signout = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        return fetch(`${API}/signout`, {
            method: "GET"
        })
            .then(response => {
                console.log('signout')
            }).catch(err => console.log(err));
    }
}


/**
 * isAuthenticated
 */

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    } else {
        return false
    }
}