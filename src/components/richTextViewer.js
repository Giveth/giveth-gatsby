import React from 'react'

const ReactQuill = React.lazy(() => import('react-quill'))

function RichTextViewer({ content }) {
  const isSSR = typeof window === 'undefined'

  return (
    <div>
      {!isSSR && (
        <React.Suspense fallback={<p> cy </p>}>
          <ReactQuill
            style={{ fontFamily: `Red Hat Text, sans serif` }}
            value={content}
            readOnly
            theme={'bubble'}
          />
        </React.Suspense>
      )}
    </div>
    // <div
    //   style={{ fontFamily: `Red Hat Text, sans serif` }}
    //   dangerouslySetInnerHTML={{ __html: content }}
    // ></div>
  )
}

export default RichTextViewer
