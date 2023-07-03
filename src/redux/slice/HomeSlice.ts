import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface HomeState {
  isVideoLoad : boolean,
  footerLoading : boolean,
  noMoreData : boolean,
}

const initialState : HomeState = {
  isVideoLoad : false,
  footerLoading : false,
  noMoreData : false,
}

export const HomeSlice = createSlice({
  name : 'home',
  initialState,
  reducers : {
    setIsVideoLoad(state,action : PayloadAction<boolean>)
    {
      state.isVideoLoad = action.payload
    },
    setFooterLoading(state,action : PayloadAction<boolean>)
    {
      state.footerLoading = action.payload
    },
    setNoMoreData(state,action : PayloadAction<boolean>)
    {
      state.noMoreData = action.payload
    },
  }
})

export const {
  setIsVideoLoad,
  setFooterLoading,
  setNoMoreData,
} = HomeSlice.actions
export default HomeSlice.reducer
