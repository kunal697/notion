import React, { useState ,useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../TokenContext';


function CreateAccount() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { token, login } = useContext(TokenContext); // Use TokenContext
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
        const response = await fetch('http://localhost:3000/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email,password}),
        });
  
        const data = await response.json();
        if (data.token) {
          login(data.token);
          
        } else {
          console.log('Login failed');
        }
        navigate('/notes');
      } catch (err) {
        console.log('Error:', err);
      }
  };

  return (
    <div className='flex justify-center items-center min-h-screen '>
      <form onSubmit={handleSubmit} className='w-full p-10 rounded-xl max-w-sm border-2 border-gray-400'>
        <h1 className='text-2xl font-bold mb-6'>Create Account</h1>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2'>Username</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full p-2 border rounded border-gray-400'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium mb-2'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-2 border rounded border-gray-400'
            required
          />
        </div>
        <div className='mb-6'>
          <label className='block text-sm font-medium mb-2'>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full p-2 border rounded border-gray-400'
            required
          />
        </div>
        <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded'>Create Account</button>
        <div className='m-2'>
            
                <Link to="/login" className='text-blue-950'>Already have account? Login</Link>
        </div>
      </form>
    </div>
  );
}

export default CreateAccount;
