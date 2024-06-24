//https://contentlayer.dev/
// "use client"
// import { MDXEditor, MDXEditorMethods } from "@mdxeditor/editor"
// import { useRef } from "react"

// create a ref to the editor component
// const MarkdownPage = () => {
//   const ref = useRef<MDXEditorMethods>(null)
//   return (
//     <>
//       <button onClick={() => ref.current?.insertMarkdown('new markdown to insert')}>Insert new markdown</button>
//       <button onClick={() => console.log(ref.current?.getMarkdown())}>Get markdown</button>
//       <MDXEditor ref={ref} markdown="hello world" onChange={console.log} />
//     </>
//   )
// }

// export default MarkdownPage;

// import { MDXEditor, headingsPlugin, listsPlugin, quotePlugin, thematicBreakPlugin } from '@mdxeditor/editor'

// function App() {
//   return <MDXEditor markdown="# Hello world" plugins={[headingsPlugin(), listsPlugin(), quotePlugin(), thematicBreakPlugin()]} />
// }

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { sad } from '@/data/journal-prompts/sad'
const EditorComp = dynamic(() => import('@/components/MDXEditor'), {
  ssr: false,
})

// const markdown = `
// Hello **world**!
// `

const markdown = sad

export default function Home() {
  return (
    <>
      <p>
        This is a bare-bones unstyled MDX editor without any plugins and no
        toolbar. Check the EditorComponent.tsx file for the code.
      </p>
      <p>
        To enable more features, add the respective plugins to your instance -
        see{' '}
        <a
          className="text-blue-600"
          href="https://mdxeditor.dev/editor/docs/getting-started"
        >
          the docs
        </a>{' '}
        for more details.
      </p>
      <br />
      <div style={{ border: '1px solid black' }}>
        <Suspense fallback={null}>
          <EditorComp markdown={markdown} />
        </Suspense>
      </div>
    </>
  )
}
