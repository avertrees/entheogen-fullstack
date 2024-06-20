import { data } from '@/data/feelings/data'
let emotions = []

export const getEmotions = () => {
  // let emotions = []
  return data.map((chartData) => {

    //topLevelEmotions // Primary Emotions
    console.log("emotion is: ", chartData.children)
    chartData.children.map((primaryEmotion) => {
      emotions.push(primaryEmotion.name.toLowerCase())
      primaryEmotion.children.map((secondaryEmotion) => {
        // console.log(secondaryEmotion)
        emotions.push(secondaryEmotion.name.toLowerCase())
        secondaryEmotion.children.map((tertiaryEmotion) => {
          console.log(tertiaryEmotion)
          emotions.push(tertiaryEmotion.name.toLowerCase())
        })

      })
      console.log(emotions)
    })
  })
}
export const isEmotion = (name) => {
  // return name in data
  if (emotions.length > 0) {
    return emotions.includes(name)
  } else {
    getEmotions()
    return emotions.includes(name)
  }
}