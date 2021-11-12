import React from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function NoteEditor() {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  return (
    <div className='note-editor'>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState} />
    </div>
  );
}

export default NoteEditor;