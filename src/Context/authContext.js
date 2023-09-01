import React, { useReducer, useState,useEffect } from 'react'
import { useContext, createContext } from 'react'
import { auth, firestore } from '../Config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { message } from 'antd'


const AuthContext = createContext()
const initialState = { isAuth: false, user: {} }
const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'SET_LOGED_IN':
            return { isAuth: true, user: payload.user}
        case 'SET_LOGED_OUT':
            return initialState;
        default:
            return state;
    }
}
export default function AuthContextProvider({ children }) {
    const [isAppLoading, setIsAppLoading] = useState(true)
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
               dispatch({type:"SET_LOGED_IN",payload:{user}})
            } else {
                setIsAppLoading(false)
            }
        });
    }, []);

    const readProfile = async (user) => {
        const docRef = doc(firestore, "users", user.uid)
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

            const user = docSnap.data();
            dispatch({ type: "SET_LOGED_IN", payload: { user } })

        } else {
            message.error("User data not Found");
        }
        setIsAppLoading(false)
    }



    return (
        <>
            <AuthContext.Provider value={{ ...state, isAppLoading, dispatch ,readProfile}}>
                {children}

            </AuthContext.Provider>
        </>
    )
}
export const useAuthContext = () => useContext(AuthContext)

