import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getContacts = createAsyncThunk(
  'Contacts/getContacts',
  async (user, thunkAPI) => {
    const { rejectWithvalue } = thunkAPI;
    try {
      const req = await fetch(`http://localhost:3002/users/${user.email}`, {
        method: 'GET',
      });
      const data = await req.json();
      return data[0];
    } catch (error) {
      rejectWithvalue(error);
    }
  }
);

export const chatStorage = createAsyncThunk(
  'Contacts/chatStorage',
  async (message, thunkAPI) => {
    const { rejectWithvalue, dispatch } = thunkAPI;
    try {
      await fetch(
        `http://localhost:3002/users/sendMessage/${message.phone}/${message.contactPhone}`,
        {
          method: 'PUT',
          body: JSON.stringify(message),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );
      dispatch(getContacts(message));
      return message;
    } catch (error) {
      rejectWithvalue(error);
    }
  }
);

export const receivedChats = createAsyncThunk(
  'Contacts/receivedChats',
  async (message, thunkAPI) => {
    const { rejectWithvalue } = thunkAPI;
    try {
      await fetch(
        `http://localhost:3002/users/receiveMessage/${message.contactPhone}/${message.phone}`,
        {
          method: 'PUT',
          body: JSON.stringify(message),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );
      return message;
    } catch (error) {
      rejectWithvalue(error);
    }
  }
);

export const deleteMessage = createAsyncThunk(
  'Contacts/deleteMessage',
  async (message, thunkAPI) => {
    const { rejectWithvalue, dispatch } = thunkAPI;
    try {
      await fetch(
        `http://localhost:3002/users/deleteMessage/${message.phone}/${message.contactPhone}`,
        {
          method: 'DELETE',
          body: JSON.stringify(message),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );
      dispatch(getContacts(message));
      return message;
    } catch (error) {
      rejectWithvalue(error);
    }
  }
);

export const addContact = createAsyncThunk(
  'Contacts/addContact',
  async (contactData, thunkAPI) => {
    const { rejectWithvalue, dispatch } = thunkAPI;
    try {
      await fetch(`http://localhost:3002/users/${contactData.email}`, {
        method: 'PUT',
        body: JSON.stringify(contactData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      dispatch(getContacts(contactData));
      return contactData;
    } catch (error) {
      rejectWithvalue(error);
    }
  }
);

export const readMessages = createAsyncThunk(
  'Contacts/readMessages',
  async (data, thunkAPI) => {
    const { rejectWithvalue, dispatch } = thunkAPI;
    try {
      await fetch(
        `http://localhost:3002/users/readMessage/${data.phone}/${data.contactNumber}`,
        {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );
      dispatch(getContacts(data));
      return data;
    } catch (error) {
      rejectWithvalue(error.message);
    }
  }
);

export const setCounterMessages = createAsyncThunk(
  'Contacts/setCounterMessages',
  async (data, thunkAPI) => {
    const { rejectWithvalue } = thunkAPI;
    try {
      await fetch(
        `http://localhost:3002/users/setCounterPlus/${data.phone}/${data.contactNumber}`,
        {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );
      return data;
    } catch (error) {
      rejectWithvalue(error.message);
    }
  }
);

export const setCounterZero = createAsyncThunk(
  'Contacts/setCounterZero',
  async (data, thunkAPI) => {
    const { rejectWithvalue } = thunkAPI;
    try {
      await fetch(
        `http://localhost:3002/users/setCounterZero/${data.phone}/${data.contactNumber}`,
        {
          method: 'PUT',
          body: JSON.stringify(data),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );
      return data;
    } catch (error) {
      rejectWithvalue(error.message);
    }
  }
);

const ContactsSlice = createSlice({
  name: 'Contacts',
  initialState: {
    phoneNumber: null,
    email: null,
    _id: null,
    contacts: [],
    filtered: [],
    chatsField: false,
    contactInfo: {},
    selectChoice: {
      light: true,
      dark: false,
    },
    darked: false,
    changed: false,
    selectChat: false,
    messageCounter: [],
  },
  reducers: {
    // Filter Contacts
    filteredContacts: (state, action) => {
      state.contacts = state.contacts.filter((el) => {
        if (el.name.includes(action.payload)) {
          return el;
        } else {
          state.filtered.push(el);
          return null;
        }
      });

      state.filtered = state.filtered.filter((el) => {
        if (el.name.includes(action.payload)) {
          state.contacts.push(el);
          return null;
        } else {
          return el;
        }
      });
    },

    // Display Contact Chats page
    displayChatsPage: (state) => {
      state.chatsField = true;
    },

    // Show Details
    showDetails: (state, action) => {
      state.contactInfo = action.payload;
    },

    // select choice of Theme
    selectTheme: (state, action) => {
      state.selectChoice = action.payload;
    },

    // Dark Theme
    changeTheme: (state, action) => {
      state.darked = action.payload;
    },

    // open change theme list
    openChangedList: (state, action) => {
      state.changed = action.payload;
    },

    // open change theme list
    chatPage: (state, action) => {
      state.selectChat = action.payload;
    },

    // reset selected contact
    resetBackground: (state) => {
      state.chatsField = false;
    },
  },
  extraReducers: {
    // Get Contacts
    [getContacts.fulfilled]: (state, action) => {
      state.phoneNumber = action.payload.phone;
      state.email = action.payload.email;
      state._id = action.payload._id;
      state.contacts = action.payload.contacts;
      state.filtered = [];
    },

    // Chats Storage
    [chatStorage.fulfilled]: (state, action) => {
      state.contactInfo.chat.push(action.payload);
    },

    // Delete message
    [deleteMessage.fulfilled]: (state, action) => {
      state.contactInfo.chat = state.contactInfo.chat.filter(
        (el) => el.id !== action.payload.messageId
      );
    },

    // set Counter messages
    [setCounterMessages.fulfilled]: (state, action) => {
      state.messageCounter.push(action.payload);
    },

    // set Counter a Zero
    [setCounterZero.fulfilled]: (state) => {
      state.messageCounter = [];
    },
  },
});

export const { filteredContacts } = ContactsSlice.actions;
export const { displayChatsPage } = ContactsSlice.actions;
export const { showDetails } = ContactsSlice.actions;
export const { openChangedList } = ContactsSlice.actions;
export const { selectTheme } = ContactsSlice.actions;
export const { changeTheme } = ContactsSlice.actions;
export const { chatPage } = ContactsSlice.actions;
export const { resetBackground } = ContactsSlice.actions;
export default ContactsSlice.reducer;
