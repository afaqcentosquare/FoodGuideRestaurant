import React, { FC, useEffect, useRef } from "react";
import { InboxDetailView } from "./InboxDetailView";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import Helper from '../../../helper/Helper';
import { useAppDispatch } from "../../../redux";
import {
  setInboxDetailList,
  setInboxDetailMsgTxt,
  setInboxUserData,
} from "../../../redux/slice/InboxDetailSlice";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { inboxDetailObj } from "../../../models/InboxDetailModel";
import { BackHandler, FlatList } from "react-native";

type Props = {}

type inboxDetailNavProp = StackNavigationProp<AllScreenStackParamList>;

const InboxDetailController : FC<Props> = () =>
{
  const navigation = useNavigation<inboxDetailNavProp>();
  // @ts-ignore
  const route = useRoute<resDetailNavProp['receiverId']>();
  const receiverId = route.params.receiverId ;
  const dispatch = useAppDispatch();
  const { inboxDetailMsgTxt } = useSelector((state: RootState) => state.InboxDetail);
  const flatListRef = useRef<FlatList>(null);

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  function getInboxUserInfo()
  {
    Helper.getUserData(receiverId)
      .then((result : any) =>
      {
        dispatch(setInboxUserData(result))
      })
  }

  function sendMessage()
  {
    try
    {
      const userId : any = auth().currentUser?.uid;
      const inboxDetailRef =
        database()
          .ref()
          .child("Chats")
          .push()

      const inboxDetailObj = {
        inboxId : inboxDetailRef.key,
        senderId : userId,
        receiverId : receiverId,
        msgTxt : inboxDetailMsgTxt,
        msgType : "text",
      }

      inboxDetailRef.set(inboxDetailObj)
        .then(() =>
        {
          flatListRef.current?.scrollToIndex({ index : 0,animated : true })
          dispatch(setInboxDetailMsgTxt(''))
          makeFriend()
        });
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  }

  function makeFriend()
  {
    try
    {
      const userId : any = auth().currentUser?.uid;
      const inboxDetailRef =
        database()
          .ref()
          .child("Friends")
          .child(userId)
          .child(receiverId)

      const inboxDetailObj = {
        inboxId : inboxDetailRef.key,
        senderId : userId,
        receiverId : receiverId,
        msgTxt : inboxDetailMsgTxt,
      }

      inboxDetailRef.set(inboxDetailObj)
        .then(() =>
        {
          dispatch(setInboxDetailMsgTxt(''))
        });
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  }

  function getInboxDetailList()
  {
    try
    {
      const userId : any = auth().currentUser?.uid;

      const inboxDetailRef =
        database()
          .ref()
          .child("Chats")

      inboxDetailRef.on('value', (inboxDetailSnap)  =>
      {
        let inboxDetailArr : Array<inboxDetailObj>  = []

        // @ts-ignore
        inboxDetailSnap.forEach((inboxDetailChildSnap) =>
        {
          let receiveId = inboxDetailChildSnap.child("receiverId").val();
          let sendId = inboxDetailChildSnap.child("senderId").val();
          if(receiveId === userId && sendId === receiverId ||
            receiveId === receiverId && sendId === userId)
          {
            inboxDetailArr.push(inboxDetailChildSnap.val())
          }
        })

        dispatch(setInboxDetailList(inboxDetailArr.reverse()))
      })
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }

  }

  useEffect(() =>
  {
    getInboxUserInfo()
    getInboxDetailList()

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };

  },[])

  return(
    <InboxDetailView
      flatListRef={flatListRef}
      sendMsgBtnClick={() => sendMessage()}/>
  )
}

export default InboxDetailController ;
