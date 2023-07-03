import React, { FC, useEffect, useState } from "react";
import { HomeView } from "./HomeView";
import { useAppDispatch } from "../../../redux";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { postObj } from "../../../models/PostModel";
import { setFooterLoading, setNoMoreData } from "../../../redux/slice/HomeSlice";
import { BackHandler } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";

type Props = {}

type homeNavProp = StackNavigationProp<AllScreenStackParamList>;

const HomeController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();
  const navigation = useNavigation<homeNavProp>();
  let [postVideoList,setPostVideoList] = useState<Array<postObj>>([])
  let [page,setPage] = useState(1);

  function handleBackButtonClick()
  {
    BackHandler.exitApp();
    return true;
  }

  function getNumChildren()
  {
    const postRef =
      database()
        .ref()
        .child("Post")
        .limitToFirst(1)
    postRef.once('value').then((postSnap)  =>
    {
      if(page <= postSnap.numChildren())
      {
        dispatch(setFooterLoading(true))
        dispatch(setNoMoreData(false))
        getVideosData()
      }
      else
      {
        dispatch(setFooterLoading(false))
        dispatch(setNoMoreData(true))
      }
    })
  }

  function getVideosData()
  {
    try
    {
      const userId : any = auth().currentUser?.uid;
      const postRef =
        database()
          .ref()
          .child("Post")
      postRef.once('value').then((postSnap)  =>
      {
        setPostVideoList([])

        let postArr : Array<postObj>  = []

        // @ts-ignore
        postSnap.forEach((postChildSnap) =>
        {
          if(postChildSnap.child('resId').val() === userId)
          {
            postArr.push(postChildSnap.val())
          }

        })
        setPostVideoList(postArr.filter(e => e != null))
      })
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  }

  function onReachEnd()
  {
    //dispatch(setFooterLoading(true))
    setPage(page + 1)
    getNumChildren()
    //dispatch(setFooterLoading(false))
  }

  useEffect(() =>
  {
    getVideosData()

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <HomeView
      postVideoList={postVideoList}
      onReachEnd={() => onReachEnd()}/>
  )
}

export default HomeController ;
