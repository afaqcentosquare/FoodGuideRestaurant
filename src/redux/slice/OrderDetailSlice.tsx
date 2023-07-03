import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface OrderDetailState {
 /* orderDataList : orderObj,*/
  orderDataLoad : boolean,
  orderTotal : number
}

const initialState : OrderDetailState = {
  orderTotal : 0,
  orderDataLoad : true,
}

export const OrderDetailSlice = createSlice({
  name : 'orderDetail',
  initialState,
  reducers : {
    setOrderTotal(state,action : PayloadAction<number>)
    {
      state.orderTotal = action.payload
    },
    setOrderDataLoad(state,action : PayloadAction<boolean>)
    {
      state.orderDataLoad = action.payload
    },
  }
})

export const {
  setOrderTotal,
  setOrderDataLoad,
} = OrderDetailSlice.actions
export default OrderDetailSlice.reducer
