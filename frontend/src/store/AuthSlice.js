import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getContacts } from './ContactsSlice';

export const verification = createAsyncThunk(
  'Authentication/verification',
  async (data, thunkAPI) => {
    const { rejectedWithvalue, dispatch } = thunkAPI;
    try {
      const req = await fetch(
        `http://localhost:3002/users/${data.email}/${data.password}`,
        {
          method: 'GET',
        }
      );
      const result = await req.json();
      if (result.length !== 0) {
        const user = result[0];
        dispatch(getContacts(user));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      rejectedWithvalue(error);
    }
  }
);

export const addUser = createAsyncThunk(
  'Authentication/addUser',
  async (data, thunkAPI) => {
    const { rejectedWithvalue, dispatch } = thunkAPI;
    try {
      const req = await fetch(`http://localhost:3002/users/`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const result = await req.json();

      if (result.length !== 0) {
        dispatch(getContacts(data));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      rejectedWithvalue(error);
    }
  }
);

const AuthSlice = createSlice({
  name: 'Authentication',
  initialState: {
    hasAccount: true,
    registered: false,
  },
  reducers: {
    logChange: (state) => {
      state.hasAccount = !state.hasAccount;
    },

    logOut: (state) => {
      state.registered = false;
      state.hasAccount = true;
    },
  },
  extraReducers: {
    // verify user

    [verification.fulfilled]: (state, action) => {
      state.registered = action.payload;
    },

    // Add user

    [addUser.fulfilled]: (state, action) => {
      state.registered = action.payload;
    },
  },
});

export const { logChange } = AuthSlice.actions;
export const { logOut } = AuthSlice.actions;
export default AuthSlice.reducer;
