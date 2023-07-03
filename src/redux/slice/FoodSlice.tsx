import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { categoryObj } from "../../models/CategoryModel";

export interface FoodState {
  foodImg : string,
  foodCatName : string,
  foodName : string,
  foodDes : string,
  foodPrice : string,
  foodCatList : Array<categoryObj>,
  selectFoodId : string,
  selectFoodCatResId : string,
  selectFoodCatResName : string,
}

const initialState : FoodState = {
  foodImg : '',
  foodCatName : '',
  foodName : '',
  foodDes : '',
  foodPrice : '',
  foodCatList : [],
  selectFoodId : '',
  selectFoodCatResId : '',
  selectFoodCatResName : ''
}

export const FoodSlice = createSlice({
  name : 'Food',
  initialState,
  reducers : {
    setFoodImg(state,action : PayloadAction<string>)
    {
      state.foodImg = action.payload
    },
    setFoodCatName(state,action : PayloadAction<string>)
    {
      state.foodCatName = action.payload
    },
    setFoodName(state,action : PayloadAction<string>)
    {
      state.foodName = action.payload
    },
    setFoodDes(state,action : PayloadAction<string>)
    {
      state.foodDes = action.payload
    },
    setFoodPrice(state,action : PayloadAction<string>)
    {
      state.foodPrice = action.payload
    },
    setSelectFoodCatResId(state,action : PayloadAction<string>)
    {
      state.selectFoodCatResId = action.payload
    },
    setSelectFoodCatResName(state,action : PayloadAction<string>)
    {
      state.selectFoodCatResName = action.payload
    },
    setFoodCatList(state,action : PayloadAction<Array<categoryObj>>)
    {
      state.foodCatList = action.payload
    },
    setSelectFoodId(state,action : PayloadAction<string>)
    {
      state.selectFoodId = action.payload
    },
  }
})

export const {
  setFoodImg,
  setFoodCatName,
  setFoodName,
  setFoodDes,
  setFoodPrice,
  setFoodCatList,
  setSelectFoodId,
  setSelectFoodCatResId,
  setSelectFoodCatResName
} = FoodSlice.actions
export default FoodSlice.reducer
