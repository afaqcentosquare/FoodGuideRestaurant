import React, { useRef } from "react";
import { Animated, FlatList, StyleProp, StyleSheet, TextStyle, View } from "react-native";
import {MainSkeleton} from '../MainSkeleton';
import { BORDER_RADIUS, FONT_SIZE, SPACE, width } from "../../../../config/Dimens";
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import usePreferredTheme from '../../../../hooks/theme/usePreferredTheme';
import colors from "../../../../config/colors";

type Props = {
  isDisLoadMoreData? : boolean,
  style? : StyleProp<TextStyle>
}

export const HomeTopResSkeleton = React.memo<Props>((props) =>
{

  const number : number[] | null | undefined = props.isDisLoadMoreData ? [1] : [1,2,3];
  const {themedColors}  = usePreferredTheme();
  const scrollX = useRef(new Animated.Value(0)).current ;

  function HomeTopResSkelItem(length : number,index : number)
  {
    return(
      <View style={[styles.homeTopResSkelItemMainCont,props.style,{marginStart: index === 0 ? 15 : 6,marginEnd: index === length - 1 ?  15 : 6}]}>
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
    )

  }

  return(
    <View>
      <FlatList
        data={number}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal={true}
        renderItem={({item, index}) => HomeTopResSkelItem(number?.length,index)}
        keyExtractor={(item, index) => index.toString()}/>
    </View>
  )
})

const styles = StyleSheet.create({
  homeTopResSkelItemMainCont : {
    width:160,
    height:250,
    borderRadius:BORDER_RADIUS.lg,
    backgroundColor:colors.colors.white,
    marginBottom:SPACE.sm,
    marginTop:SPACE._2lg,
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
