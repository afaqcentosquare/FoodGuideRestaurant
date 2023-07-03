import React from "react";
import { Screens } from "../../components/Screens";
import { FlatList, StyleSheet, View } from "react-native";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { BackBtnHeader } from "../../components/headers/BackBtnHeader";
import { BORDER_RADIUS } from "../../../config/Dimens";
import { OrderDetailItem } from "./OrderDetailItem";
import { orderObj } from "../../../models/OrdersModel";
import strings from "../../../config/languages/LocalizedStrings";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";

type Props = {
  orderData : orderObj
}

type orderDetailNavProp = StackNavigationProp<AllScreenStackParamList>;

export const OrderDetailView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<orderDetailNavProp>();
  const {themedColors} = usePreferredTheme();
  const Strings = strings;
  const {
    odHeadTitle
  } = Strings

  const data = [
    {
      id : 0,
      name : 'header'
    },
    {
      id : 1,
      name : 'order'
    }
  ]

  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={[styles.odMainCont,{backgroundColor:themedColors.bgColor}]}>
        <BackBtnHeader
          backBtnClick={() => navigation.goBack()}
          backBtnHeaderCont={styles.odHeadCont}
          backBtnVisible={true}
          title={odHeadTitle}/>
        <View style={[styles.odHeadListCont,{backgroundColor:themedColors.bgColor}]}>
          <FlatList
            data={data}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({item,index}) =>
              <OrderDetailItem
                orderData={props.orderData}
                item={item}/>}
            keyExtractor={(item, index) => index.toString()}/>
        </View>
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({
  odMainCont : {
    flex:1
  },
  odHeadCont : {
    borderBottomRightRadius:BORDER_RADIUS.xl,
    borderBottomLeftRadius:BORDER_RADIUS.xl
  },
  odHeadListCont : {
    flex:1,
  }
})
