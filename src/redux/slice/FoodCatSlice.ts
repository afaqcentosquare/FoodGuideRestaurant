import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface FoodCatState {
  foodCatImg : string,
  foodCatName : string,
}

const initialState : FoodCatState = {
  foodCatImg : '',
  foodCatName : '',
}

export const FoodCatSlice = createSlice({
  name : 'foodCat',
  initialState,
  reducers : {
    setFoodCatImg(state,action : PayloadAction<string>)
    {
      state.foodCatImg = action.payload
    },
    setFoodCatName(state,action : PayloadAction<string>)
    {
      state.foodCatName = action.payload
    },
  }
})

export const {
  setFoodCatImg,
  setFoodCatName,
} = FoodCatSlice.actions
export default FoodCatSlice.reducer
