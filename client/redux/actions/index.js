// import actions types
// import { GET_ALL_BOOKS } from './actionTypes'
import axios from "axios"
import { GET_DETAILS } from "./actionTypes"
// const axios = require('axios');

// export const getAllBooks = () => {
//     return async function (dispatch) {
//         dispatch({
//             type: LOADING
//         })
//         let books = await axios.get('/books')
//         return dispatch({ type: GET_ALL_BOOKS, payload: books.data })
//     }
// }

// let objetofalso = {
//     id: 1000,
//     title: "Aguante messi",
//     authors: ["el mati"],
//     description: "soy el matiii",
//     rating: 5,
//     image: "http://books.google.com/books/content?id=TV05BgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
//     preview: null
// }

export const getDetails = (id) => {
    return async function (dispatch) {       
        try {

            let det = await axios.get(`/books/${id}`)
            console.log(det, "det")
            return dispatch({
                type: GET_DETAILS,
                payload: det.data
        })
        } catch (error) {
            alert(error)
        }
    }
}
