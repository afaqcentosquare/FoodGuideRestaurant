import React, { FC, useEffect, useState } from "react";
import { ProfileView } from "./ProfileView";
import Helper from "../../../helper/Helper";
import auth from "@react-native-firebase/auth";
import {
  setEditCloseTime, setEditDeliveryTime,
  setEditOpenTime, setEditUserDes, setEditUserDiscount,
  setEditUserImg,
  setEditUserLoc, setEditUserMinOrder,
  setEditUserName,
  setEditUserNum,
} from "../../../redux/slice/EditUserSlice";
import { useAppDispatch } from "../../../redux";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";

type Props = {}

type profileNavProp = StackNavigationProp<AllScreenStackParamList>;

const ProfileController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();
  const navigation = useNavigation<profileNavProp>();

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  function getUserData()
  {
    const userId : any = auth().currentUser?.uid;
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

  useEffect(() =>
  {
    getUserData()

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <ProfileView/>
  )
}

export default ProfileController ;
