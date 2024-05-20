// LLM = basic level Large Language Model
import { OpenAI } from '@langchain/openai'
import { StructuredOutputParser,  OutputFixingParser, } from 'langchain/output_parsers'
import { PromptTemplate } from '@langchain/core/prompts'
import { Document } from 'langchain/document'
import { loadQARefineChain } from 'langchain/chains'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
import {z} from 'zod'


//     mood: z.string().describe(`the emotion of the person who wrote the journal entry according to the primary, secondary, and tertiary emotions included in Plutchik's Wheel of Emotions. If the emotion is mixed, please list the combination of emotions.`),

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z.string().describe(`the emotion of the person who wrote the journal entry according to the primary, secondary, and tertiary emotions included in Plutchik's Wheel of Emotions. If the emotion is mixed, please list the combination of emotions.`),
    summary:z.string().describe('quick summary of the entire entry.'),
    subject:z.string().describe('the subject of the journal entry.'), 
    color:z.string().describe('a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness.'),
    negative:z.boolean().describe('is the journal entry negative? (i.e. does it contain negative emotions?).'),
    sentimentScore: z.number().describe('sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive.'),
  })
)

const getPrompt = async (content) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template:
      'Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{format_instructions}\n{entry}',
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })

  const input = await prompt.format(
    {entry: content}
  )

  // console.log("input is: ", input)
  return input
}
export const analyze = async (content) => {
  const input = await getPrompt(content)
  const model = new  OpenAI({temperature: 0, modelName:"gpt-3.5-turbo"})
  const result = await model.invoke(input)
  console.log("result is:", result)

  try {
    return parser.parse(result)
  }
  catch (e) {
    console.log("an error occured: ", e)
  }
  return result
}

export const qa = async (question, entry) => {
  const docs = entry.map((entry) => (
    new Document({
      pageContent: entry.content,
      metadata: { source: entry.id, date: entry.createdAt },
    })
  ))
  const model = new OpenAI({temperature: 0, modelName:"gpt-3.5-turbo"})
  const chain = loadQARefineChain(model)
  const embeddings = new OpenAIEmbeddings()
  const store = await MemoryVectorStore.fromDocuments(docs,embeddings)
  const relevantDocs = await store.similaritySearch(question)
  const res = await chain.invoke({
    input_documents: relevantDocs,
    question,
  })

  return res.output_text
}