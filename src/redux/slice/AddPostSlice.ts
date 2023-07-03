import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface AddPostState {
  addPostDesEdtTxt : string,
  addPostImg : string,
  selectCatEdtTxt : string,
  selectFoodEdtTxt : string,
  selectLocEdtTxt : string,
  selectPostMenuCatId : string,
  selectPostFoodId : string,
}

const initialState : AddPostState = {
  addPostDesEdtTxt : '',
  addPostImg : '',
  selectCatEdtTxt : '',
  selectFoodEdtTxt : '',
  selectLocEdtTxt : '',
  selectPostMenuCatId : '',
  selectPostFoodId : ''
}

export const AddPostSlice = createSlice({
  name : 'addPost',
  initialState,
  reducers : {
    setAddPostDesEdtTxt(state,action : PayloadAction<string>)
    {
      state.addPostDesEdtTxt = action.payload
    },
    setAddPostImg(state,action : PayloadAction<string>)
    {
      state.addPostImg = action.payload
    },
    setSelectCatEdtTxt(state,action : PayloadAction<string>)
    {
      state.selectCatEdtTxt = action.payload
    },
    setSelectFoodEdtTxt(state,action : PayloadAction<string>)
    {
      state.selectFoodEdtTxt = action.payload
    },
    setSelectLocEdtTxt(state,action : PayloadAction<string>)
    {
      state.selectLocEdtTxt = action.payload
    },
    setSelectPostMenuCatId(state,action : PayloadAction<string>)
    {
      state.selectPostMenuCatId = action.payload
    },
    setSelectPostFoodId(state,action : PayloadAction<string>)
    {
      state.selectPostFoodId = action.payload
    },
  }
})

export const {
  setAddPostDesEdtTxt,
  setSelectCatEdtTxt,
  setSelectFoodEdtTxt,
  setSelectLocEdtTxt,
  setAddPostImg,
  setSelectPostMenuCatId,
  setSelectPostFoodId
} = AddPostSlice.actions
export default AddPostSlice.reducer
