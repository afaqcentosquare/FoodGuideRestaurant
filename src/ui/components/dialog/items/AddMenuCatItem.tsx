import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../../AppText";
import { categoryObj, foodObj } from "../../../../models/CategoryModel";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../../config/Dimens";
import { useAppDispatch } from "../../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/stores/store";
import { setFoodCatName, setSelectFoodId } from "../../../../redux/slice/FoodSlice";
import { GILROY } from "../../../../config";
import usePreferredTheme from "../../../../hooks/theme/usePreferredTheme";
import { setDialogSelectCatId, setShowAddPostCatDialog } from "../../../../redux/slice/DialogSlice";
import { setSelectCatEdtTxt, setSelectPostMenuCatId } from "../../../../redux/slice/AddPostSlice";

type Props = {
  item : categoryObj,
  index : number,
  length : number,
}

export const AddMenuCatItem = React.memo<Props>((props) =>
{
  const dispatch = useAppDispatch();
  const {themedColors} = usePreferredTheme();
  const food = useSelector((state: RootState) => state.Food);
  const {menuCatId,menuCatName} = props.item

  return(
    <TouchableOpacity
      onPress={() => {
        dispatch(setDialogSelectCatId(menuCatId))
        dispatch(setSelectFoodId(menuCatId))
        dispatch(setFoodCatName(menuCatName))
        dispatch(setShowAddPostCatDialog(false))
        dispatch(setSelectCatEdtTxt(menuCatName))
        dispatch(setSelectPostMenuCatId(menuCatId))
      }}
      activeOpacity={0.6}
      style={{marginTop: props.index === 0 ? 15 : 6,marginBottom: props.index === props.length - 1 ?  15 : 6,flexDirection:'row',alignItems:'center'}}>
      <View style={{justifyContent:'center',alignItems:'center',height:30,width:30,backgroundColor:themedColors.bgColor,borderRadius:BORDER_RADIUS._8xl}}>
        <Image
          style={{height:20,width:20,borderRadius:BORDER_RADIUS._8xl}}
          source={{uri : props.item.menuCatImg}}/>
      </View>
      <View style={{marginStart:SPACE._2md}}>
        <AppText
          style={{fontFamily:GILROY.semi_bold,fontSize:FONT_SIZE.xs}}
          text={props.item.menuCatName}/>
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({

})
