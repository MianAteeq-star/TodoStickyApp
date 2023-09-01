import { Button, Col, DatePicker, Divider, Form, Input, Modal, Row, message } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useEffect, useState } from 'react'

import {
    PlusOutlined,
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons';
import { useAuthContext } from '../../../Context/authContext'
import { firestore } from '../../../Config/firebase';
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc } from 'firebase/firestore';
import dayjs from 'dayjs';
// import { firestore } from '../../../Config/firebase';
// import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';


let initialState = { title: "", date: "", discription: "", color: "" }

export default function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [state, setState] = useState(initialState)
    const { user } = useAuthContext
    const [isProcessing, setIsPrecessing] = useState(false)
    const [allDocuments, setAllDocuments] = useState([])
    const [documents, setDocuments] = useState([])



    const handleChange = e => setState((s) => ({ ...s, [e.target.name]: e.target.value }))
    const handleDate = (_, date) => setState(s => ({ ...s, date }))






    const getTodos = async () => {
        const querySnapshot = await getDocs(collection(firestore, "todoStickys"));
        const docArray = []
        querySnapshot.forEach((doc) => {
            const data = doc.data()
            docArray.push(data)

            console.log(doc.id, " => ", doc.data());
        });
        setAllDocuments(docArray)



    }
    useEffect(() => {
        getTodos()
    }, [])



    const handleDelete = async (todo) => {
        try {
            await deleteDoc(doc(firestore, "todoStickys", todo.id));
            let afterDeleteDoc = allDocuments.filter((doc => doc.id !== todo.id))
            message.success('Todo delete successfully')

            setAllDocuments(afterDeleteDoc)
            // setDocuments(afterDeleteDoc)

        } catch (err) {
            console.error(err)
            message.error('Something went wrong')
        }
    }
    // useEffect(()=>{
    // setDelDocument(allDocuments)
    // },[])

    const handleOk = async (e) => {
        e.preventDefault()
        let { date, title, discription, color } = state
        const todoSticky = {
            date, title, discription, color,

            id: Math.random().toString(36).slice(2),
            dateCreated: new Date().getTime(),
            // createdBy:{
            //     id: user.uid,
            //     fullName:user.fullName

            // }

        }
        if (title.length < 3) {
            message.error('Please enter title')
            return
        }
        if (discription.length < 5) {
            message.error('Please enter discription')
            return
        }
        console.log(title, date, discription, color)
        setIsPrecessing(true)

        try {

            await setDoc(doc(firestore, "todoStickys", todoSticky.id), todoSticky);
            message.success('Todo add successfully')
            getTodos();
            setState(initialState)

        }
        catch {
            message.error('Something went wrong')
        }
        // setState(initialState)
        setIsPrecessing(false)
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true)
    }

    const handleEdit = (stickyId) => {
        setIsModalOpen(true)
        // let { date, title, discription, color } = state

        const editSticky = allDocuments.find((data => data.id === stickyId))
        if (editSticky) {

            setState({
                date: editSticky.date,
                title: editSticky.title,
                discription: editSticky.discription,
                color: editSticky.color
            })
            setDocuments(editSticky.id)
        }


        // console.log(date, title, discription, color)
    }
    const handleUpdate = async () => {
        let { date, color, title, discription } = state
        const todoStick = {
            date, title, discription, color,
            dateCreated: serverTimestamp(),
            id: Math.random().toString(36).slice(2),
            // createdBy:{
            //     fullName:user.fullName,
            //     uid:user.uid
            // }


        }
        if (title.length < 3) {
            message.error('Please enter title')
            return
        }
        if (discription.length < 5) {
            message.error('Please enter discription')
            return
        }
        setIsPrecessing(true)
        try {
            await setDoc(doc(firestore, "todoStickys", documents), todoStick);
            message.success('Todo UPDATED Successfully')
            setState((preState) => ({
                ...preState
            }))
            getTodos();
            setState(initialState)
        }
        catch (err) {
            console.error(err)
            message.error('Something went wrong')
        }
        console.log('todoStick', todoStick)
        setIsPrecessing(false)
        setIsModalOpen(false)
    }

    return (




        <>
            <div className="container">

                <div className="row">
                    {allDocuments.map((data, i) => {
                        return (


                            <div className="  col-12 col-sm-6 col-md-4 col-lg-3 my-1 mx-0" key={i}>
                                <div className="card  ps-2 rounded-4" style={{ backgroundColor: `${data.color}`, minHeight: 200, width: 200,boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;" }}>

                                    <h2 className='d-flex justify-content-between'>{i + 1} <span style={{ fontSize: 25 }} className='m-1'><EditOutlined className="text-success bg-white p-2 rounded-3 mx-2" onClick={() => { handleEdit(data.id) }} /><DeleteOutlined className="text-danger bg-white p-2 rounded-3 ml-3" onClick={() => handleDelete(data)} /></span></h2>


                                    <h5>Title: {data.title}</h5>
                                    <h6>Discription: {data.discription}</h6>
                                    {/* <p>Color: {data.color}</p> */}
                                    <h6>Date: {data.date}</h6>


                            </div>
                                </div>

                        )
                    })}
                   <div className="my-1 mx-0 " style={{ height: 200, width: 200}} >
                   <div className="card  ps-2 rounded-4   " onClick={openModal} style={{ height: 200, width: 200, display: "flex", justifyContent: "center", alignItems: "center" }}  >
                        <h1><PlusOutlined /></h1>
                    </div>
                   </div>
                </div>

            </div>



























            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} confirmLoading={isProcessing} >
                <Title level={2} className="m-0 text-center">
                    Add Todos
                </Title>
                <Divider />
                <Form layout="vertical">
                    <Row gutter={16}>
                        <Col xs={24}>
                            <Form.Item label="Title">
                                <Input placeholder="Input your title" name="title" value={state.title} onChange={handleChange} />
                            </Form.Item>
                        </Col>


                        <Col xs={24} lg={12}>
                            <Form.Item label="Date">
                                {/* <Input type='date' className='w-10' name="date" value={state.date} onChange={handleChange} /> */}
                                <DatePicker value={state.date ? dayjs(state.date) : ""} name='date' onChange={handleDate} />
                            </Form.Item>

                        </Col>


                        <Col span={24} lg={12}>
                            <Form.Item label="Color">
                                <Input type='color' name='color' onChange={handleChange} value={state.color} />
                            </Form.Item>
                        </Col>


                        <Col xs={24}>
                            <Form.Item label="Discrription">
                                <Input.TextArea placeholder="Input your discription" name="discription" value={state.discription} onChange={handleChange} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Button className=' bg-warning ' onClick={() => { handleUpdate() }}> Update Todo</Button>
                </Form>

            </Modal>

            {/* //------------------------------Update------------------------------------ */}





        </>

    );
}

