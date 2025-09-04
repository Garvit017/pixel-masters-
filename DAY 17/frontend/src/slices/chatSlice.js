import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  users: [],
  selectedUser: null,
  messages: [],
  isLoading: false,
  isError: false,
  message: '',
  onlineUsers: [],
  typingUsers: [],
};

// Fetch all users
export const fetchUsers = createAsyncThunk(
  'chat/fetchUsers',
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get('/api/users', config);

      return data.users;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

// Get global chat messages
export const getGlobalMessages = createAsyncThunk(
  'chat/getGlobalMessages',
  async (_, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.get('/api/messages/global', config);

      return data.messages;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

// Get messages between users
export const getMessages = createAsyncThunk(
  'chat/getMessages',
  async (userId, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const endpoint = `/api/messages/${userId}`;
      
      const { data } = await axios.get(endpoint, config);

      return data.messages;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

// Send message
export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (messageData, { getState, rejectWithValue }) => {
    try {
      const {
        auth: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post('/api/messages', messageData, config);

      return data.message;
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      return rejectWithValue(message);
    }
  }
);

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    updateUserStatus: (state, action) => {
      const { userId, status } = action.payload;
      state.users = state.users.map(user => 
        user._id === userId ? { ...user, status } : user
      );
    },
    setTyping: (state, action) => {
      const { userId, isTyping } = action.payload;
      state.typingUsers = [...state.typingUsers.filter(user => user.userId !== userId)];
      if (isTyping) {
        state.typingUsers.push({
          userId,
          isTyping,
          isGlobal: action.payload.isGlobal || false
        });
      }
    },
    resetChat: (state) => {
      state.users = [];
      state.selectedUser = null;
      state.messages = [];
      state.onlineUsers = {};
      state.typingUsers = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getGlobalMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGlobalMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(getGlobalMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const {
  setSelectedUser,
  addMessage,
  setOnlineUsers,
  updateUserStatus,
  setTyping,
  resetChat,
} = chatSlice.actions;
export default chatSlice.reducer;