import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../TokenContext';

function Header() {
    const { user, logout } = useContext(TokenContext);
    const navigate = useNavigate(); // Call useNavigate at the top level

    const handleLogout = () => {
      logout(); 
        navigate('/login'); 
         
    };

    return (
        <div className='bg-cyan-300 w-full flex items-center justify-between p-4'>
            <h1 className='text-2xl font-bold'>
                <Link to="/">Notewrt</Link>
            </h1>
            <div className='flex items-center'>
                {user ? (
                    <>
                        <span className='mr-4'>Welcome, {user.username}!</span>
                        <button 
                            onClick={handleLogout}
                            className='bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none'
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <Link 
                        to="/login" 
                        className='bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none'
                    >
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Header;
