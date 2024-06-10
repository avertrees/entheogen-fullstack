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