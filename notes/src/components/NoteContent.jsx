import React from 'react'

const NoteContent = ({ note }) => {
  return (
    <div>
        <li>{note.content}</li>
    </div>
  )
}

export default NoteContent