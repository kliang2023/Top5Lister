import React, { createContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import api from '../api'
import ErrorModal from '../components/ErrorModal'

export const AuthContext = createContext({});
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
     REGISTER_USER: "REGISTER_USER",
     SIGN_OUT_USER: "SIGN_OUT_USER",
     SIGN_IN_USER: "SIGN_IN_USER",
     WRITE_ERROR: "WRITE_ERROR"
    // SET_LOGGED_IN: "SET_LOGGED_IN"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        errorMessage: null
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn
                });
            }
            case AuthActionType.SIGN_OUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false
                });
            }
            case AuthActionType.SIGN_IN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                });
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true
                })
            }
            case AuthActionType.WRITE_ERROR: {
                return setAuth({
                    user: payload.user,
                    loggedIn: false,
                    errorMessage: payload.errorMessage
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        console.log("here")
        console.log(response)
        if (response.status === 200 && response.data.user !== null) {
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }

    // auth.setLoggedIn = async function () {
    //     const response = await api.setLoggedIn();
    //     if (response.status === 200) {
    //         authReducer({
    //             type: AuthActionType.SET_LOGGED_IN,
    //             payload: {
    //                 loggedIn: response.data.loggedIn,
    //                 user: response.data.user
    //             }
    //         });
    //     }
    // }

    auth.registerUser = async function(userData, store) {
        // console.log("here")
        const response = await api.registerUser(userData);
        // console.log("here2")
        console.log(response)      
        if (response.status === 200) {
            if (response.data.success===false){
                authReducer({
                    type:AuthActionType.WRITE_ERROR,
                    payload: {
                        user: response.data.user,
                        errorMessage: response.data.errorMessage
                    }
                })
            } else {
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: response.data.user
                }
            })
            
            history.push("/");
            store.loadIdNamePairs();
        }
        }

    }
    auth.logoutUser = async function(userData) {
        const response = await api.logoutUser(userData);
        console.log("hjelasdf")
        console.log(response)
        if (response.status === 200) {
            console.log("hello!!!!")
            authReducer({
                type: AuthActionType.SIGN_OUT_USER
            })
            // console.log("here")
            history.push("/");
            // store.loadIdNamePairs();
        }
    }

    auth.loginUser = async function(userData) {
        const response = await api.loginUser(userData);
        if (response.status === 200) {
            console.log("valid")
            authReducer({
                type: AuthActionType.SIGN_IN_USER,
                payload: {
                    user: response.data.user
                }
            })
            // console.log("here")
            history.push("/");
            // store.loadIdNamePairs();
        }
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };