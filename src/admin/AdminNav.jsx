import React from 'react'; 
import { Container, Row } from 'reactstrap';

import useAuth from '../custom-hooks/useAuth';
import "../styles/admin-nav.css"

import { NavLink } from 'react-router-dom';


const admin_nav = [
  {
    display:'Dashboard',
    path:'/dashboard'
  },
  {
    display: "All-Products",
    path:'/dashboard/all-products'
  },
  {
    display: "Orders",
    path:'/dashboard/orders'
  },
  {
    display: "Dashboard",
    path:'/dashboard/users'
  },

]

const AdminNav = () => {


  const {currentUser} = useAuth()

  return(
  <> <header className='admin_header'>
    <div className="admin_nav-top">
      <Container>
        <div className='admin_nav-wrapper-top'>
          <div className="logo">
            <h2>Ecom Mart</h2>
          </div>

          <div className='search_box'>
              <input type="text" placeholder='Search....' />
              <span><i class="ri-search-line"></i></span>
              <div className="admin_nav-top-right">
                <span><i class="ri-notification-3-line"></i></span>
                <span><i class="ri-settings-3-line"></i></span>
                <img src={currentUser.photoURL} alt="" />
              </div>
          </div>
        </div>
      </Container>
    </div>

  </header>


    <section className="admin_menu">
    <Container>
      <Row>
        <div className='admin_navigation'>
          <ul className="admin_menu-list">
            {
              admin_nav.map((item, index)=>(
                <li className="admin_menu-item" key={index}> 
                  <NavLink to={item.path}>{item.display}</NavLink>
                </li>             
              ))
            }

          </ul>
        </div>
        
      </Row>
    </Container>
    </section>
    </>
  )
}

export default AdminNav