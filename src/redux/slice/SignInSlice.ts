import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface SignInState {
  signInEdtEmail : string,
  signInEdtPass : string,
  signInLoad : boolean
}

const initialState : SignInState = {
  signInEdtEmail : '',
  signInEdtPass : '',
  signInLoad : false
}

export const SignInSlice = createSlice({
  name : 'signIn',
  initialState,
  reducers : {
    setSignInEdtEmail(state,action : PayloadAction<string>)
    {
      state.signInEdtEmail = action.payload
    },
    setSignInEdtPass(state,action : PayloadAction<string>)
    {
      state.signInEdtPass = action.payload
    },
    setSignInLoad(state,action : PayloadAction<boolean>)
    {
      state.signInLoad = action.payload
    },
  }
})

export const {
  setSignInEdtEmail,
  setSignInEdtPass,
  setSignInLoad
} = SignInSlice.actions
export default SignInSlice.reducer
