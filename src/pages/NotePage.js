import { useState, useEffect} from "react";
// import notes from "../assets/data";  
import { ReactComponent as ArrowLeft} from "../assets/arrow-left.svg";
import { useNavigate, useParams, Link } from "react-router-dom";

function NotePage() {

    let params = useParams();
    let noteId = params.id;
    const navigate = useNavigate();

    let [note, setNote] = useState(null);
    
    useEffect(() => {
        getNote();
    }, [noteId])
    // let note = notes.find(note => note.id == noteId);

    let getNote = async () => {
        if (noteId === 'new') return
        let response = await fetch(`http://127.0.0.1:5000/notes/${noteId}`);
        let data = await response.json();
        setNote(data);
    }

    let createNote = async () => {
        await fetch(`http://127.0.0.1:5000/notes/`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({...note, 'updated': new Date()})
        })
    }

    let updateNote = async () => {
        await fetch(`http://127.0.0.1:5000/notes/${noteId}`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({...note, 'updated': new Date()})
        })
    }

    let deleteNote = async () => {
        await fetch(`http://127.0.0.1:5000/notes/${noteId}`, {
            method:'DELETE'
        })
        navigate('/');
    }

    let handleSubmit = () => {
        if (noteId !== 'new' && !note.body){
            deleteNote();
        } else if (noteId !== 'new') {
            updateNote();
        } else if (noteId === 'new' && note !== null) {
            createNote();
        }

        updateNote();
        navigate('/');
    }

    return (
        <div className="note">
            <div className="note-header">
            <h3>
                <Link to="/">
                    <ArrowLeft onClick={handleSubmit}/>
                </Link>
                </h3>
                { noteId !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSubmit}>Done</button>
                )}
                
            </div>

            <textarea onChange={(e) => {setNote({...note, 'body': e.target.value})}} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage;