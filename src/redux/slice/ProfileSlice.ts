import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface ResProfileState {
  resProfileImage : string,
  resProfileName : string,
  resProfileOpenTime : string,
  resProfileCloseTime : string,
  resProfileLocation : string,
  resProfileDeliveryTime : string,
  resProfilePhoneNumber : string,
  resProfileDescription : string,
  resProfileMinOrder : string
  resProfileDiscount : string
}

const initialState : ResProfileState = {
  resProfileImage : '',
  resProfileName : '',
  resProfileOpenTime : '',
  resProfileCloseTime : '',
  resProfileLocation : '',
  resProfileDeliveryTime : '',
  resProfilePhoneNumber : '',
  resProfileDescription : '',
  resProfileMinOrder : '',
  resProfileDiscount : ''
}

export const ResProfileSlice = createSlice({
  name : 'resProfile',
  initialState,
  reducers : {
    setResProfileImage(state,action : PayloadAction<string>)
    {
      state.resProfileImage = action.payload
    },
    setResProfileName(state,action : PayloadAction<string>)
    {
      state.resProfileName = action.payload
    },
    setResProfileOpenTime(state,action : PayloadAction<string>)
    {
      state.resProfileOpenTime = action.payload
    },
    setResProfileCloseTime(state,action : PayloadAction<string>)
    {
      state.resProfileCloseTime = action.payload
    },
    setResProfileMinOrder(state,action : PayloadAction<string>)
    {
      state.resProfileMinOrder = action.payload
    },
    setResProfileLocation(state,action : PayloadAction<string>)
    {
      state.resProfileLocation = action.payload
    },
    setResProfileDeliveredTime(state,action : PayloadAction<string>)
    {
      state.resProfileDeliveryTime = action.payload
    },
    setResProfilePhoneNumber(state,action : PayloadAction<string>)
    {
      state.resProfilePhoneNumber = action.payload
    },
    setResProfileDescription(state,action : PayloadAction<string>)
    {
      state.resProfileDescription = action.payload
    },
    setResProfileDiscount(state,action : PayloadAction<string>)
    {
      state.resProfileDiscount = action.payload
    },
  }
})

export const {
  setResProfileImage,
  setResProfileName,
  setResProfileOpenTime,
  setResProfileCloseTime,
  setResProfileLocation,
  setResProfileDeliveredTime,
  setResProfilePhoneNumber,
  setResProfileDescription,
  setResProfileMinOrder,
  setResProfileDiscount
} = ResProfileSlice.actions
export default ResProfileSlice.reducer
