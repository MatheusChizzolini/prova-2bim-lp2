import { configureStore } from "@reduxjs/toolkit";
import usuarioReducer from "./reducer-usuario";

const store = configureStore({
    reducer: {
        'usuario': usuarioReducer
    }
});

export default store;
