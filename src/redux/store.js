import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice";

export const store = configureStore({
    reducer: {
        //en el objeto reducer yo tengo que ir creando los reducers de cada "clase" que quiero utilizar
        pokemon: pokemonReducer
    },
});