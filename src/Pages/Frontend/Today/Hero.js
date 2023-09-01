import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { firestore } from '../../../Config/firebase'
// import {
//   PlusOutlined,
//   DeleteOutlined,
//   EditOutlined
// } from '@ant-design/icons';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Divider, message } from 'antd'


const initialstate={date:"",title:"",discription:"",color:"",}
export default function Hero() {
  const [state,setState]=useState(initialstate)
  const [todayDate, setTodayDate] = useState([])
  const [allDocuments, setAllDocuments] = useState([])
  // const [isModalOpen,setIsModalOpen]=useState(false)

  const getTodoSticky = async () => {
    const dateCurrent = new Date().toISOString().split('T')[0];
    const q = query(collection(firestore, "todoStickys"), where("date", "==", dateCurrent));
    const querySnapshot = await getDocs(q);
    const stickyData = querySnapshot.docs.map(doc => doc.data())
    setTodayDate(stickyData);

  }

  useEffect(() => {
    getTodoSticky()
  }, [])

  const handleDelete = async (todo) => {
    try {
      await deleteDoc(doc(firestore, "todoStickys", todo.id));
      const delDoc = todayDate.filter(doc => doc.id !== todo.id)
      setTodayDate(delDoc)
      setAllDocuments(delDoc)
      message.success("successfully delete")
    } catch (err) {
      console.error(err)
      message.error("Somthing goes Wrong")
    }
  }


  const handleEdit=(sickyId)=>{
    let {date,title,color,discription}=state
    
    console.log({...state})
    const editSticky=todayDate.find((data=>data.id ===sickyId))
    if(editSticky){
      setState({
        date:editSticky.date,
        title:editSticky.title,
        discription:editSticky.discription,
        color:editSticky.color,
        id:editSticky.id
      })
      setAllDocuments(editSticky.id);
    }
  }


  return (

<>
<div className='d-flex justify-content-center align-items-center flex-column'>

      <h1 >Today</h1>
  </div>
  <Divider/>
    <div className="container">

      <div className="row">
        {todayDate.map((data, i) => {
          return (


            <div className="  col-12 col-sm-6 col-md-4 col-lg-3 my-1 mx-0" key={i}>
              <div className="card shadow ps-2 rounded-4" style={{ backgroundColor: `${data.color}`, minHeight: 200, width: 200 }}>

                <h2 className='d-flex justify-content-between'>{i + 1} <span style={{ fontSize: 25 }} className='m-1'><EditOutlined onClick={()=>handleEdit(data.id)} className="text-success bg-white p-2 rounded-3 mx-2" /><DeleteOutlined className="text-danger bg-white p-2 rounded-3 ml-3" onClick={() => handleDelete(data)} /></span></h2>
                <div >
                  <div>

                    <h5>Title: {data.title}</h5>
                    <h6>Discription: {data.discription}</h6>
                  </div>
                  <p>Color: {data.color}</p>
                  <h6>Date: {data.date}</h6>
                </div>


              </div>
            </div>

          )
        })}
        {/* <div className="col col-lg-2 col-sm-2  rounded-4  mx-2 my-1  bg-primary card shadow" onClick={openModal} style={{ height: 200, width: 200, display: "flex", justifyContent: "center", alignItems: "center" }}  >
                        <h1><PlusOutlined /></h1>
                      </div> */}
      </div>

    </div>
    {/* <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
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
                            <DatePicker value={state.date ? dayjs (state.date):""} name='date' onChange={handleDate}/>
                            </Form.Item>

                        </Col>


                        <Col span={24} lg={12}>
                            <Form.Item label="Color">
                                <Input type='color' name='color' onChange={handleChange} value={state.color} />
                            </Form.Item>
                        </Col>


                        <Col xs={24}>
                            <Form.Item label="Discription">
                                <Input.TextArea placeholder="Input your discription" name="discription" value={state.discription} onChange={handleChange} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal> */}


                      </>
  )

}

