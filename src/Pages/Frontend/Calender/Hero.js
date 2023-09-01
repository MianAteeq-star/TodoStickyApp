import { collection, deleteDoc, doc, getDocFromServer, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { firestore } from '../../../Config/firebase';
import { 
  DeleteOutlined,
EditOutlined } from '@ant-design/icons';
import { Button, DatePicker, Divider, message } from 'antd';
export default function Hero() {

  // const handleChange = e => setState((s) => ({ ...s, [e.target.name]: e.target.value }))
const handleDate=(_,date)=>setState(s=>({...s,date}))

const [state, setState] = useState({})
const [getTodos, setGetTodos] = useState([]);
const [document,setDocument]=useState([])
const [allDocuments,setAllDocuments]=useState([])

const showTodo = async () => {
  const querySnapshot = await getDocs(collection(firestore, "todoStickys"));

  const docArray = []
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    docArray.push(data)
    console.log('data', data)
    setGetTodos(docArray)
  });
}
useEffect(() => {
  showTodo();
}, []);

const randomCal = getTodos.filter(todo=> todo.date === state.date)










const handleDelete=async(todo)=>{
  try {
      await deleteDoc(doc(firestore, "todoStickys", todo.id));
      let afterDeleteDoc= randomCal.filter((doc=>doc.id !==todo.id ))
      
      setAllDocuments(afterDeleteDoc)
      setDocument(afterDeleteDoc)
      message.success('Todo delete successfully')
      
}catch(err){
  console.error(err)
  message.error('Something went wrong')
}
}
// const handleDelete =async(cal)=>{
//  try{

//    await deleteDoc(doc(firestore, "todoStickys", cal.id));
//    let afterDelete= randomCal.filter(doc=>doc.id !==cal.id)
//    setDocument(afterDelete)
//    setAllDocuments(afterDelete)
//    message.success("Todo delete successFully")
//   } catch(err){
//     console.error(err)
//     message.error("SomeThing goes Wrong")
//   }

// }



  return (
  <>
  <div className='d-flex justify-content-center align-items-center flex-column'>

      <h1 >Calander</h1>
    <DatePicker w-100 name='date'  onChange={handleDate} />
  </div>
  <Divider/>

      <div className="container">

        <div className="row">
          {randomCal.map((data, i) => {
            return (


              <div className="  col-12 col-sm-6 col-md-4 col-lg-3 my-1 mx-0" key={i}>
                <div className="card shadow ps-2 rounded-4" style={{ backgroundColor: `${data.color}`, minHeight: 200, width: 200 }}>

                  <h2 className='d-flex justify-content-between'>{i + 1} <span style={{ fontSize: 25 }} className='m-1'><EditOutlined className="text-success bg-white p-2 rounded-3 mx-2" /><DeleteOutlined onClick={()=>{handleDelete(data)}}  className="text-danger bg-white p-2 rounded-3 ml-3"  /></span></h2>


                  <h5>Title: {data.title}</h5>
                  <h6>Discription: {data.discription}</h6>
                  {/* <p>Color: {data.color}</p> */}
                  <h6>Date: {data.date}</h6>


                </div>
              </div>

            )
          })}

     </div>
     </div>
</>

      )
}

