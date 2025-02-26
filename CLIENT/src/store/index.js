import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slices/user";
import menuReducer from "./Slices/menu"; // Ajoute d'autres reducers si nécessaire

const store = configureStore({
    reducer: {
        user: userReducer, // Clé "user" pour accéder à cet état
        menu: menuReducer, // Clé "menu" pour accéder à cet état
    },
});

export default store;