import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../models/IUser';
import { fetchTelegramUserById, fetchTelegramUsers } from '../reducers/telegramUsers';



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


const telegramUserSlice = createSlice({
    name: 'telegramuser',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTelegramUsers.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchTelegramUsers.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.users = action.payload
                state.laoding = false
            })
            .addCase(fetchTelegramUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })
            .addCase(fetchTelegramUserById.pending, (state) => {
                state.status = 'pending';
                state.laoding = true
            })
            .addCase(fetchTelegramUserById.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                state.data = action.payload
                state.laoding = false
            })
            .addCase(fetchTelegramUserById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error ? action.error.message || 'Failed to fetch products' : 'Failed to fetch products';
                state.laoding = false
            })
    },
});


export default telegramUserSlice.reducer;
