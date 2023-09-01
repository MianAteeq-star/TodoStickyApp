import { Button, DatePicker, Divider, Form, Input, message } from 'antd'
import Title from 'antd/es/typography/Title'
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { auth, firestore } from '../../Config/firebase'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { Link } from 'react-router-dom'

export default function Register() {
    let initial = { email: "", fullName: "", password: "", date: "" }
    const [state, setState] = useState(initial)
    const [isProcessing, setIsProcessing] = useState(false)
    const handleChange = e => setState(s => ({ ...s, [e.target.name]: e.target.value }))
    // const handleDate=e=>setState(_,date)
    const handleRegister = (e) => {
        e.preventDefault()
        let { email, password } = state;


        setIsProcessing(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

                const user = userCredential.user;
                readUserProfile(user)

            })
            .catch((error) => {
                message.error("Something wrong")
                console.error(error)

            })
            .finally(() => {
                setIsProcessing(false)
            })


    }
    const readUserProfile = async (user) => {
        let { fullName, date } = state
        const { email, uid } = user
        const userData = {
            fullName, email, uid, date,
            dateCreated: serverTimestamp(),
            role: ["superAdmin"],
            status: "Active"

        }
        try {
            await setDoc(doc(firestore, "users", uid), userData);

            message.success("A new user has been created successfully")
        }
        catch {
            message.error("Something wrong")
        }
    }
    const handleSignOut = () => {

        signOut(auth).then(() => {
            message.success("Welcome Again")

        }).catch((error) => {
            message.error("An error happened.")

        });

    }

    return (

        <main className="auth">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="card p-2 p-md-4">


                            <Title level={2} className='mb-0 text-center'>REGISTER</Title>
                            <Divider />
                            <Form layout="vertical">
                                <Form.Item label="Full Name">
                                    <Input placeholder='Input Your Name' name='fullName' onChange={handleChange} />

                                </Form.Item>
                                <Form.Item label="Email">
                                    <Input placeholder='Input Your Email' name='email' onChange={handleChange} />

                                </Form.Item>
                                <Form.Item label="Password">
                                    <Input.Password placeholder='Input Your Password' name='password' onChange={handleChange} />

                                </Form.Item>
                                <Form.Item label="Date Of Birth">
                                    <DatePicker className='w-100' onChange={(dateObject, dateString) => { setState(s => ({ ...s, date: dateString })) }} />

                                </Form.Item>

                                <Button htmlType='submit' type='primary ' shape='round' className='w-50' loading={isProcessing} onClick={handleRegister}>Register</Button>
                                <Link to={"/auth/login"} onClick={handleSignOut}><Button htmlType='submit' type='dashed ' shape='round' className='w-50' >Logout</Button></Link>







                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
