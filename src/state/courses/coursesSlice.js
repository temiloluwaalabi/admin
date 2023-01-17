import {
    createSelector,
    createEntityAdapter,

} from "@reduxjs/toolkit";
import { apiSlice } from "state/api";

const coursesAdapter = createEntityAdapter({
    sortComparer: (a,b) => b.date.localeCompare(a.date)
})

const initialState = coursesAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCourses: builder.query({
            query: () => '/api/courses',
            transformResponse: responseData => {
                return coursesAdapter.setAll(initialState, responseData)                
            },
            providesTags: (result, error, args) => [
                {type: 'Course', id: "LIST"},
                ...results.ids.map(id => {{type: 'Course', id}})
            ]
        })
    })
})

export const {
    useGetCoursesQuery
} = extendedApiSlice

//returns the query result objext
export const selectCoursesResult = extendedApiSlice.endpoints.getCourses.select()

//creates memoized sleector
const selectCoursesData = createSelector(
    selectCoursesResult,
    coursesResult = coursesResult.data//
)
export const {
    selectAll: selectAllCourses,
    selectById: selectCourseById,
    selectIds: selectCourseIds
} = coursesAdapter.getSelectors(state => selectCoursesData(state) ?? initialState)