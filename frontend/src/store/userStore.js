import {create} from "zustand"
import {toast} from "react-hot-toast"
import axios from "../api/axios.js"

export default create((set)=>({
    user: null,
    checkingAuth: true,
    loading: false,

    logout: async () =>{
        try {
            await axios.post("/auth/logout");
            set({user: null});
        } catch (error) {
            const message = error.message || "logout failed";
            toast.error(message);
        }
    },
    login: async ({username, password}) => {
        set({loading: true});
        try {
            await axios.post("/auth/login",{username, password});
            const res = await axios.get("/auth/me");
            set({user: res.data, loading: false});
        } catch (error) {
            set({loading: false});
            const message = error.response.data.error || "An error occurred";
            toast.error(message);
        }
    },
    signup: async ({fullname, email, password, username}) => {
        set({loading: true});
        try {
            const res = await axios.post("/auth/signup",{fullname, email, password, username});
            set({user: res.data, loading: false});
        } catch (error) {
            set({loading: false});
            const message = error.response.data.error || "An error occurred";
            toast.error(message);
        }
    },
    checkAuth: async () => {
        set({checkingAuth: true});
        try {
            const res = await axios.get("/auth/me");
            set({user: res.data, checkingAuth: false});
        } catch (error) {
            set({checkingAuth: false, user: null});
        }
    },
}));