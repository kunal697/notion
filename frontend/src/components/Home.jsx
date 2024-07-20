import React, { useState, useEffect ,useContext} from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { CiStar } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { TokenContext } from '../TokenContext';


function Home() {
  const [notes, setNotes] = useState([]);
  // const [token, setToken] = useState(localStorage.getItem('token'));
  const { user,token } = useContext(TokenContext);





  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:3000/notes', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setNotes(data);
      } catch (err) {
        console.error('Failed to fetch notes:', err);
      }
    };

    fetchNotes();
  }, [deleteNote,user,token]);

  async function deleteNote(id){
      console.log(id);
       try{ 
        const response = await fetch(`http://localhost:3000/notes/${id}/delete`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}` // If authentication is needed
          }
        });
          
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        console.log('Note deleted successfully');

       }catch(err){
        console.log(err);
       }
  }

  return (
    <>
      <div className='flex justify-center'>
        <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 p-4'>
          {notes.map((note, index) => (
            <li key={index} className="lg:w-64 w-72 h-40 p-4 rounded-xl border-2 bg-white shadow-lg flex flex-col justify-between">
            <Link to={`/notes/${note._id}`}  className="flex items-start justify-between">
                <div>
                  <h1 className="text-xl font-bold">{note.title}</h1>
                  <p className="text-gray-700">{note.desc}</p>
                </div>
                <button className='text-gray-700'>
                  <CiStar />
                </button>
              </Link>
               
              <div className="flex justify-end space-x-4">
                <button onClick={()=>{deleteNote(note._id)}} className="text-red-600 hover:text-red-800">
                 <FaTrashAlt />
                </button>
                <button className="text-blue-600 hover:text-blue-800">
                <FaEdit />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button className="fixed bottom-12 right-12 bg-black text-white py-2 px-4 rounded-full shadow-lg flex items-center space-x-2 hover:bg-gray-800">
        <Link to={"/create"}>ADD</Link>
      </button>
    </>
  );
}

export default Home;
