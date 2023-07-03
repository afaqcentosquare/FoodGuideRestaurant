import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface DealState {
  sliderImage : string,
}

const initialState : DealState = {
  sliderImage : '',
}

export const DealSlice = createSlice({
  name : 'slider',
  initialState,
  reducers : {
    setSliderImage(state,action : PayloadAction<string>)
    {
      state.sliderImage = action.payload
    },
  }
})

export const {
  setSliderImage,
} = DealSlice.actions
export default DealSlice.reducer
