const createURL = (path) => {
  return window.location.origin + path
}

export const updateEntry = async (id, content) => {
  const res = await fetch(
    new Request(createURL(`/api/entry/${id}`), {
      method: 'PATCH',
      body: JSON.stringify({content})
    })
  )

  if (res.ok){
    // try 
    // catch  error handling if response is ok
    const data = await res.json()
    return data.data
  } else {
    console.log("res in error is: ", res)
    throw new Error('Something went wrong on API server! Method: updateEntry() ')
  }

  //... when error
  // return {error: true, code: 23232, messaeForUI: 'asdasda'}
}

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createURL('/api/entry'), {
      method: 'POST',
      body: JSON.stringify({ content: 'new entry' }),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    console.log("res in error is: ", res)
    throw new Error('Something went wrong on API server! Method: createNewEntry() ')
  }
}

export const askQuestion = async (question) => {
  const res = await fetch(
    new Request(createURL('/api/question'), {
      method: 'POST',
      body: JSON.stringify({ question }),
    })
  )

  if (res.ok) {
    return res.json()
  } else {
    console.log("res in error is: ", res)
    throw new Error('Something went wrong on API server! Method: askQuestion() ')
  }
}