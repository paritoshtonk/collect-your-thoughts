import { VscEmptyWindow } from 'react-icons/vsc';
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import Note from "./Note";
import Search from "./Search";

const NotesList = ({ notes, selected, onSelectNote, onAddButtonClick }) => {

    const [searchText, setSearchText] = useState('');

    const searchTextChange = (text) => {
        setSearchText(text);
    }

    const getListContent = () => {
        return <>
            {
                notes.length > 0 ?
                    notes.map((note, index) => {
                        if (note.title.includes(searchText) || note.body.includes(searchText))
                            return (
                                <div key={note.id}
                                    onClick={() => onSelectNote(index)}>
                                    <Note id={note.id}
                                        title={note.title}
                                        body={note.body}
                                        isSelected={index === selected}
                                    />
                                </div>
                            )

                        return (
                            <div key={note.id}
                            ></div>
                        )
                    })
                    : <div className="empty-notes-list">
                        <VscEmptyWindow className="empty-notes-list-icon" size="5em" />
                        <div className="empty-notes-list-text">Click on add button to add a note</div>
                    </div>
            }
            {notes.length > 0 ? <div style={{ "height": "70px" }}></div> : null}
        </>
    }

    return (
        <div className='note-list'>
            <Search searchTextChange={searchTextChange} />
            <div className="note-list-container">
                {
                    getListContent()
                }
            </div>
            <div>
                <MdAdd className="FAB add-note-button" onClick={onAddButtonClick} size="3em" />
            </div>
        </div >
    )
}

export default NotesList;