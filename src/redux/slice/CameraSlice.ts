import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface CameraState {
  isRecording : boolean,
}

const initialState : CameraState = {
  isRecording : false,
}

export const CameraSlice = createSlice({
  name : 'camera',
  initialState,
  reducers : {
    setIsRecording(state,action : PayloadAction<boolean>)
    {
      state.isRecording = action.payload
    },
  }
})

export const {
  setIsRecording,
} = CameraSlice.actions
export default CameraSlice.reducer
