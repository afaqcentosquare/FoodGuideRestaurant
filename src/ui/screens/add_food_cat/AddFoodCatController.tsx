import React, { FC, useEffect } from "react";
import { AddFoodCatView } from "./AddFoodCatView";
import Permission from "../../../hooks/Permission";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { setFoodCatImg, setFoodCatName } from "../../../redux/slice/FoodCatSlice";
import Snackbar from "react-native-snackbar";
import { BackHandler } from "react-native";

type Props = {}

type addFoodCatNavProp = StackNavigationProp<AllScreenStackParamList>;

const AddFoodCatController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();
  const FoodCat = useSelector((state: RootState) => state.FoodCat);
  const navigation = useNavigation<addFoodCatNavProp>();


  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  function checkFoodCatImgPermission()
  {
    Permission.ReadStoragePermission().then(async (result: any) =>
    {
      if (result === 'granted')
      {
        ImagePicker.openPicker({
          mediaType: "photo",
        }).then((images) =>
        {
          dispatch(setFoodCatImg(images.path));
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

  function validateFoodCatForm()
  {
    if(FoodCat.foodCatName !== '')
    {
      saveFoodCatImgStorage()
    }
    else
    {
      Snackbar.show({ text:"Please enter category name", duration: Snackbar.LENGTH_LONG, });
    }
  }

  function saveFoodCatImgStorage()
  {
    if(FoodCat.foodCatImg !== '')
    {
      const lastPath = FoodCat.foodCatImg.substring(FoodCat.foodCatImg.lastIndexOf('/') + 1)
      const storageRef = storage().ref().child('FoodParentCatImages').child(lastPath);
      storageRef.putFile(FoodCat.foodCatImg)
        .then(() =>
        {
          storageRef.getDownloadURL().then((url) =>
          {
            createFoodCatNode(url)
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

  function createFoodCatNode(foodCatUrl : string)
  {
    try
    {
      const resId : any = auth().currentUser?.uid;

      const foodCatRef = database().ref()
        .child("FoodCategory")
        .push()

      const foodCatCatObj = {
        foodCatImg : foodCatUrl,
        foodCatName : FoodCat.foodCatName,
        foodCatId : foodCatRef.key
      }

      foodCatRef.set(foodCatCatObj)
        .then(() =>
        {
          dispatch(setFoodCatName(''))
          dispatch(setFoodCatImg(''))
          Snackbar.show({ text:"Category Add Successfully", duration: Snackbar.LENGTH_LONG, });
        });

      /*const homeCatRef = database().ref()
        .child("Home")
        .child("Category")
        .push()

      const homeCatObj = {
        foodCatId : foodCatRef.key
      }

      homeCatRef.set(homeCatObj)
        .then(() =>
        {
          ToastAndroid.show("Parent Category Add",ToastAndroid.LONG);
        })*/

    }
    catch (e)
    {
      console.log("ERROR : " + e);
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
    <AddFoodCatView
      foodCategoryImg={() => checkFoodCatImgPermission()}
      uploadFoodCatBtn={() => validateFoodCatForm()}/>
  )
}

export default AddFoodCatController ;
