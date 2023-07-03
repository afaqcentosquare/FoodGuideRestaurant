import React from 'react';
import { FlatList, StyleSheet, View } from "react-native";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { InboxItem } from "./InboxItem";
import { BORDER_RADIUS, SPACE } from "../../../config/Dimens";
import { TextHeader } from "../../components/headers/TextHeader";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import strings from "../../../config/languages/LocalizedStrings";

type Props = {}


export const InboxView = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const { inboxList } = useSelector((state: RootState) => state.Inbox);
  const Strings = strings;
  const {
    inboxHeadTitle
  } = Strings

  return(
    <View style={[styles.inboxMainCont,{backgroundColor:themedColors.bgColor}]}>
      <View>
        <TextHeader
          txtHeadCont={styles.inboxHeadMainCont}
          titleTxtVisible={true}
          title={inboxHeadTitle}/>
      </View>
      <View style={[styles.inboxListCont,{backgroundColor:themedColors.bgColor}]}>
        <FlatList
          data={inboxList}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({item,index}) =>
            <InboxItem
              item={item}
              length={inboxList?.length}
              index={index}/>}
          keyExtractor={(item, index) => index.toString()}/>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  inboxMainCont : {
    flex:1,
  },
  inboxHeadMainCont : {
    paddingTop:SPACE._2md,
    paddingBottom:SPACE._2lg,
    paddingStart:SPACE._2lg,
    paddingEnd:SPACE._2lg,
    borderBottomLeftRadius:BORDER_RADIUS.xl,
    borderBottomRightRadius:BORDER_RADIUS.xl
  },
  inboxHeadInputMainCont : {
    marginTop:SPACE._2md,
    marginBottom:SPACE._2lg,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg
  },
  inboxHeadInputTxtCont : {
    height:40,
  },
  inboxListCont : {
    flex:1,
  }
})
