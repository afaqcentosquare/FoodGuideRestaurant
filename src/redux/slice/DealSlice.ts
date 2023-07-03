import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface DealState {
  dealImage : string,
}

const initialState : DealState = {
  dealImage : '',
}

export const DealSlice = createSlice({
  name : 'deals',
  initialState,
  reducers : {
    setDealImage(state,action : PayloadAction<string>)
    {
      state.dealImage = action.payload
    },
  }
})

export const {
  setDealImage,
} = DealSlice.actions
export default DealSlice.reducer
