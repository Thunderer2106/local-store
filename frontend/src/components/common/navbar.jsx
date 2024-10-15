import React from 'react';
import { FaSearch, FaShoppingCart,FaSignOutAlt } from 'react-icons/fa';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice';




const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const { user } = useSelector((state) => state.auth)
  
  
    useEffect(() => {
     
  
      if (!user) {
        navigate('/')
      }
  
  
  
      return () => {
        dispatch(reset())
      }
    }, [user, navigate, dispatch])
  
    
  
    const logoutHandler = () => {
      dispatch(logout())
    };
  
    

    return (
        <nav className="p-4 flex items-center justify-between">
        <a href='/home'>
            <div className="flex items-center" >
                <img
                    src="/images/localstore.png"
                    alt="Logo"
                    className="h-7"
                />
            </div>
            </a>

            {/* Navigation Links */}
            <ul className="flex space-x-7">
                <li className='hover:scale-105 transition-transform duration-[400ms] '>
                    <a href="/chat" className="text-black outfit-600 ">
                        Chat
                    </a>
                </li>
                <li className='hover:scale-105 transition-transform duration-[400ms] '>
                    <a href="#" className="text-black outfit-600 ">
                        Orders
                    </a>
                </li>
                <li className='hover:scale-105 transition-transform duration-[400ms] '>
                    <a href="/cart" className="text-black outfit-600  ">
                        Cart
                    </a>
                </li>
               
                <li className='transition-transform duration-[400ms]  hover:scale-[1.10] my-auto'>
                    <a href="/add">
                    <FaShoppingCart />
                    </a>
                </li>
                <li className='transition-transform duration-[400ms]  hover:scale-[1.10] my-auto'>
                    <button onClick={logoutHandler}>
                    <FaSignOutAlt />
                    </button>
                </li>
                
            </ul>
        </nav>
    );
};

export default Navbar;
