import axios from 'axios'

export const carouselService = {
    query,
    getById,
    remove,
    save,
    getEmptyCarousel
}

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/carousel/'
    : '//localhost:3030/api/carousel/'

async function query() {
    try {
        const res = await axios.get(BASE_URL)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

async function getById(contentId) {
    try {
        const res = await axios.get(BASE_URL + contentId)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

async function remove(contentId) {
    try {
        const res = await axios.delete(BASE_URL + contentId)
        return res.data
    } catch (err) {
        console.log(err)
    }
}

async function save(content) {
    if (content._id) {
        try {
            const res = await axios.put(BASE_URL + content._id, content)
            return res.data
        } catch (err) {
            console.log(err)
        }
    } else {
        try {
            const res = await axios.post(BASE_URL, content)
            return res.data
        } catch (err) {
            console.log(err)
        }
    }
}

function getEmptyCarousel() {
    return {
        _id: '',
        title: {
            "en": '',
            "he": ''
        },
        img: '',
    }
}