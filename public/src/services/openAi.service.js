import axios from 'axios'

export const openAiService = {
  aiQuery
};

const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/api/'
  : '//localhost:3030/api/'

async function aiQuery(txt) {
  try {
    console.log('entered item', txt)
    const response = await axios.get(BASE_URL + 'openAi', {
      params: {
        txt: txt
      }
    })
    console.log('response', response)
    return response
  } catch (err) {
    console.log('err', err)
  }
}