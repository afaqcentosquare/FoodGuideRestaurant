import React, { FC, useEffect, useState } from "react";
import { EditProfileView } from "./EditProfileView";
import auth from "@react-native-firebase/auth";
import Helper from "../../../helper/Helper";
import database from "@react-native-firebase/database";
import { useAppDispatch } from "../../../redux";
import {
  setEditCloseTime, setEditDeliveryTime,
  setEditOpenTime, setEditUserDes, setEditUserDiscount,
  setEditUserImg,
  setEditUserLoc, setEditUserMinOrder,
  setEditUserName,
  setEditUserNum,
} from "../../../redux/slice/EditUserSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import Permission from "../../../hooks/Permission";
import ImagePicker from "react-native-image-crop-picker";
import { BackHandler, ToastAndroid } from "react-native";
import storage from "@react-native-firebase/storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";

type Props = {}

type editProfileNavProp = StackNavigationProp<AllScreenStackParamList>;

const EditProfileController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();
  const navigation = useNavigation<editProfileNavProp>();
  const editUser = useSelector((state: RootState) => state.EditUser);
  const {editUserNum,editUserImg,editUserLoc,editUserName} = editUser;
  const [imageEditable,setImageEditAble] = useState(false);

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  function getUserData()
  {
    Helper.getResData()
      .then((result : any) =>
      {
        dispatch(setEditUserImg(result.resImg))
        dispatch(setEditUserName(result.name))
        dispatch(setEditOpenTime(result.openTime))
        dispatch(setEditCloseTime(result.closeTime))
        dispatch(setEditDeliveryTime(result.deliveredTime))
        dispatch(setEditUserLoc(result.location))
        dispatch(setEditUserNum(result.phoneNumber))
        dispatch(setEditUserDes(result.description))
        dispatch(setEditUserMinOrder(result.minOrder))
        dispatch(setEditUserDiscount(result.discount))
      })
  }

  function checkUpdate()
  {
    if(imageEditable)
    {
      saveImageStorage()
    }
    else
    {
      updateUserData(editUserImg)
    }
  }

  function updateUserData(url : string)
  {
    const userId : any = auth().currentUser?.uid;

    const data = database().ref()
      .child("UserProfile")
      .child(userId)

    const updateUserObj = {
      userName : editUserName,
      userLoc : editUserLoc,
      userImg : url,
      userPhoneNumber : editUserNum
    }

    data.update(updateUserObj)
      .then((result : any) => {})
  }

  function checkEditProfilePermission()
  {
    Permission.ReadStoragePermission().then(async (result: any) =>
    {
      if (result === 'granted')
      {
        ImagePicker.openPicker({
          mediaType: "photo",
        }).then((images) =>
        {
          setImageEditAble(true)
          dispatch(setEditUserImg(images.path));
        }).catch(e =>
        {
          console.log(e);
        })
      }
      else
      {
        ToastAndroid.show("Please Allow Permission",ToastAndroid.LONG);
      }
    })
  }

  function saveImageStorage()
  {
    if(editUserImg !== '')
    {
      const lastPath = editUserImg.substring(editUserImg.lastIndexOf('/') + 1)
      const storageRef = storage().ref().child('User Images').child(lastPath);
      storageRef.putFile(editUserImg)
        .then(() =>
        {
          storageRef.getDownloadURL().then((url : string) =>
          {
            updateUserData(url)
          })
        })
        .catch((e) =>
        {
          console.log('Error' + e);
        })
    }
    else
    {
      ToastAndroid.show("Please Select Image",ToastAndroid.LONG);
    }
  }

  useEffect(() =>
  {
    getUserData()

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <EditProfileView
      editUserImgClick={() => checkEditProfilePermission()}
      updateUserBtn={() => checkUpdate()}/>
  )
}

export default EditProfileController ;
