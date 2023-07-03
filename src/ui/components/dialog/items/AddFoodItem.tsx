import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../../AppText";
import { foodObj } from "../../../../models/CategoryModel";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../../config/Dimens";
import { useAppDispatch } from "../../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/stores/store";
import { GILROY } from "../../../../config";
import usePreferredTheme from "../../../../hooks/theme/usePreferredTheme";
import { setShowPostFoodDialog } from "../../../../redux/slice/DialogSlice";
import {
  setSelectFoodEdtTxt,
  setSelectPostFoodId,
} from "../../../../redux/slice/AddPostSlice";

type Props = {
  item : foodObj,
  index : number,
  length : number,
}

export const AddFoodItem = React.memo<Props>((props) =>
{
  const dispatch = useAppDispatch();
  const {themedColors} = usePreferredTheme();
  const food = useSelector((state: RootState) => state.Food);
  const {foodName,foodId,foodImg} = props.item

  return(
    <TouchableOpacity
      onPress={() => {
        dispatch(setShowPostFoodDialog(false))
        dispatch(setSelectFoodEdtTxt(foodName))
        dispatch(setSelectPostFoodId(foodId))
      }}
      activeOpacity={0.6}
      style={{marginTop: props.index === 0 ? 15 : 6,marginBottom: props.index === props.length - 1 ?  15 : 6,flexDirection:'row',alignItems:'center'}}>
      <View style={{justifyContent:'center',alignItems:'center',height:35,width:35,backgroundColor:themedColors.bgColor,borderRadius:BORDER_RADIUS._8xl}}>
        <Image
          style={{height:25,width:25,borderRadius:BORDER_RADIUS._8xl}}
          source={{uri : foodImg}}/>
      </View>
      <View style={{marginStart:SPACE._2md}}>
        <AppText
          style={{fontFamily:GILROY.semi_bold,fontSize:FONT_SIZE.xs}}
          text={foodName}/>
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({

})
