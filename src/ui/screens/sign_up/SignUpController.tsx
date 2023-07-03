import React, { FC, useState } from "react";
import {SignUpView} from './SignUpView';
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import auth from '@react-native-firebase/auth';
import {
  setSignUpEdtConfirmPass,
  setSignUpEdtEmail,
  setSignUpEdtPass,
  setSignUpLoad,
} from "../../../redux/slice/SignUpSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import Snackbar from "react-native-snackbar";

type Props = {}

type signUpNavProp = StackNavigationProp<AllScreenStackParamList>;

const SignUpController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();
  const signUp = useSelector((state: RootState) => state.SignUp);
  const [errorSnackVisible,setErrorSnackVisible] = useState(false);
  const [errorSnackTxt,setErrorSnackTxt] = useState('');
  const navigation = useNavigation<signUpNavProp>();

  function validateSignUpForm()
  {
    if(signUp.signUpEdtEmail !== '')
    {
      if(signUp.signUpEdtPass !== '')
      {
        if(signUp.signUpEdtPass.length === 8)
        {
          if(signUp.signUpEdtConfirmPass != '')
          {
            if(signUp.signUpEdtConfirmPass !== '' && signUp.signUpEdtPass === signUp.signUpEdtConfirmPass)
            {
              createUserFirebase()
            }
            else
            {
              Snackbar.show({ text: "Password doesn't match", duration: Snackbar.LENGTH_SHORT, });
            }
          }
          else
          {
            Snackbar.show({ text: "Please enter confirm password", duration: Snackbar.LENGTH_SHORT, });
          }
        }
        else
        {
          Snackbar.show({ text: "Password must be 8 character", duration: Snackbar.LENGTH_SHORT, });
        }
      }
      else
      {
        Snackbar.show({ text: "Please enter password", duration: Snackbar.LENGTH_SHORT, });
      }
    }
    else
    {
      Snackbar.show({ text: "Please Enter Email", duration: Snackbar.LENGTH_SHORT, });
    }
  }

  function createUserFirebase()
  {
    try
    {
      dispatch(setSignUpLoad(true))
      auth()
        .createUserWithEmailAndPassword(signUp.signUpEdtEmail, signUp.signUpEdtPass)
        .then(() =>
        {
          dispatch(setSignUpEdtEmail(''))
          dispatch(setSignUpEdtPass(''))
          dispatch(setSignUpEdtConfirmPass(''))
          navigation.navigate('Home');
          dispatch(setSignUpLoad(false))
          console.log('User account created & signed in!');
        })
        .catch((error : any) =>
        {
          if (error.code === 'auth/email-already-in-use')
          {
            dispatch(setSignUpLoad(false))
            Snackbar.show({ text: "This email address is already in use!", duration: Snackbar.LENGTH_LONG, });
          }
          else if (error.code === 'auth/invalid-email')
          {
            dispatch(setSignUpLoad(false))
            Snackbar.show({ text:"This email address is invalid!", duration: Snackbar.LENGTH_LONG, });
          }
          else if(error.code === 'auth/network-request-failed')
          {
            dispatch(setSignUpLoad(false))
            Snackbar.show({ text: "Please check internet connection", duration: Snackbar.LENGTH_LONG, });
          }
          else
          {
            dispatch(setSignUpLoad(false))
            console.log("SIGN UP : " + error)
          }
        });
    }
    catch (e)
    {
      console.log("SIGNUP_ERROR : " + e);
    }
  }

  return(
    <SignUpView
      errorSnackVisible={errorSnackVisible}
      errorSnackTxt={errorSnackTxt}
      signUpBtn={() => validateSignUpForm()}/>
  )
}

export default SignUpController ;
