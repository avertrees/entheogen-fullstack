'use client'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

//feelings
import { isEmotion } from '@/utils/feelings'
import { useSearchParams } from 'next/navigation'

//import journal prompts
import { acceptance } from '@/data/journal-prompts/acceptance'
import { anger } from '@/data/journal-prompts/anger'
import { apathy } from '@/data/journal-prompts/apathy'
import { courage } from '@/data/journal-prompts/courage'
import { fear } from '@/data/journal-prompts/fear'
import { grief } from '@/data/journal-prompts/grief'
import { guilt } from '@/data/journal-prompts/guilt'
import { impureDesire } from '@/data/journal-prompts/impure_desire'
import { numbness } from '@/data/journal-prompts/numbness'
import { pride } from '@/data/journal-prompts/pride'
import { sad } from '@/data/journal-prompts/sad'
import { shame } from '@/data/journal-prompts/shame'
import { unworthiness } from '@/data/journal-prompts/unworthiness'

const emotionsHash = {
  acceptance: acceptance,
  anger: anger,
  apathy: apathy,
  courage: courage,
  fear: fear,
  grief: grief,
  guilt: guilt,
  impureDesire: impureDesire,
  numbness: numbness,
  pride: pride,
  sad: sad,
  shame: shame,
  unworthiness: unworthiness,
}

// const EditorComp = dynamic(() => import('@/components/MDXEditor'), {
//   ssr: false,
// })

// export default function Home() {
//   const searchParams = useSearchParams()
//   const emotion = searchParams.get('emotion')
//   console.log('emotion: ', emotion)
//   const isThisAnEmotion = isEmotion(emotion)
//   console.log('isThisAnEmotion?: ', isThisAnEmotion)
//   const markdown = isThisAnEmotion ? emotionsHash[emotion] : sad

//   return (
//     <>
//       <p>
//         This is a bare-bones unstyled MDX editor without any plugins and no
//         toolbar. Check the EditorComponent.tsx file for the code.
//       </p>
//       <p>
//         To enable more features, add the respective plugins to your instance -
//         see{' '}
//         <a
//           className="text-blue-600"
//           href="https://mdxeditor.dev/editor/docs/getting-started"
//         >
//           the docs
//         </a>{' '}
//         for more details.
//       </p>
//       <br />
//       <div style={{ border: '1px solid black' }}>
//         <Suspense fallback={null}>
//           <EditorComp markdown={markdown} />
//         </Suspense>
//       </div>
//     </>
//   )
// }

//https://contentlayer.dev/
// "use client"
// import { MDXEditor, MDXEditorMethods } from '@mdxeditor/editor'
// import { useRef } from 'react'

// // create a ref to the editor component
// const MarkdownPage = () => {
//   const searchParams = useSearchParams()
//   const emotion = searchParams.get('emotion')
//   console.log('emotion: ', emotion)
//   const isThisAnEmotion = isEmotion(emotion)
//   console.log('isThisAnEmotion?: ', isThisAnEmotion)
//   const markdown = isThisAnEmotion ? emotionsHash[emotion] : sad
//   const ref = useRef<MDXEditorMethods>(null)
//   return (
//     <>
//       <button
//         onClick={() => ref.current?.insertMarkdown('new markdown to insert')}
//       >
//         Insert new markdown
//       </button>
//       <button onClick={() => console.log(ref.current?.getMarkdown())}>
//         Get markdown
//       </button>
//       <MDXEditor ref={ref} markdown={markdown} onChange={console.log} />
//     </>
//   )
// }

// export default MarkdownPage

import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  markdownShortcutPlugin,
  type MDXEditorMethods,
  type MDXEditorProps,
} from '@mdxeditor/editor'

import '@mdxeditor/editor/style.css'

const App = () => {
  const searchParams = useSearchParams()
  const emotion = searchParams.get('emotion')
  console.log('emotion: ', emotion)
  const isThisAnEmotion = isEmotion(emotion)
  console.log('isThisAnEmotion?: ', isThisAnEmotion)
  const markdown = isThisAnEmotion ? emotionsHash[emotion] : sad
  return (
    <MDXEditor
      markdown={markdown}
      plugins={[
        toolbarPlugin({
          toolbarContents: () => (
            <>
              {' '}
              <UndoRedo />
              <BoldItalicUnderlineToggles />
            </>
          ),
        }),
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        markdownShortcutPlugin(),
      ]}
    />
  )
}

export default App
