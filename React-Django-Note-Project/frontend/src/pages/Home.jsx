import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";  
import "../styles/Home.css";
import LoadingIndicator from "../components/LoadingIndicator";

function Home() {

    const [Notes, setNotes] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(() => {
      getNote()
    }, [])

    const getNote = () => {
      api.get('/api/notes/')
      .then((res) => res.data)
      .then((data) => {setNotes(data); console.log(data)})
      .catch((error) => alert(error)) 
    }

    const deleteNote = (id) => {
      api.delete(`/api/notes/delete/${id}/`).then((res) => {
        if (res.status === 204) alert("Note deleted successfully")
          else alert("Note not deleted")
        getNote()
      }).catch ((error) => alert(error))
      
    };

    const createNote = (e) => {
      e.preventDefault()
      api.post('/api/notes/', {title, content}).then((res) => {
        if (res.status === 201) alert("Note created successfully")
          else alert("Note not created")
        getNote()
      }).catch((error) => alert(error))
      
    }

    return <div>
      <div>
        <h2>Notes</h2>
        {Notes.map((note) =>(<Note note={note} onDelete={deleteNote} key={note.id} />))}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title:</label>
        <br />
        <input type="text"
        id="title"
        name="title"
        required
        onChange={(e) => setTitle(e.target.value)}
        value={title} />


        <label htmlFor="content">Content:</label>
        <br />
        <textarea name="content"
         id="content"
         required
         value={content}
         onChange={(e) => setContent(e.target.value)}>
         </textarea>
         <br />
         
         <input type="submit" value="submit"></input>
        
      </form>
    </div>
}

export default Home;