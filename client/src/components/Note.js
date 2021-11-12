
const Note=({title,id,body,isSelected})=>{
    return (
        <div className={'note '+(isSelected?"selected":'')} >
            <h3>{title}</h3>
            <span>{body}</span>
            <div></div>
        </div>
    );
}

export default Note;