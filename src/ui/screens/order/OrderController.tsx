import React, { FC, useEffect } from "react";
import { OrderView } from "./OrderView";
import database from "@react-native-firebase/database";
import { useAppDispatch } from "../../../redux";
import { setOrderDataList } from "../../../redux/slice/OrderSlice";
import { orderObj } from "../../../models/OrdersModel";
import { BackHandler } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";

type Props = {}

type orderNavProp = StackNavigationProp<AllScreenStackParamList>;

const OrderController : FC<Props> = () =>
{
  const dispatch = useAppDispatch();
  const navigation = useNavigation<orderNavProp>();

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  function getOrderData()
  {
    try
    {
      const ordersRef =
        database()
          .ref()
          .child("Orders")

      ordersRef.on('value',(orderFoodSnap) =>
      {

        let orderArr : Array<orderObj> = []
        // @ts-ignore
        orderFoodSnap.forEach((orderChildSnap) =>
        {
          orderArr.push(orderChildSnap.val())
        })

        dispatch(setOrderDataList(orderArr))
      })
    }
    catch (e)
    {
      console.log("ERROR : " + e)
    }

  }

  useEffect(() =>
  {
    getOrderData()

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <OrderView/>
  )
}

export default OrderController ;
