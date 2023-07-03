import React, { FC, useEffect } from "react";
import { AddDealsView } from "./AddDealsView";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { useNavigation } from "@react-navigation/native";
import Permission from "../../../hooks/Permission";
import ImagePicker from "react-native-image-crop-picker";
import storage from "@react-native-firebase/storage";
import database from "@react-native-firebase/database";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { setDealImage } from "../../../redux/slice/DealSlice";
import Snackbar from "react-native-snackbar";
import { BackHandler } from "react-native";

type Props = {}

type addFoodCatNavProp = StackNavigationProp<AllScreenStackParamList>;

const AddDealsController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();
  const deal = useSelector((state: RootState) => state.Deal);
  const { dealImage } = deal
  const navigation = useNavigation<addFoodCatNavProp>();

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  function checkHomeDealsImgPermission()
  {
    Permission.ReadStoragePermission().then(async (result: any) =>
    {
      if (result === 'granted')
      {
        ImagePicker.openPicker({
          mediaType: "photo",
        }).then((images) =>
        {
          dispatch(setDealImage(images.path));
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

  function saveDealsImgStorage()
  {
    if(dealImage !== '')
    {
      const lastPath = dealImage.substring(dealImage.lastIndexOf('/') + 1)
      const storageRef = storage().ref().child('DealsImages').child(lastPath);
      storageRef.putFile(dealImage)
        .then(() =>
        {
          storageRef.getDownloadURL().then((url) =>
          {
            createHomeDealsNode(url)
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

  function createHomeDealsNode(dealsImgUrl : string)
  {
    try
    {
      //const resId : any = auth().currentUser?.uid;

      const dealsRef = database().ref()
        .child("Home")
        .child("Deals")
        .push()

      const homeDealsCatObj = {
        dealsImg : dealsImgUrl,
        dealsId : dealsRef.key
      }

      dealsRef.set(homeDealsCatObj)
        .then(() =>
        {
          dispatch(setDealImage(''))
          Snackbar.show({ text:"Deal image added", duration: Snackbar.LENGTH_LONG, });
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
    <AddDealsView
      homeDealsImg={() => checkHomeDealsImgPermission()}
      uploadDealsImgBtn={() => saveDealsImgStorage()}/>
  )
}

export default AddDealsController ;
