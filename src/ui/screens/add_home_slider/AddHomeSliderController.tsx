import React, { FC, useEffect } from "react";
import { AddHomeSliderView } from "./AddHomeSliderView";
import Permission from "../../../hooks/Permission";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import database from "@react-native-firebase/database";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { setSliderImage } from "../../../redux/slice/SliderSlice";
import Snackbar from "react-native-snackbar";
import { BackHandler } from "react-native";

type Props = {}

type addFoodCatNavProp = StackNavigationProp<AllScreenStackParamList>;

const AddHomeSliderController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();
  const slider = useSelector((state: RootState) => state.Slider);
  const { sliderImage } = slider
  const navigation = useNavigation<addFoodCatNavProp>();

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  function checkHomeSliderImgPermission()
  {
    Permission.ReadStoragePermission().then(async (result: any) =>
    {
      if (result === 'granted')
      {
        ImagePicker.openPicker({
          mediaType: "photo",
        }).then((images) =>
        {
          dispatch(setSliderImage(images.path));
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

  function saveSliderImgStorage()
  {
    if(sliderImage !== '')
    {
      const lastPath = sliderImage.substring(sliderImage.lastIndexOf('/') + 1)
      const storageRef = storage().ref().child('SliderImages').child(lastPath);
      storageRef.putFile(sliderImage)
        .then(() =>
        {
          storageRef.getDownloadURL().then((url) =>
          {
            createHomeNode(url)
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

  function createHomeNode(sliderImgUrl : string)
  {
    try
    {
      //const resId : any = auth().currentUser?.uid;

      const sliderRef = database().ref()
        .child("Home")
        .child("Slider")
        .push()

      const foodCatCatObj = {
        sliderImg : sliderImgUrl,
        sliderId : sliderRef.key
      }

      sliderRef.set(foodCatCatObj)
        .then(() =>
        {
          dispatch(setSliderImage(''))
          Snackbar.show({ text:"Slider image added", duration: Snackbar.LENGTH_LONG, });
        });

    }
    catch (e)
    {
      console.log("SLIDER_ERROR : " + e);
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
    <AddHomeSliderView
      homeSliderImg={() => checkHomeSliderImgPermission()}
      uploadSliderImgBtn={() => saveSliderImgStorage()}/>
  )
}

export default AddHomeSliderController ;

