import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: ['monospace'] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' }
    ],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video'
]

function Quill(props) {
  const [value, setValue] = useState('')
  // console.log({ value })
  return (
    <ReactQuill
      modules={modules}
      formats={formats}
      theme='snow'
      ref={props?.ref}
      id={props?.id}
      name={props?.name}
      value={props?.value}
      defaultValue={props?.defaultValue}
      onChange={props?.onChange}
      style={props?.style}
    />
  )
}

export default Quill
