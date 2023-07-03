import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface MenuState {
  menuParentCatImg : string,
  menuParentCatName : string,
  menuChildCatImg : string,
  menuChildCatName : string,
  menuChildCatDes : string,
  menuChildCatPrice : string,
}

const initialState : MenuState = {
  menuParentCatImg : '',
  menuParentCatName : '',
  menuChildCatImg : '',
  menuChildCatName : '',
  menuChildCatDes : '',
  menuChildCatPrice : '',
}

export const CatSlice = createSlice({
  name : 'menu',
  initialState,
  reducers : {
    setMenuParentCatImg(state,action : PayloadAction<string>)
    {
      state.menuParentCatImg = action.payload
    },
    setMenuParentCatName(state,action : PayloadAction<string>)
    {
      state.menuParentCatName = action.payload
    },
    setMenuChildCatImg(state,action : PayloadAction<string>)
    {
      state.menuChildCatImg = action.payload
    },
    setMenuChildCatName(state,action : PayloadAction<string>)
    {
      state.menuChildCatName = action.payload
    },
    setMenuChildCatDes(state,action : PayloadAction<string>)
    {
      state.menuChildCatName = action.payload
    },
    setMenuChildCatPrice(state,action : PayloadAction<string>)
    {
      state.menuChildCatPrice = action.payload
    },
  }
})

export const {
  setMenuParentCatImg,
  setMenuParentCatName,
  setMenuChildCatImg,
  setMenuChildCatName,
  setMenuChildCatDes,
  setMenuChildCatPrice
} = CatSlice.actions
export default CatSlice.reducer
