import React from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const NoteEdit = ({ note, onSaveClick, isNew, onDeleteClick }) => {
    const [noteTitle, setNoteTitle] = React.useState("");
    const [noteId, setNoteId] = React.useState(-1);
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
    const onTitleChange = (event) => {
        setNoteTitle(event.target.value);
    }
    React.useEffect(() => {
        if (note === null) {
            if (noteId !== -1) {
                setNoteId(-1);
                setNoteTitle('');
                setEditorState(EditorState.createEmpty());
            }
        } else if (note !== null && noteId !== note.id) {
            setNoteId(note.id);
            setNoteTitle(note.title);
            setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(note.html))));
        }
    }, [note, noteId])
    const newLabel = () => {
        if (isNew)
            return <div className="label">new</div>;
    }

    return note == null ? <div className='note-edit none-edit'>
        <h3>Select a Note or Create a new one.</h3>
    </div> : (
        <div className='note-edit'>
            <div className="panel">
                <div className="left-panel">
                    {newLabel()}

                </div>
                <div className="right-panel">
                    <div className='buttons'>
                        {!isNew ?
                            <button
                                onClick={() => {
                                    onDeleteClick();
                                }}
                                className='button delete-button'>
                                Delete
                            </button> : null}
                        <button
                            onClick={() => {
                                let html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
                                var newNote = { ...note };
                                newNote.title = noteTitle;
                                newNote.html = html;
                                newNote.body = editorState.getCurrentContent().getPlainText();;
                                onSaveClick(newNote, isNew);
                            }}
                            className='button save-button'>
                            Save
                        </button>
                    </div>
                </div>
            </div>
            <input
                className='edit-title'
                placeholder='Title'
                value={noteTitle}
                onChange={onTitleChange}
            />
            <div className='note-editor'>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={setEditorState} />
            </div>
        </div>
    );
}

export default NoteEdit;