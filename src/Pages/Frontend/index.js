import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HighlightOutlined,
  LogoutOutlined,
  DoubleRightOutlined,
  OrderedListOutlined,
  CalendarOutlined,
  PlusCircleOutlined,

  UserDeleteOutlined,

  AudioOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Input, Divider, message, Modal, Form, Row, Col, DatePicker, ColorPicker } from 'antd';
import { Link } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Upcoming from '../../Pages/Frontend/Upcoming_task'
import Today from '../../Pages/Frontend/Today'
import Calender from '../../Pages/Frontend/Calender'



import { signOut } from 'firebase/auth'
import { useAuthContext } from '../../Context/authContext';
import Home from './Home/Home';
import { auth } from '../../Config/firebase';
import { calculateNewValue } from '@testing-library/user-event/dist/utils';

const { Header, Sider, Content, Footer } = Layout;
const onSearch = (value) => console.log(value);








export default function CustomIndex() {



  const { dispatch } = useAuthContext()
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { Search } = Input;



  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "SET_LOGED_OUT" })
        message.success('Signout Successfull')
      }).catch((error) => {

        message.error("Somthing Wrong")
      });
  }



  let year = new Date().getFullYear()






  return (
    < >
      <div  style={{overflow:"hidden"}}>
        
        <Layout >

          <Sider trigger={null} collapsible collapsed={collapsed} className='rounded-3 bg-white ps-2' style={{ position: 'fixed', left: 0, height: '100vh' }}>
            <div>


              <h4 className='  mt-4 text-dark d-flex text-center'>Menu</h4>


              <Search placeholder="input search text" className='py-2' onSearch={onSearch} enterButton />

              <h5 className='text-dark'>Tasks</h5>
              <Menu
                theme="light"
                mode="inline"
                defaultSelectedKeys={['1']}

                items={[
                  {
                    key: '/upcoming',
                    icon: <Link to='upcoming'><DoubleRightOutlined /></Link>,
                    label: "Upcoming",
                  },
                  {
                    key: '/today',
                    icon: <Link to='today'><OrderedListOutlined /></Link>,
                    label: 'Today',
                  },
                  {
                    key: '/calender',

                    icon: <Link to='calender'><CalendarOutlined /></Link>,
                    label: 'Calender',
                  },
                  {
                    key: '/todo',
                    icon: <Link to='/'><HighlightOutlined /></Link>,
                    label: 'TODO',
                  },
                ]}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>

              <h5 className='text-dark '>Lists</h5>
              <Menu

                theme="light"
                mode="inline"
                // defaultSelectedKeys={['1']}

                items={[
                  {
                    key: '/personal',
                    icon: <Link to={'personal'}><div className='bg-info ' style={{ width: "10px", height: "10px", borderRadius: "3px" }}></div></Link>,
                    label: 'Personal',
                  },
                  {
                    key: '/list',
                    // icon: <div className='bg-warning ' style={{ width: "10px", height: "10px", borderRadius: "3px" }}></div>,
                    icon: <Link to={'list'}><div className='bg-warning ' style={{ width: "10px", height: "10px", borderRadius: "3px" }}></div></Link>,
                    label: 'List 1',
                  },
                  {
                    key: '/adding',
                    icon: <Link to={'adding'}><PlusCircleOutlined /></Link>,
                    label: 'ADD NEW LIST',
                  },

                ]}
              />
              <br /><br /><br /><br /><br />


              <Menu
                className='bg-danger'
                mode="inline"
                items={[

                  {
                    key: '/adding',
                    icon: < LogoutOutlined  onClick={handleLogout}/>,
                    label: <span onClick={handleLogout}>Logout</span>,
                  }
                ]}
              />
            </div>
          </Sider>
          <Layout className='site-layout' style={{ marginLeft: collapsed ? 80 : 200 }}>
            <div className="d-flex  text-center my-2 ">
              <Button className=' text-info'
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{

                  width: 65,
                  height: 65,
                  

                }} />
                <div className='bg-light  shadow rounded-5 p-2 mx-5' style={{width:"70%"}}>

              <h3 className='mt-2 '>Todo Sticky</h3>
                </div>

            </div>
            <Content
              style={{
                padding: 24,
                minHeight: "80vh",
                overflowY: "hidden"

              }}
            >





              <Routes>
                <Route path='/' element={<Home />} />
                {/* <Route path='/todo' element={<Todos />} /> */}

                <Route path='/upcoming' element={<Upcoming />} />
                <Route path='/today' element={<Today />} />
                <Route path='/calender' element={<Calender />} />

              </Routes>


            </Content>
            <Footer className='text-center fs-8  py-1 bg-warning rounded-4 '> &copy; {year} All Right Reserved Created by Muhammed Ateeq</Footer>
          </Layout>
        </Layout>
      </div>
    </>
  );
}



