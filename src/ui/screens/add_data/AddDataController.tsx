import React, { FC, useEffect } from "react";
import { AddDataView } from "./AddDataView";
import { BackHandler } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";

type Props = {}

type addDataNavProp = StackNavigationProp<AllScreenStackParamList>;

const AddDataController : FC<Props> = () =>
{
  const navigation = useNavigation<addDataNavProp>();

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  useEffect(() =>
  {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <AddDataView/>
  )
}

export default AddDataController ;
