import React, { useState } from "react";
import { FlatList, Platform, StyleSheet, useWindowDimensions, View } from "react-native";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { BORDER_RADIUS, FONT_SIZE, height, SPACE } from "../../../config/Dimens";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { RootState } from "../../../redux/stores/store";
import { useSelector } from "react-redux";
import { HomeItem } from "./HomeItem";
import { TextHeader } from "../../components/headers/TextHeader";
import { postObj } from "../../../models/PostModel";
import LottieView from 'lottie-react-native';
import { AppText } from "../../components/AppText";
import { GILROY } from "../../../config";
import { useAppDispatch } from "../../../redux";

type Props = {
  onReachEnd : () => void,
  postVideoList : postObj[],
}

type homeNavProp = StackNavigationProp<AllScreenStackParamList>;

const BOTTOM_HEIGHT = Platform.OS === 'ios' ? 176 : 135

export const HomeView = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const {height} = useWindowDimensions();
  const { footerLoading,noMoreData} = useSelector((state: RootState) => state.Home);
  let [activeVideoIndex,setActiveVideoIndex] = useState(0);

  function listSearchJobFooter()
  {
    return(
      <>
        {footerLoading && <View style={{ height: 60 }}>
          <LottieView source={require("../../../assets/images/pagination_loader.json")} autoPlay loop />
        </View>}
        {noMoreData &&
          <View style={{marginBottom:SPACE._2lg,justifyContent:'center',alignItems:'center',width:'100%' }}>
            <View style={{height:120,width:120}}>
              <LottieView source={require("../../../assets/images/no_more_data.json")} autoPlay loop />
            </View>
            <View>
              <AppText
                style={{fontFamily:GILROY.semi_bold,fontSize:FONT_SIZE.xs}}
                text={"No More Videos Found"}/>
            </View>
          </View>}
      </>

    )
  }

  return(
    <View style={{flex:1,backgroundColor:themedColors.bgColor}}>
      <TextHeader
        txtHeadCont={{paddingTop:SPACE._2md,paddingBottom:SPACE.md,borderBottomRightRadius:SPACE.xl,borderBottomLeftRadius:BORDER_RADIUS.xl}}
        titleTxtVisible={true}
        title={"Home"}/>
      <View style={{flex:1}}>
        <FlatList
          data={props.postVideoList}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          pagingEnabled={true}
          snapToAlignment={'center'}
          decelerationRate={'fast'}
          onEndReachedThreshold={0.10}
          onEndReached={() => props.onReachEnd()}
          ListFooterComponent={() => listSearchJobFooter()}
          onScroll={(e : any) => {
            const index = Math.round(e.nativeEvent.contentOffset.y / (height - BOTTOM_HEIGHT))
            setActiveVideoIndex(index)
            //dispatch(setIndexActive(index))
            //activeVideoIndex = index
          }}
          renderItem={({item,index}) =>
            <HomeItem
              item={item}
              isActive={activeVideoIndex === index}
              activeIndex={activeVideoIndex}
              length={props.postVideoList?.length}
              index={index}/>}
          keyExtractor={(item, index) => index.toString()}/>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  profileHeadMainCont : {
    paddingTop:SPACE._2md,
    paddingBottom:SPACE._2md,
    paddingStart:SPACE._2lg,
    paddingEnd:SPACE._2lg,
    borderBottomLeftRadius:BORDER_RADIUS.xl,
    borderBottomRightRadius:BORDER_RADIUS.xl
  },
  signInBtnHeight : {
    height:45
  },
  signInBtnCont : {
    marginTop:SPACE._2xl,
  },
})
