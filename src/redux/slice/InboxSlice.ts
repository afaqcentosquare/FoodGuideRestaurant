import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { inboxObj } from "../../models/InboxModel";

export interface InboxState {
  inboxList : Array<inboxObj>,
}

const initialState : InboxState = {
  inboxList : [],
}

export const InboxSlice = createSlice({
  name : 'inboxDetail',
  initialState,
  reducers : {
    setInboxList(state,action : PayloadAction<Array<inboxObj>>)
    {
      state.inboxList = action.payload
    },
  }
})

export const {
  setInboxList,
} = InboxSlice.actions
export default InboxSlice.reducer
