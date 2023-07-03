import React, { FC, useEffect } from "react";
import { AddCatView } from "./AddCatView";
import { BackHandler } from "react-native";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import storage from "@react-native-firebase/storage";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import Permission from "../../../hooks/Permission";
import ImagePicker from "react-native-image-crop-picker";
import { setMenuParentCatImg, setMenuParentCatName } from "../../../redux/slice/CatSlice";
import Snackbar from "react-native-snackbar";

type Props = {}

type catNavProp = StackNavigationProp<AllScreenStackParamList>;

const AddCatController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();
  const Cat = useSelector((state: RootState) => state.Cat);
  const navigation = useNavigation<catNavProp>();

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }


  function checkCatImgPermission()
  {
    Permission.ReadStoragePermission().then(async (result: any) =>
    {
      if (result === 'granted')
      {
        ImagePicker.openPicker({
          mediaType: "photo",
        }).then((images) =>
        {
          dispatch(setMenuParentCatImg(images.path));
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

  function validateMenuForm()
  {
    if(Cat.menuParentCatName !== '')
    {
      saveCatImageStorage()
    }
    else
    {
      Snackbar.show({ text:"Please enter category name", duration: Snackbar.LENGTH_LONG, });
    }
  }

  function saveCatImageStorage()
  {
    if(Cat.menuParentCatImg !== '')
    {
      const lastPath = Cat.menuParentCatImg.substring(Cat.menuParentCatImg.lastIndexOf('/') + 1)
      const storageRef = storage().ref().child('Menu Parent Images').child(lastPath);
      storageRef.putFile(Cat.menuParentCatImg)
        .then(() =>
        {
          storageRef.getDownloadURL().then((url) =>
          {
            createMenuNode(url)
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

  function createMenuNode(menuCatUrl : string)
  {
    try
    {
      const resId : any = auth().currentUser?.uid;

      const menuParentCatRef = database().ref()
        .child("Menu")
        .child(resId.toString())
        .push()

      const parentCatObj = {
        menuCatImg : menuCatUrl,
        menuCatName : Cat.menuParentCatName,
        menuCatId : menuParentCatRef.key
      }

      menuParentCatRef.set(parentCatObj)
        .then(() =>
        {
          dispatch(setMenuParentCatImg(''))
          dispatch(setMenuParentCatName(''))
          Snackbar.show({ text:"Category Add Successfully", duration: Snackbar.LENGTH_LONG, });
        });

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
    <AddCatView
      categoryImg={() => checkCatImgPermission()}
      uploadBtn={() => validateMenuForm()}/>
  )
}

export default AddCatController ;
