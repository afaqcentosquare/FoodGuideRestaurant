import React, { useEffect } from "react";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { FlatList, Image, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../AppText";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import colors from "../../../config/colors";
// @ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";
import { GILROY } from "../../../config";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { AddMenuCatItem } from "./items/AddMenuCatItem";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../../redux";
import { setFoodCatList } from "../../../redux/slice/FoodSlice";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { categoryObj, foodObj } from "../../../models/CategoryModel";
import {
  setAddPostCatList,
  setAddPostFoodList,
  setShowAddPostCatDialog,
  setShowPostFoodDialog,
} from "../../../redux/slice/DialogSlice";
import { AddFoodItem } from "./items/AddFoodItem";

type Props = {}

type selectCatDialogNavProp = StackNavigationProp<AllScreenStackParamList>;

export const SelectFoodDialog = React.memo<Props>((props) =>
{
  const dispatch = useAppDispatch();
  const navigation = useNavigation<selectCatDialogNavProp>();
  const {themedColors} = usePreferredTheme();
  const { selectPostMenuCatId } = useSelector((state: RootState) => state.AddPost);
  const food = useSelector((state: RootState) => state.Food);
  const dialog = useSelector((state: RootState) => state.Dialog);
  const {} = food
  const  {addPostFoodList} = dialog

  function getFoodData()
  {
    try
    {
      const userId : any = auth().currentUser?.uid;
      const showDataRef =
        database()
          .ref()
          .child("Menu")
          .child(userId)
          .child(selectPostMenuCatId)
          .child("Food")
      showDataRef.on('value', (foodDataSnap)  =>
      {
        let selectFoodArr : Array<foodObj>  = []
        // @ts-ignore
        foodDataSnap.forEach((foodChildSnap) =>
        {
          selectFoodArr.push(foodChildSnap.val())
        })
        dispatch(setAddPostFoodList(selectFoodArr));
      })
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }
  }

  useEffect(() =>
  {
    getFoodData()
  },[])

  return(
    <Modal
      visible={true}
      transparent
      animationType='fade'
      hardwareAccelerated>
      <View style={{flex:1,backgroundColor:colors.colors.transparent,justifyContent:'center'}}>
        <View style={{marginStart:SPACE._4xl,marginEnd:SPACE._4xl,paddingBottom:SPACE._2lg,paddingTop:SPACE._2xl,paddingEnd:SPACE._2lg,paddingStart:SPACE._2lg,borderRadius:BORDER_RADIUS.lg,backgroundColor:themedColors.cardBgColor,}}>
          <TouchableOpacity
            onPress={() => dispatch(setShowPostFoodDialog(false))}
            activeOpacity={0.6}
            style={{borderRadius:BORDER_RADIUS._8xl,height:30,width:30,backgroundColor:themedColors.bgColor,justifyContent:'center',alignItems:'center'}}>
            <Ionicons
              name={"close"}/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
            {
              dispatch(setShowAddPostCatDialog(false))
              navigation.navigate("AddFoodCat");
            }}
            activeOpacity={0.6}
            style={{justifyContent:'center',alignItems:'center'}}>
            <View style={{justifyContent:'center',alignItems:'center',height:60,width:60,backgroundColor:themedColors.bgColor,borderRadius:BORDER_RADIUS._8xl}}>
              <Ionicons
                size={30}
                name={"add"}/>
            </View>
            <View style={{marginTop:SPACE._2lg}}>
              <AppText
                style={{fontFamily:GILROY.semi_bold,fontSize:FONT_SIZE.xs}}
                text={"Add Food Category"}/>
            </View>
          </TouchableOpacity>
          <View style={{height:200,backgroundColor: "#FFFFFF", marginTop: SPACE._2md, borderRadius: BORDER_RADIUS.lg }}>
            <FlatList
              data={addPostFoodList}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) =>
                <AddFoodItem
                  item={item}
                  index={index}
                  length={food.foodCatList.length} />}
              keyExtractor={(item, index) => index.toString()} />
          </View>
        </View>
      </View>
    </Modal>
  )
})

const styles = StyleSheet.create({

})
