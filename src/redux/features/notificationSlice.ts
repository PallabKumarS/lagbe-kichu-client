import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Message {
  userId: string;
  content: string;
  read: boolean;
}

interface NotificationState {
  messages: Message[];
}

const initialState: NotificationState = {
  messages: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    receiveNotification: (state, action: PayloadAction<Message>) => {
      state.messages.unshift({ ...action.payload, read: false });
    },
    markAllAsRead: (state) => {
      state.messages.forEach((msg) => {
        msg.read = true;
      });
    },
  },
});

export const { receiveNotification, markAllAsRead } = notificationSlice.actions;

export const selectUnreadCount = (state: { notification: NotificationState }) =>
  state.notification.messages.filter((m) => !m.read).length;

export default notificationSlice;
