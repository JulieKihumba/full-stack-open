import React from 'react'
import NoteContent from './NoteContent'

const Notes = ({ notes }) => {
  return (
    <div>
        <ul> {notes.map((note, index) => <NoteContent key={index} note={note} />)}</ul>
       
    </div>
  )
}

export default Notes