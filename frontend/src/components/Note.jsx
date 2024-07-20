import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Note() {
    const {id} = useParams();
    const [Note,setNotes] = useState([])
    useEffect(()=>{
          const fetchnote = async ()=>{
             try{
                 const response = await fetch(`http://localhost:3000/notes/${id}`);
                 const data = await response.json();
                 setNotes(data);
             }catch(err){
                console.log(err);
             }
          }
          fetchnote();
    },[id])
  return (
<>
  <div className="max-w-2xl m-5 mx-auto p-6 bg-gradient-to-r from-blue-100 via-blue-50 to-white shadow-xl rounded-xl border border-gray-200 mb-8">
    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{Note.title}</h1>
    <h2 className="text-sm text-blue-600 font-semibold mb-4">Created by {Note.userId}</h2>
    <p className="text-lg text-gray-700 leading-relaxed">{Note.desc}</p>
  </div>
</>







  )
}

export default Note