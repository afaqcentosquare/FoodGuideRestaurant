import React, { useRef } from "react";
import { Animated, FlatList, StyleProp, StyleSheet, TextStyle, View } from "react-native";
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { MainSkeleton } from "./MainSkeleton";
import { BORDER_RADIUS, SPACE } from "../../../config/Dimens";
import colors from "../../../config/colors";

type Props = {
  isDisLoadMoreData? : boolean,
  style? : StyleProp<TextStyle>
}

export const RestaurantSkeleton = React.memo<Props>((props) =>
{

  const number : number[] | null | undefined = props.isDisLoadMoreData ? [1] : [1,2,3,4,5,6];
  const {themedColors}  = usePreferredTheme();
  const scrollX = useRef(new Animated.Value(0)).current ;

  function SearchSkelItem(length : number,index : number)
  {
    return(
      <View style={[styles.homeTopResSkelItemMainCont,props.style]}>
        <View style={styles.homeTopResSubCont}>
          <View style={styles.homeTopResSkelItemIconCont}>
            <MainSkeleton
              style={styles.homeTopResSkelItemHeartIcon}/>
          </View>
          <View style={styles.homeTopResSkelItemBottomCont}>
            <View>
              <MainSkeleton
                style={styles.homeTopResSkelItemIcon}/>
            </View>
            <View style={{marginTop:SPACE.xs}}>
              <MainSkeleton
                style={[styles.homeTopResSkelItemIcon,{width: 100}]}/>
            </View>
            <View style={{marginTop:SPACE.xs}}>
              <MainSkeleton
                style={[styles.homeTopResSkelItemIcon,{width: 90}]}/>
            </View>
          </View>
        </View>
      </View>
    )

  }

  return(
    <View style={{marginTop:SPACE._2xs,marginBottom:SPACE._2xs}}>
      <FlatList
        data={number}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => SearchSkelItem(number?.length,index)}
        keyExtractor={(item, index) => index.toString()}/>
    </View>
  )
})

const styles = StyleSheet.create({
  homeTopResSkelItemMainCont : {
    flex:1,
    maxWidth:'50%',
  },
  homeTopResSubCont : {
    flex:1,
    height:250,
    borderRadius:BORDER_RADIUS.lg,
    backgroundColor:colors.colors.white,
    margin:SPACE._2xs
  },
  homeTopResSkelItemBottomCont : {
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    borderRadius:BORDER_RADIUS.lg,
    backgroundColor:"#f5f5f5",
    marginTop:SPACE._2lg,
    marginStart:SPACE.sm,
    marginEnd:SPACE.sm,
    marginBottom:SPACE.sm,
    paddingTop:SPACE.sm,
    paddingBottom:SPACE.sm,
    paddingStart:SPACE.sm,
    paddingEnd:SPACE.xl,
  },
  homeTopResSkelItemIconCont : {
    marginTop:SPACE._2md,
    marginEnd:SPACE._2md,
    alignItems:'flex-end'
  },
  homeTopResSkelItemIcon : {
    height:15,
    width:120,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center',
  },
  homeTopResSkelItemHeartIcon : {
    height:25,
    width:25,
  }
})
