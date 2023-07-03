import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { inboxDetailObj } from "../../models/InboxDetailModel";
import { userObj } from "../../models/UserModel";

export interface InboxDetailState {
  inboxUserData : userObj,
  inboxDetailList : Array<inboxDetailObj>,
  inboxDetailMsgTxt : string
}

const initialState : InboxDetailState = {
  inboxUserData : {
    userId : '',
    userName : '',
    userImg : '',
    userLoc : '',
    userPhoneNumber : ''
  },
  inboxDetailList : [],
  inboxDetailMsgTxt : ''
}

export const InboxDetailSlice = createSlice({
  name : 'inboxDetail',
  initialState,
  reducers : {
    setInboxDetailMsgTxt(state,action : PayloadAction<string>)
    {
      state.inboxDetailMsgTxt = action.payload
    },
    setInboxUserData(state,action : PayloadAction<userObj>)
    {
      state.inboxUserData = action.payload
    },
    setInboxDetailList(state,action : PayloadAction<Array<inboxDetailObj>>)
    {
      state.inboxDetailList = action.payload
    },
  }
})

export const {
  setInboxUserData,
  setInboxDetailList,
  setInboxDetailMsgTxt
} = InboxDetailSlice.actions
export default InboxDetailSlice.reducer
