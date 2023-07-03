import React, {FC} from 'react';
import { ResProfileView } from "./ResProfileView";
import { ToastAndroid } from "react-native";
import database from "@react-native-firebase/database";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import auth from "@react-native-firebase/auth";
import storage from '@react-native-firebase/storage';
import Permission from "../../../hooks/Permission";
import ImagePicker from 'react-native-image-crop-picker';
import { setResProfileImage } from "../../../redux/slice/ProfileSlice";
import Snackbar from "react-native-snackbar";

type Props = {}

type resProfileNavProp = StackNavigationProp<AllScreenStackParamList>;

const ResProfileController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();
  const resProfile = useSelector((state: RootState) => state.ResProfile);
  const navigation = useNavigation<resProfileNavProp>();
  const {resProfileName,resProfileOpenTime,resProfileCloseTime,resProfileLocation,
    resProfileMinOrder,resProfileDeliveryTime,resProfilePhoneNumber,resProfileDescription,
    resProfileImage,resProfileDiscount} = resProfile

  function checkResProfilePermission()
  {
    Permission.ReadStoragePermission().then(async (result: any) =>
    {
      if (result === 'granted')
      {
        ImagePicker.openPicker({
          mediaType: "photo",
        }).then((images) =>
        {
          dispatch(setResProfileImage(images.path));
          //this.setState({storyImgFilePath : images.path});
        }).catch(e =>
        {
          console.log(e);
        })
      }
      else
      {
        Snackbar.show({ text: "Please Allow Permission", duration: Snackbar.LENGTH_LONG, });
      }
    })
  }

  function saveImageStorage()
  {
    if(resProfileImage !== '')
    {
      const lastPath = resProfileImage.substring(resProfileImage.lastIndexOf('/') + 1)
      const storageRef = storage().ref().child('Restaurant Images').child(lastPath);
      storageRef.putFile(resProfileImage)
        .then(() =>
        {
          storageRef.getDownloadURL().then((url) =>
          {
            createResProfileDatabase(url)
          })
        })
        .catch((e) =>
        {
          console.log('Error' + e);
        })
    }
    else
    {
      Snackbar.show({ text: "Please Select Image", duration: Snackbar.LENGTH_LONG, })
    }
  }

  function validateResProfileForm()
  {
    if(resProfileName !== '')
    {
      if(resProfileOpenTime !== '')
      {
        if(resProfileCloseTime !== '')
        {
          if(resProfileLocation !== '')
          {
            if(resProfileDeliveryTime !== '')
            {
              if(resProfilePhoneNumber !== '')
              {
                 if(resProfileDiscount !== '')
                 {
                   if(resProfileDescription !== '')
                   {
                     saveImageStorage()
                   }
                   else
                   {
                     Snackbar.show({ text: "Please enter description", duration: Snackbar.LENGTH_LONG, });
                   }
                 }
                 else
                 {
                   Snackbar.show({ text: "Please enter discount", duration: Snackbar.LENGTH_LONG, });
                 }
              }
              else
              {
                Snackbar.show({ text: "Please enter phone number", duration: Snackbar.LENGTH_LONG, });
              }
            }
            else
            {
              Snackbar.show({ text: "Please enter delivered time", duration: Snackbar.LENGTH_LONG, });
            }
          }
          else
          {
            Snackbar.show({ text: "Please enter location", duration: Snackbar.LENGTH_LONG, });
          }
        }
        else
        {
          Snackbar.show({ text: "Please enter close time", duration: Snackbar.LENGTH_LONG, });
        }
      }
      else
      {
        Snackbar.show({ text: "Please enter open time", duration: Snackbar.LENGTH_LONG, });
      }
    }
    else
    {
      Snackbar.show({ text: "Please Enter Name", duration: Snackbar.LENGTH_LONG, });
    }
  }

  function createResProfileDatabase(resProfileUrl : string)
  {
    try
    {
      const userId : any = auth().currentUser?.uid;

      //------------------------- restaurant profile ---------------------------

      const resProfileObj = {
        resImg : resProfileUrl,
        resId : userId,
        name : resProfileName,
        openTime : resProfileOpenTime,
        closeTime : resProfileCloseTime,
        location : resProfileLocation,
        deliveredTime : resProfileDeliveryTime,
        phoneNumber : resProfilePhoneNumber,
        description : resProfileDescription,
        minOrder : resProfileMinOrder,
        rating : '',
        discount : resProfileDiscount
      }

      database().ref()
        .child("ResProfile")
        .child(userId.toString())
        .set(resProfileObj)
        .then(() =>
        {

        });

      //------------------------- top restaurant ---------------------------

      const topResProfile = database().ref()
        .child("Home")
        .child("TopRes")
        .push()

      const topResObj = {
        resId : userId,
      }

      topResProfile.set(topResObj)
        .then(() =>
        {
          navigation.navigate("Home")
        });

    }
    catch (e)
    {
      console.log("RES_PROFILE_ERROR : " + e);
    }
  }

  return(
    <ResProfileView
      photoClick={() => checkResProfilePermission()}
      resProfileBtn={() => validateResProfileForm()}/>
  )
}

export default ResProfileController ;
