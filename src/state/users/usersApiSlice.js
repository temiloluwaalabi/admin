import { apiSlice } from "state/app/apiSlice"
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/api/courses',
            keepUnusedDataFor: 5,
        })
    })
})

export const {
    useGetUsersQuery
} = usersApiSlice 