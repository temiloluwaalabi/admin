import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    mode: "dark",
    userId: null,
    token: null,
    courses: []
    // userId: null,
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        },
        setLogin: (state, action) => {
            const { user, accessToken } = action.payload
            state.user = user
            state.token = accessToken
        },
        setLogout: (state, action) => {
            state.user = null
            state.token = null
        },
        setCourses: (state, action) => {
            state.courses = action.payload.courses;
        },
        setCourse: (state, action) => {
            const updatedCourses = state.courses.map((course) => {
                if(course._id === action.payload.course_id) return action.payload.course;
                return course
            });
            state.courses = updatedCourses
        }
    }
})


export const {setMode, setLogin, setLogout, setCourses, setCourse} = globalSlice.actions;
export default globalSlice.reducer;