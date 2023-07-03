import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { categoryObj, foodObj } from "../../models/CategoryModel";
import { resCatObj } from "../../models/ResCatModel";

export interface DialogState {
  showAddPostCatDialog : boolean,
  showPostFoodDialog : boolean,
  showAddPostUploadDialog : boolean,
  showResFoodCatDialog : boolean,
  addPostCatList : Array<categoryObj>,
  addPostFoodList : Array<foodObj>,
  addResCatList : Array<resCatObj>
  dialogSelectCatId : string,
}

const initialState : DialogState = {
  showAddPostCatDialog : false,
  showPostFoodDialog : false,
  showResFoodCatDialog : false,
  showAddPostUploadDialog : false,
  addPostCatList : [],
  addPostFoodList : [],
  addResCatList : [],
  dialogSelectCatId : ''
}

export const DialogSlice = createSlice({
  name : 'dialog',
  initialState,
  reducers : {
    setShowAddPostCatDialog(state,action : PayloadAction<boolean>)
    {
      state.showAddPostCatDialog = action.payload
    },
    setShowAddPostUploadDialog(state,action : PayloadAction<boolean>)
    {
      state.showAddPostUploadDialog = action.payload
    },
    setShowPostFoodDialog(state,action : PayloadAction<boolean>)
    {
      state.showPostFoodDialog = action.payload
    },
    setShowResFoodDialog(state,action : PayloadAction<boolean>)
    {
      state.showResFoodCatDialog = action.payload
    },
    setAddPostCatList(state,action : PayloadAction<Array<categoryObj>>)
    {
      state.addPostCatList = action.payload
    },
    setAddPostFoodList(state,action : PayloadAction<Array<foodObj>>)
    {
      state.addPostFoodList = action.payload
    },
    setAddResCatList(state,action : PayloadAction<Array<resCatObj>>)
    {
      state.addResCatList = action.payload
    },
    setDialogSelectCatId(state,action : PayloadAction<string>)
    {
      state.dialogSelectCatId = action.payload
    },
  }
})

export const {
  setShowAddPostCatDialog,
  setShowPostFoodDialog,
  setShowAddPostUploadDialog,
  setShowResFoodDialog,
  setAddPostCatList,
  setAddPostFoodList,
  setDialogSelectCatId,
  setAddResCatList
} = DialogSlice.actions
export default DialogSlice.reducer
