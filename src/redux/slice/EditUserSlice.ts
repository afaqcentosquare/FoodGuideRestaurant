import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface EditUserState {
  editUserImg : string,
  editUserName : string,
  editUserOpenTime : string,
  editUserCloseTime : string,
  editUserLoc : string,
  editUserDeliveryTime : string,
  editUserNum : string,
  editUserDes : string,
  editUserMinOrder : string,
  editUserDiscount : number,
}

const initialState : EditUserState = {
  editUserImg : '',
  editUserName : '',
  editUserOpenTime : '',
  editUserCloseTime : '',
  editUserLoc : '',
  editUserDeliveryTime : '',
  editUserNum : '',
  editUserDes : '',
  editUserMinOrder : '',
  editUserDiscount : 0,
}

export const EditUserSlice = createSlice({
  name : 'editUser',
  initialState,
  reducers : {
    setEditUserImg(state,action : PayloadAction<string>)
    {
      state.editUserImg = action.payload
    },
    setEditUserName(state,action : PayloadAction<string>)
    {
      state.editUserName = action.payload
    },
    setEditOpenTime(state,action : PayloadAction<string>)
    {
      state.editUserOpenTime = action.payload
    },
    setEditCloseTime(state,action : PayloadAction<string>)
    {
      state.editUserCloseTime = action.payload
    },
    setEditUserLoc(state,action : PayloadAction<string>)
    {
      state.editUserLoc = action.payload
    },
    setEditDeliveryTime(state,action : PayloadAction<string>)
    {
      state.editUserDeliveryTime = action.payload
    },
    setEditUserNum(state,action : PayloadAction<string>)
    {
      state.editUserNum = action.payload
    },
    setEditUserDes(state,action : PayloadAction<string>)
    {
      state.editUserDes = action.payload
    },
    setEditUserMinOrder(state,action : PayloadAction<string>)
    {
      state.editUserMinOrder = action.payload
    },
    setEditUserDiscount(state,action : PayloadAction<number>)
    {
      state.editUserDiscount = action.payload
    },
  }
})

export const {
  setEditUserImg,
  setEditUserName,
  setEditOpenTime,
  setEditCloseTime,
  setEditUserLoc,
  setEditDeliveryTime,
  setEditUserNum,
  setEditUserDes,
  setEditUserMinOrder,
  setEditUserDiscount
} = EditUserSlice.actions
export default EditUserSlice.reducer
