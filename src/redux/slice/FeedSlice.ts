import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { postObj } from "../../models/PostModel";

export interface FeedState {
  feedList : Array<postObj>
}

const initialState : FeedState = {
  feedList : []
}

export const FeedSlice = createSlice({
  name : 'feed',
  initialState,
  reducers : {
    setFeedList(state,action : PayloadAction<Array<postObj>>)
    {
      state.feedList = action.payload
    },
  }
})

export const {
  setFeedList
} = FeedSlice.actions
export default FeedSlice.reducer
