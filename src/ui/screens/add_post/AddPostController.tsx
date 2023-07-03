import React, { FC, useEffect } from "react";
import ImagePicker from "react-native-image-crop-picker";
import Permission from "../../../hooks/Permission";
import { useAppDispatch } from "../../../redux";
import {
  setAddPostDesEdtTxt,
  setAddPostImg,
  setSelectCatEdtTxt,
  setSelectFoodEdtTxt, setSelectPostFoodId,
  setSelectPostMenuCatId,
} from "../../../redux/slice/AddPostSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import storage from "@react-native-firebase/storage";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import { AddPostView } from "./AddPostView";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import Snackbar from "react-native-snackbar";
import { createThumbnail } from "react-native-create-thumbnail";
import { setShowAddPostUploadDialog } from "../../../redux/slice/DialogSlice";
import { BackHandler } from "react-native";

type Props = {}

type addPostNavProp = StackNavigationProp<AllScreenStackParamList>;

const AddPostController : FC<Props> = () =>
{
  const navigation = useNavigation<addPostNavProp>();
  const dispatch = useAppDispatch();
  const {addPostDesEdtTxt,selectPostMenuCatId,
         selectPostFoodId,selectFoodEdtTxt,selectLocEdtTxt,
         selectCatEdtTxt} = useSelector((state: RootState) => state.AddPost);

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  function validateAddPost()
  {
    if(addPostDesEdtTxt != '')
    {
      if(selectCatEdtTxt != '')
      {
        if(selectFoodEdtTxt != '')
        {
          if(selectLocEdtTxt != '')
          {
            //generateThumbnail(videoPathData)
          }
          else
          {
            Snackbar.show({ text:"please enter location", duration: Snackbar.LENGTH_LONG, });
          }
        }
        else
        {
          Snackbar.show({ text:"please select food", duration: Snackbar.LENGTH_LONG, });
        }
      }
      else
      {
        Snackbar.show({ text:"please select food category", duration: Snackbar.LENGTH_LONG, });
      }
    }
    else
    {
      Snackbar.show({ text:"please write description", duration: Snackbar.LENGTH_LONG, });
    }
  }

  function generateThumbnail(filePath : string)
  {
    dispatch(setShowAddPostUploadDialog(true))
    createThumbnail({
      url: "file://" + filePath,
      timeStamp: 10000,
    }).then(response =>
    {
      saveThumbNailDatabase(response.path)
    }).catch((err) =>
    {
      console.log({ err });
    });

  }

  function saveThumbNailDatabase(filePath : string)
  {
    const lastPath = filePath.substring(filePath.lastIndexOf('/') + 1)
    const storageRef = storage().ref().child('PostThumbNail').child(lastPath);
    storageRef.putFile(filePath)
      .then(() =>
      {
        storageRef.getDownloadURL().then((url) =>
        {
          //savePostVideoDatabase(videoPathData,url)
        })
      })
      .catch((e) =>
      {
        console.log('Error' + e);
      })
  }

  function savePostVideoDatabase(videoFilePath : string,thumbNailUrl : string)
  {
    const lastPath = videoFilePath.substring(videoFilePath.lastIndexOf('/') + 1)
    const storageRef = storage().ref().child('PostVideos').child(lastPath);
    storageRef.putFile(videoFilePath)
      .then(() =>
      {
        storageRef.getDownloadURL().then((url) =>
        {
          createPostNode(url,thumbNailUrl)
        })
      })
      .catch((e) =>
      {
        console.log('Error' + e);
      })
  }

  function createPostNode(postUrl : string,thumbNailPath : string)
  {
    try
    {
      const userId : any = auth().currentUser?.uid;

      const postRef =
        database()
          .ref()
          .child("Post")
          .push()

      const foodCatCatObj = {
        postVideo : postUrl,
        postUserId : userId,
        postThumbNail : thumbNailPath,
        postDes : addPostDesEdtTxt,
        postKey : postRef.key,
        postLocation : selectLocEdtTxt,
        resId : userId,
        parentCatId : selectPostMenuCatId,
        foodId : selectPostFoodId
      }

      postRef.set(foodCatCatObj)
        .then(() =>
        {
          dispatch(setSelectFoodEdtTxt(''))
          dispatch(setSelectPostMenuCatId(''))
          dispatch(setSelectPostFoodId(''))
          dispatch(setSelectFoodEdtTxt(''))
          dispatch(setSelectCatEdtTxt(''))
          dispatch(setAddPostDesEdtTxt(''))
          dispatch(setShowAddPostUploadDialog(false))
          navigation.navigate('Camera')
        });
    }
    catch (e)
    {
      console.log("RES_PROFILE_ERROR : " + e);
    }
  }

  useEffect(() =>
  {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <AddPostView
      videoPath={'videoPathData'}
      addPostBtnClick={() => validateAddPost()}/>
  )
}

export default AddPostController ;
