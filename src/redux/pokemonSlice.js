//los slices son los archivos que van a establecer el estado inicial de cada una de mis clases, por ejemplo, en este, utilizaremos el estado inicial de los pokemon que obtenemos de la API. 
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    id: 0,
    image: "",
    shinyImage: "",
    type1: "",
    type2: "",
    isShiny: false,
}

export const pokemonSlice = createSlice({
    name: "pokemon",
    initialState,
    reducers: {
        setPokemon: (state, action) => {
            state.name = action.payload.name
            state.id = action.payload.id
            state.image = action.payload.image
            state.shinyImage = action.payload.imageShiny
            state.type1 = action.payload.type1
            state.type2 = action.payload.type2
            state.isShiny = action.payload.isShiny
        }
    }
})

export const { setPokemon } = pokemonSlice.actions
export default pokemonSlice.reducer