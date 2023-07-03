import React, { FC, useEffect } from "react";
import { InboxView } from "./InboxView";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { useAppDispatch } from "../../../redux";
import { setInboxList } from "../../../redux/slice/InboxSlice";
import { inboxObj } from "../../../models/InboxModel";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";

type Props = {}

type inboxNavProp = StackNavigationProp<AllScreenStackParamList>;

const InboxController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();
  const navigation = useNavigation<inboxNavProp>();

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  function getInboxList()
  {
    try
    {
      const userId : any = auth().currentUser?.uid;

      const inboxDetailRef =
        database()
          .ref()
          .child("Friends")
          .child(userId)

      inboxDetailRef.on('value', (inboxSnap)  =>
      {
        dispatch(setInboxList([]))

        let inboxDetailArr : Array<inboxObj>  = []

        // @ts-ignore
        inboxSnap.forEach((inboxChildSnap) =>
        {
            inboxDetailArr.push(inboxChildSnap.val())
        })

        dispatch(setInboxList(inboxDetailArr))
      })
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }

  }

  useEffect(() =>
  {
    getInboxList()

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <InboxView/>
  )
}

export default InboxController ;
