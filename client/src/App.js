import { useEffect, useState } from "react";
import { nanoid } from 'nanoid';
import NoteEdit from "./components/NoteEdit";
import NotesList from "./components/NotesList";
import SideBar from "./components/SideBar";


const App = () => {
  const [emptyNote, setEmptyNote] = useState({});
  const [isNewNote, setIsNewNote] = useState(false);
  const [data, setData] = useState([
    { name: "Personal", notes: [] }
  ]);
  const [selectedC, setSelectedC] = useState(0);
  const [selectedN, setSelectedN] = useState(-1);
  const setSelectedCategory = (index) => {
    if (selectedC !== index) {
      setSelectedC(index)
      setSelectedN(-1);
    }
  }

  const onSaveClick = (newNote, isNew) => {
    const newData = [...data];
    if (isNew)
      fetch('/notes/', {
        method: "POST",
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newNote.title, body: newNote.body, html: newNote.html, category_id: data[selectedC].id })
      }).then(response => response.json())
        .then(res => {
          newData[selectedC].notes.push(newNote);
          setSelectedN(newData[selectedC].notes.length - 1);
          setIsNewNote(false);
          setData(newData);
        });
    else
      fetch('/notes/' + newNote.id, {
        method: "PUT",
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: newNote.title, body: newNote.body, html: newNote.html, id: newNote.id })
      }).then(response => response.json())
        .then(res => {
          newData[selectedC].notes[selectedN] = newNote;
          setData(newData);
        });


  }

  const onDeleteClick = () => {
    const id = data[selectedC].notes[selectedN].id;
    fetch('/notes/' + id, {
      method: 'DELETE',
      cache: 'no-cache'
    }).then(response => response.json())
      .then(res => {
        if (res.status === 'ok') {
          const newData = JSON.parse(JSON.stringify(data));
          newData[selectedC].notes = data[selectedC].notes.filter((value, index) => index !== selectedN);
          setSelectedN(-1);
          setData(newData);
        }
      });
  }

  const onNoteClick = (index) => {
    if (index !== selectedN)
      setSelectedN(index);
    setIsNewNote(false);
  }

  const OnAddNoteClick = () => {
    setSelectedN(-1);
    setIsNewNote(true);
    setEmptyNote({
      id: nanoid(),
      title: "Untitled",
      body: "",
      html: '<div></div>'
    })
  }

  useEffect(() => {
    fetch('/notes', {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(res => {
        setData(res.data);
        setSelectedCategory(0);
      });
  }, []);

  const editNote = isNewNote ? emptyNote : (selectedN >= 0 ? data[selectedC].notes[selectedN] : null);
  return (
    <div className='container'>
      <div className='notes-app'>
        <SideBar categories={data} selected={selectedC} onSelectCategory={setSelectedCategory} />
        <NotesList notes={data[selectedC].notes} selected={selectedN} onSelectNote={onNoteClick} onAddButtonClick={OnAddNoteClick} />
        <NoteEdit note={editNote} onSaveClick={onSaveClick} onDeleteClick={onDeleteClick} isNew={isNewNote} />
      </div>
    </div>
  )
}

export default App;