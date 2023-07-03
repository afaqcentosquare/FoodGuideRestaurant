import React, { FC, useEffect } from "react";
import { AddFoodView } from "./AddFoodView";
import Permission from "../../../hooks/Permission";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { BackHandler, ToastAndroid } from "react-native";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import {
  setFoodCatName,
  setFoodDes,
  setFoodImg,
  setFoodName,
  setFoodPrice,
} from "../../../redux/slice/FoodSlice";
import Snackbar from "react-native-snackbar";

type Props = {}

type foodNavProp = StackNavigationProp<AllScreenStackParamList>;

const AddFoodController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();
  const navigation = useNavigation<foodNavProp>();
  const food = useSelector((state: RootState) => state.Food);
  const {foodImg,selectFoodId,foodName,foodCatName,foodPrice,foodDes,selectFoodCatResId} = food;

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  function checkFoodImgPermission()
  {
    Permission.ReadStoragePermission().then(async (result: any) =>
    {
      if (result === 'granted')
      {
        ImagePicker.openPicker({
          mediaType: "photo",
        }).then((images) =>
        {
          dispatch(setFoodImg(images.path));
          //this.setState({storyImgFilePath : images.path});
        }).catch(e =>
        {
          console.log(e);
        })
      }
      else
      {
        Snackbar.show({ text:"Please Allow Permission", duration: Snackbar.LENGTH_LONG, });
      }
    })
  }

  function validateFoodForm()
  {
    if(foodName !== '')
    {
      if(foodCatName !== '')
      {
        if(foodPrice !== '')
        {
          if(foodDes !== '')
          {
            saveFoodImageStorage()
          }
          else
          {
            Snackbar.show({ text:"Please enter description", duration: Snackbar.LENGTH_LONG, });
          }
        }
        else
        {
          Snackbar.show({ text:"Please enter price", duration: Snackbar.LENGTH_LONG, });
        }
      }
      else
      {
        Snackbar.show({ text:"Please enter category name", duration: Snackbar.LENGTH_LONG, });
      }
    }
    else
    {
      Snackbar.show({ text:"Please enter food name", duration: Snackbar.LENGTH_LONG, });
    }
  }

  function saveFoodImageStorage()
  {
    if(foodImg !== '')
    {
      const lastPath = foodImg.substring(foodImg.lastIndexOf('/') + 1)
      const storageRef = storage().ref().child('Food Images').child(lastPath);
      storageRef.putFile(foodImg)
        .then(() =>
        {
          storageRef.getDownloadURL().then((url) =>
          {
            createFoodNode(url)
          })
        })
        .catch((e) =>
        {
          console.log('Error' + e);
        })
    }
    else
    {
      Snackbar.show({ text:"Please Select Image", duration: Snackbar.LENGTH_LONG, });
    }
  }

  function createFoodNode(foodChildImgUrl : string)
  {
    try
    {
      const resId : any = auth().currentUser?.uid;

      //------------------------- add food ---------------------------

      const addFoodRef = database().ref()
        .child("Menu")
        .child(resId.toString())
        .child(selectFoodId)
        .child("Food")
        .push();

      const childCatObj = {
        parentCatId : selectFoodId,
        resId : resId,
        foodImg : foodChildImgUrl,
        foodCatName : foodCatName,
        foodName : foodName,
        foodRating : '',
        foodDes : foodDes,
        foodPrice : foodPrice,
        foodId : addFoodRef.key,
        isFoodAdded : false,
      }

      addFoodRef.set(childCatObj)
        .then(() =>
        {
          dispatch(setFoodImg(''))
          dispatch(setFoodCatName(''))
          dispatch(setFoodName(''))
          dispatch(setFoodDes(''))
          dispatch(setFoodPrice(''))
          Snackbar.show({ text:"Food Added", duration: Snackbar.LENGTH_LONG, });
        });

      //------------------------- add food category ---------------------------

      const foodCatRef = database().ref()
        .child("FoodCategory")
        .child(selectFoodCatResId)
        .child("Restaurant")
        .child(resId)

      const foodCatObj = {
        foodCatResId : resId,
      }

      foodCatRef.set(foodCatObj)
        .then(() =>
        {
          Snackbar.show({ text:"Parent Category Add", duration: Snackbar.LENGTH_LONG, });
        });

      //------------------------- add new food ---------------------------

      const homeNewFoodRef = database().ref()
        .child("Home")
        .child("NewFood")
        .push()

      const newFoodObj = {
        homeResId : resId,
        homeParentMenuId : food.selectFoodId,
        homeNewFoodId : addFoodRef.key,
      }

      homeNewFoodRef.set(newFoodObj)
        .then(() =>
        {
          Snackbar.show({ text:"Parent Category Add", duration: Snackbar.LENGTH_LONG, });
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
    <AddFoodView
      selectFoodImg={() => checkFoodImgPermission()}
      uploadFoodBtn={() => validateFoodForm()}/>
  )
}

export default AddFoodController ;
