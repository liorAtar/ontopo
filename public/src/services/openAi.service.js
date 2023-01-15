import axios from 'axios'

export const openAiService = {
  aiQuery
};

const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api/'
  : '//localhost:3030/api/'

async function aiQuery({question}) {
  try {
    console.log('entered item', question)
    const response = await axios.get(BASE_URL + 'openAi', {
      params: {
        txt: question, 
      }
    })
    console.log('response', response)
    return response
  } catch (err) {
    console.log('err', err)
  }
}