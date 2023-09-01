import { Button, Divider, Form, Input, message } from 'antd'
import Password from 'antd/es/input/Password'
import Title from 'antd/es/typography/Title'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../Context/authContext'
import { auth } from '../../Config/firebase'



export default function Login() {


const [state,setState] = useState({email:"",password:""})
const [isProcessing,setIsProcessing] = useState(false)
const {readProfile}=useAuthContext()
const handleChange=(e)=>setState(s=>({...s,[e.target.name]:e.target.value}))

const handleLogin=e=>{
    e.preventDefault()
    let {email,password}=state;
    setIsProcessing(true);
    signInWithEmailAndPassword(auth,email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        readProfile(user)
        message.success("Login successfull")
    
    })
    .catch((error) => {
        console.error(error)
        message.error("Something wrong")
    })
    .finally(()=>{
        setIsProcessing(false)
    })

}


  return (
    <main className="auth">
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card p-3 p-md-4  shadow">
<Title level={2} className='mb-0 text-center'>LOGIN</Title>

<Divider/>
<Form layout="vertical">
    <Form.Item label="Email">
        <Input placeholder='Input Your Email' name='email' onChange={handleChange} />
        
    </Form.Item>
    <Form.Item label="Password">
        <Input.Password placeholder='Input Your Password' name='password' onChange={handleChange}/>

    </Form.Item>
    <Button htmlType='submit' type='primary' shape='round' className='w-100' loading={isProcessing} onClick={handleLogin}>Login</Button>
    <Divider/>
    Already have an Account  &ensp;<Link to="/auth/register" className='text-decoration-none '> REGISTER</Link>
</Form>



                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}
