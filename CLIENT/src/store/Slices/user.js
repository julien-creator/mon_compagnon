import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    isLogged: false,
    msg: "",
    role: "user",
    authError: null,
    isLoading: false, // Pour suivre les chargements asynchrones
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Action pour connecter un utilisateur
        login(state, action) {
            const { user, isLogged } = action.payload || {};
            if (user) {
                state.username = user.username || "";
                state.role = user.role || "user";
                state.isLogged = isLogged || false;
                state.authError = null;
            } else {
                state.authError = "Données utilisateur non valides.";
            }
        },

        // Action pour gérer un échec de connexion
        loginFailed(state, action) {
            state.authError = action.payload?.error || "Une erreur inconnue est survenue.";
            state.isLogged = false;
        },

        // Action pour déconnecter un utilisateur
        logout(state) {
            state.username = "";
            state.isLogged = false;
            state.role = "user";
            state.authError = null;
        },


        // Action pour mettre à jour le message
        setMsg(state, action) {
            state.msg = action.payload || "";
        },

        // Action pour indiquer un état de chargement
        setLoading(state, action) {
            state.isLoading = action.payload || false;
        },
    },
});

export const {
    login,
    loginFailed,
    logout,
    setMsg,
    setLoading,
} = userSlice.actions;

export default userSlice.reducer;