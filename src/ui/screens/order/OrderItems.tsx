import React from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from "../../components/AppText";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import Ionicons from "react-native-vector-icons/Ionicons";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { orderObj } from "../../../models/OrdersModel";
import { Fonts } from "../../../config";

type Props = {
  item : orderObj,
  length : number,
  index : number
}

type orderNavProp = StackNavigationProp<AllScreenStackParamList>;

export const OrderItems = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const navigation = useNavigation<orderNavProp>();

  return(
    <TouchableOpacity
      onPress={() => navigation.navigate('OrderDetail',{orderData : props.item,orderTotal : props.item.orderTotal})}
      activeOpacity={0.6}
      style={[styles.orderItemMainCont,{
        marginTop: props.index === 0 ? SPACE._2lg : SPACE.xs,
        marginBottom: props.index === props.length - 1 ?  SPACE._2lg : SPACE.xs,
        backgroundColor:themedColors.cardBgColor}]}>
      <View style={styles.orderItemNameCont}>
        <View>
          <AppText
            style={[styles.orderItemNoTxt,{color:themedColors.primaryTxtColor}]}
            text={"Order No : " + props.item.orderNum}/>
        </View>
        <View style={{marginTop:SPACE.xs}}>
          <AppText
            style={[styles.orderItemDateTxt,{color:themedColors.secondaryTxtColor}]}
            text={"Order Date : " + props.item.orderDate}/>
        </View>
      </View>
      <View style={[styles.orderItemIconMainCont,{backgroundColor:themedColors.cardPrimaryColor}]}>
        <View style={styles.orderItemIconSubCont}>
          <Ionicons
            size={18}
            color={themedColors.black}
            name={"ios-chevron-forward-outline"}/>
        </View>
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  orderItemMainCont : {
    flexDirection:'row',
    borderRadius:BORDER_RADIUS.lg,
    padding:SPACE._2lg,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
  },
  orderItemNameCont : {
    flex:1
  },
  orderItemIconMainCont : {
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS._8xl,
  },
  orderItemIconSubCont : {
    height:30,
    width:30,
    justifyContent:'center',
    alignItems:'center',
  },
  orderItemNoTxt : {
    fontSize:FONT_SIZE.base,
    fontFamily:Fonts.bold,
  },
  orderItemDateTxt : {
    fontSize:FONT_SIZE.xs,
    fontFamily:Fonts.semi_bold,
  }
})
