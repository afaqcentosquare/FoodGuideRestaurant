import React, {FC} from 'react';
import { SignInView } from "./SignInView";
import auth from "@react-native-firebase/auth";
import { setSignInEdtEmail, setSignInEdtPass, setSignInLoad } from "../../../redux/slice/SignInSlice";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import Snackbar from "react-native-snackbar";

type Props = {}

type signInNavProp = StackNavigationProp<AllScreenStackParamList>;

const SignInController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();
  const signIn = useSelector((state: RootState) => state.SignIn);
  const navigation = useNavigation<signInNavProp>();

  function validateSignInForm()
  {
    if(signIn.signInEdtEmail !== '')
    {
      if(signIn.signInEdtPass !== '')
      {
        signInUserFirebase()
      }
      else
      {
        Snackbar.show({ text: "Please enter password", duration: Snackbar.LENGTH_LONG, });
      }
    }
    else
    {
      Snackbar.show({ text: "Please Enter Email", duration: Snackbar.LENGTH_LONG, });
    }
  }

  function signInUserFirebase()
  {
    try
    {
      dispatch(setSignInLoad(true))
      auth()
        .signInWithEmailAndPassword(signIn.signInEdtEmail, signIn.signInEdtPass)
        .then(() =>
        {
          dispatch(setSignInEdtEmail(''))
          dispatch(setSignInEdtPass(''))
          navigation.navigate('Main');
          dispatch(setSignInLoad(false))
          //console.log('User account created & signed in!');
        })
        .catch((error : any) =>
        {
          if (error.code === 'auth/invalid-email')
          {
            dispatch(setSignInLoad(false))
            Snackbar.show({ text:"This email address is invalid!", duration: Snackbar.LENGTH_LONG, });
          }
          else if (error.code === 'auth/wrong-password')
          {
            dispatch(setSignInLoad(false))
            Snackbar.show({ text:"Please enter correct password", duration: Snackbar.LENGTH_LONG, });
          }
          else if(error.code === 'auth/too-many-requests')
          {
            dispatch(setSignInLoad(false))
            Snackbar.show({ text:"Too many request with wrong password please try again later ", duration: Snackbar.LENGTH_LONG, });
          }
          else if(error.code === 'auth/network-request-failed')
          {
            dispatch(setSignInLoad(false))
            Snackbar.show({ text: "Please check internet connection", duration: Snackbar.LENGTH_LONG, });
          }
          else if(error.code === 'auth/user-not-found')
          {
            dispatch(setSignInLoad(false))
            Snackbar.show({ text: "User not found", duration: Snackbar.LENGTH_LONG, });
          }
          else
          {
            dispatch(setSignInLoad(false))
            console.log("SIGNIN : " + error);
          }
        });
    }
    catch (e)
    {
      console.log("SIGNUP_ERROR : " + e);
    }
  }

  return(
    <SignInView
      signInBtn={() => validateSignInForm()}/>
  )
}

export default SignInController ;
