//https://uiwjs.github.io/react-md-editor/
// https://github.com/rehypejs/rehype-sanitize

//https://mdxeditor.dev/
//https://github.com/mdx-editor/editor

'use client'

import {
  MDXEditor,
  MDXEditorMethods,
  headingsPlugin,
  linkPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  quotePlugin,
  listsPlugin,
} from '@mdxeditor/editor'
import { FC } from 'react'
import '@mdxeditor/editor/style.css'

//feelings
import { isEmotion } from '@/utils/feelings'
import { useSearchParams } from 'next/navigation'

interface EditorProps {
  markdown: string
  editorRef?: React.MutableRefObject<MDXEditorMethods | null>
}

/**
 * Extend this Component further with the necessary plugins or props you need.
 * proxying the ref is necessary. Next.js dynamically imported components don't support refs.
 */
const MDEditor: FC<EditorProps> = ({ markdown, editorRef }) => {
  //feelings
  const searchParams = useSearchParams()
  const emotion = searchParams.get('emotion')
  console.log('emotion: ', emotion)
  const isThisAnEmotion = isEmotion(emotion)
  console.log('isThisAnEmotion?: ', isThisAnEmotion)

  //mdx
  return (
    <MDXEditor
      onChange={(e) => console.log(e)}
      ref={editorRef}
      markdown={markdown}
      plugins={[
        headingsPlugin(),
        linkPlugin(),
        quotePlugin(),
        listsPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {' '}
              <UndoRedo />
              <BoldItalicUnderlineToggles />
            </>
          ),
        }),
      ]}
    />
  )
}

export default MDEditor
