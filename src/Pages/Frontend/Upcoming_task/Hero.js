import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import {EditOutlined,DeleteOutlined,PlusOutlined} from '@ant-design/icons'; 
import { firestore } from '../../../Config/firebase';
import { Divider, message } from 'antd';

export default function Hero() {
  const [upcomings,setUpcomings]=useState([])
  const[documents,setDocuments]=useState([])

  const getTodoSticky=async()=>{
    const currentDate= new Date().toISOString().split('T')[0];

    const q = query(collection(firestore, "todoStickys"), where("date", ">", currentDate));

const querySnapshot = await getDocs(q);
const date =querySnapshot.docs.map(doc => doc.data())
setUpcomings(date)
}
useEffect(()=>{
getTodoSticky()
},[])
const handleDelete=async(todo)=>{
  try{
    await deleteDoc(doc(firestore,"todoStickys",todo.id));
    const deleDoc= upcomings.filter(doc=>doc.id !==todo.id)
    setUpcomings(deleDoc)
    message.success("TodoSticky Delete Successfully")

  }catch(err){
    message.error(err)
    message.error("Error Occur While Deleting Todo")
  }
}
  
  return (
    <>
    <div className='d-flex justify-content-center align-items-center flex-column'>

      <h1 >Upcoming</h1>
  </div>
  <Divider/>
<div className="container">

<div className="row">
  {upcomings.map((data, i) => {
    return (


      <div className="  col-12 col-sm-6 col-md-4 col-lg-3 my-1 mx-0" key={i}>
        <div className="card shadow ps-2 rounded-4" style={{ backgroundColor: `${data.color}`, minHeight: 200, width: 200 }}>

          <h2 className='d-flex justify-content-between'>{i + 1} <span style={{ fontSize: 25 }} className='m-1'><EditOutlined className="text-success bg-white p-2 rounded-3 mx-2" /><DeleteOutlined className="text-danger bg-white p-2 rounded-3 ml-3" onClick={() => handleDelete(data)} /></span></h2>
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
    </>
  )
}
