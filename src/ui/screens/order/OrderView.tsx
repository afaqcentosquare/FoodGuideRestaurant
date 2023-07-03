import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { BORDER_RADIUS, SPACE } from "../../../config/Dimens";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { OrderItems } from "./OrderItems";
import { TextHeader } from "../../components/headers/TextHeader";
import strings from "../../../config/languages/LocalizedStrings";

type Props = {}

export const OrderView = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const { orderDataList } = useSelector((state: RootState) => state.Order);
  const Strings = strings;
  const {
    orderHeadTitle
  } = Strings

  return(
    <View style={[styles.orderMainCont,{backgroundColor:themedColors.bgColor}]}>
      <TextHeader
        txtHeadCont={styles.orderHeadCont}
        titleTxtVisible={true}
        title={orderHeadTitle}/>
      <View style={[styles.orderListCont,{backgroundColor:themedColors.bgColor}]}>
        <FlatList
          data={orderDataList}
          showsHorizontalScrollIndicator={false}
          horizontal={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) =>
            <OrderItems
              index={index}
              length={orderDataList?.length}
              item={item} />}
          keyExtractor={(item, index) => index.toString()} />
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  orderMainCont : {
    flex : 1
  },
  orderHeadCont : {
    paddingTop:SPACE._2md,
    paddingBottom:SPACE.md,
    borderBottomRightRadius:SPACE.xl,
    borderBottomLeftRadius:BORDER_RADIUS.xl
  },
  orderListCont : {
    flex: 1
  }
})
