import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateNote() {
  const [title, setTitle] = useState('');
  const [desc, setBody] = useState('');
  const textareaRef = useRef(null);
  const navigate = useNavigate(); // Import useNavigate hook

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; 
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; 
    }
  }, [desc,title]);

  const handleChange = (event) => {
    setBody(event.target.value);
  };

  const handletitleChange = (event) =>{
    setTitle(event.target.value);
  };

  const SaveNote = async () => {
    try {
      const response = await fetch('http://localhost:3000/create', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ title, desc }), 
      });
      if (response.ok) {
        setTitle('');
        setBody('');
        navigate('/notes');
      } else {
        alert('Failed to save note. Please try again.');
      }
    } catch (err) {
      console.error('Error saving note:', err);
      alert('An error occurred. Please try again later.');
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <div className='flex items-center justify-between mb-4'>
        <h2 className="text-2xl font-bold text-gray-900">Create a Note</h2>
        <button onClick={SaveNote} className='bg-black text-white py-2 px-4 rounded-xl shadow-md hover:bg-gray-800 focus:outline-none'>
          Save
        </button>
      </div>
      
      <div className="mb-4">
        <input 
          type='text' 
          placeholder='Title' 
          onChange={handletitleChange}
          value={title}
          className='w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500'
        />
      </div>
      <div>
        <textarea 
          ref={textareaRef}
          value={desc}
          onChange={handleChange}
          placeholder='Body' 
          className='w-full max-h-screen min-h-96 p-3 border-2 border-gray-300 rounded-lg resize-none overflow-hidden focus:outline-none focus:border-blue-500'
        />
      </div>
    </div>
  );
}

export default CreateNote;
