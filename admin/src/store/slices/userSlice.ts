import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../models/IUser';
import { fetchUserById, fetchUsers } from '../reducers/userReduser';



interface userState {
    data: IUser;
    users: {
        count: number,
        next: null | number,
        previous: null | number,
        results: IUser[]
    };
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
    laoding: boolean
}

const initialState: userState = {
    data: {
        "id": 1,
        "password": "loading...",
        "last_login": "loading...",
        "is_superuser": true,
        "username": "loading...",
        "first_name": "loading...",
        "last_name": "loading...",
        "email": "loading...",
        "is_staff": true,
        "is_active": true,
        "date_joined": "loading...",
        "profile_image": "https://backend.mnogosushi.kg/media/uploads/DSC09920.webp",
        "phone": '',
        "groups": [],
        "user_permissions": []
    },
    users: {
        "count": 3,
        "next": null,
        "previous": null,
        "results": []
    },
    status: 'idle',
    error: null,
    laoding: false
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.users = action.payload
                state.laoding = false
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })
            .addCase(fetchUserById.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.data = action.payload
                state.laoding = false
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })
    },
});


export default userSlice.reducer;
