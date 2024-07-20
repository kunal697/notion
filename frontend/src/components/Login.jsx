import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../TokenContext'; // Adjust the import path if necessary

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { token, login } = useContext(TokenContext); // Use TokenContext
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.token) {
        login(data.token);
        navigate('/notes');
        
      } else {
        console.log('Login failed');
      }
      
    } catch (err) {
      console.log('Error:', err);
    }
  };

  return (
    
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-lg shadow-md w-full max-w-sm border-2 border-gray-400'
      >
        <h1 className='text-2xl font-bold mb-6'>Login</h1>
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2' htmlFor='username'>
            Username
          </label>
          <input
            type='text'
            id='username'
            className='w-full p-2 border border-gray-400 rounded'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className='mb-6'>
          <label className='block text-gray-700 mb-2' htmlFor='password'>
            Password
          </label>
          <input
            type='password'
            id='password'
            className='w-full p-2 border border-gray-400  rounded'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type='submit'
          className='w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
        >
          Login
        </button>
            <div className='m-2'>
                <Link to="/create-account" className='text-blue-950'>Don't have account? Create account</Link>

                </div>
          </form>
             
     
    </div>
  );
}

export default Login;
