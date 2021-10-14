import { useState } from "react";
import { nanoid } from 'nanoid';
import NoteEdit from "./components/NoteEdit";
import NotesList from "./components/NotesList";
import SideBar from "./components/SideBar";


const App = () => {
  const [emptyNote, setEmptyNote] = useState({});
  const [isNewNote, setIsNewNote] = useState(false);
  const [data, setData] = useState([
    { name: "Personal", notes: [] },
    { name: "Work", notes: [] },
    { name: "Misc", notes: [] },
  ]);
  const [selectedC, setSelectedC] = useState(0);
  const [selectedN, setSelectedN] = useState(-1);
  const setSelectedCategory = (index) => {
    if (selectedC !== index) {
      setSelectedC(index)
      setSelectedN(-1);
    }
  }

  const onSaveClick = (isNewNote, isNew) => {
    const newData = [...data];
    if (isNew) {
      newData[selectedC].notes.push(isNewNote);
      setSelectedN(newData[selectedC].notes.length - 1);
      setIsNewNote(false);
    }
    else
      newData[selectedC].notes[selectedN] = isNewNote;
    setData(newData);

  }

  const onDeleteClick = () => {
    const newData = JSON.parse(JSON.stringify(data));
    newData[selectedC].notes = data[selectedC].notes.filter((value, index) => index != selectedN);
    setData(newData);
    setSelectedN(-1);
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