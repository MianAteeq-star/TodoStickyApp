import React from 'react'
import { Navigate,Route, Routes } from 'react-router-dom'
import Frontend from './Frontend'
import Auth from './Auth'
import { useAuthContext } from '../Context/authContext'
import CustomprivateRouting from '../Components/privateRouting'


export default function Index() {
    const {isAuth} = useAuthContext()

    return (
        <>
        <Routes>
            <Route path='/*' element={<CustomprivateRouting Component={Frontend}/>}/>
            <Route path='/auth/*' element={!isAuth ? <Auth/> : <Navigate to="/"/>}/>
        </Routes>



        </>
    )
}
