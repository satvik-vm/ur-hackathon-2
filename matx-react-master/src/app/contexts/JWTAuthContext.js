import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios.js'
import { MatxLoading } from 'app/components'

var user_init;

const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    user: null,
}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }

    const decodedToken = jwtDecode(accessToken)
    const currentTime = Date.now() / 1000
    return decodedToken.exp > currentTime
}

const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload

            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }

        case 'QUERY_BALANCE': {
            const {amount} = action.payload

            return {
                ...state,
                isAuthenticated: true,
                amount,
            }
        }

        case 'DEPOSIT': {
            const {user} = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }

        case 'WITHDRAW': {
            const {user} = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }

        case 'TRANSACTIONS': {
            const {user} = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }

        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => { },
    register: () => Promise.resolve(),
    deposit: () => Promise.resolve(),
    withdraw: () => Promise.resolve(),
    transactions: () => Promise.resolve(),
    // get_balance: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const login = async (account_num, password) => {
        const userCredentials = {account_number: account_num, password: password};

        const response = await axios.post('http://localhost:5000/api/auth/login_function', {
            userCredentials,
        })
        const { accessToken, user } = response.data
        console.log(accessToken)
        console.log(user)
        if(accessToken == 201)  user_init = user;

        setSession(accessToken)

        dispatch({
            type: 'LOGIN',
            payload: {
                user,
            },
        })
    }

    const register = async (email, username, password, phone_number, pincode, age)  => {
        const config = {
            header: {
              "Content-Type": "application/json",
            },
        };
        const userCredentials = {_name: username, phone_number: phone_number, email: email, password: password, pincode: pincode, age: age};
        const response = await axios.post('http://localhost:5000/api/auth/signup_function', {
            userCredentials,
            // config
        })

        const { accessToken, user } = response.data

        setSession(accessToken)

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }

    const deposit = async(amount) => {
        const userCredentials = {account_number: user_init.id, amount: amount};
        const response = await axios.post('http://localhost:5000/api/auth/deposit_function', {
            userCredentials,
        })

        const { accessToken, user } = response.data

        console.log(response)

        setSession(accessToken)

        dispatch({
            type: 'DEPOSIT',
            payload: {
                user,
            },
        })
    }

    const withdraw = async(amount) => {
        console.log(user_init.id);
        const userCredentials = {account_number: user_init.id, amount: amount};
        const response = await axios.post('http://localhost:5000/api/auth/withdrawl_function', {
            userCredentials,
        })

        const { accessToken, user } = response.data

        console.log(response)

        setSession(accessToken)

        dispatch({
            type: 'WITHDRAW',
            payload: {
                user,
            },
        })
    }

    const logout = () => {
        setSession(null)
        dispatch({ type: 'LOGOUT' })
    }

    const transactions=async() => {
        console.log("transactins called from useauth " );
        const userCredentials = {account_number: user_init.id};
        const response = await axios.post('http://localhost:5000/api/auth/get_transactions', {
            userCredentials,
        })

        const {accessToken, user} = response.data;

        console.log("response from back end: ")

        console.log(response)

        setSession(accessToken)


        dispatch({
            type: 'TRANSACTIONS',
            payload:{
                user,
            },

        })
    }

    // const get_balance = async() => {
    //     const account_number = user_init.id;
    //     const userCredentials = {account_number: account_number};
    //     const response = await axios.post('http://localhost:5000/api/auth/get_balance_function', {
    //         userCredentials,
    //     })

    //     const { accessToken,  } = response.data;

    //     setSession(accessToken)

    //     dispatch({
    //         type: 'QUERY_BALANCE',
    //         payload: {
    //             user,
    //         },
    //     })
    // }

    useEffect(() => {
        ; (async () => {
            try {
                const accessToken = window.localStorage.getItem('accessToken')

                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken)
                    const response = await axios.get('/api/auth/profile')
                    const { user } = response.data

                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
                deposit,
                withdraw,
                transactions,
                // get_balance,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};

export default AuthContext
