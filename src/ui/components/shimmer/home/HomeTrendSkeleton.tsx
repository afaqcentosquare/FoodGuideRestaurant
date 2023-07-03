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

export const  HomeTrendSkeleton = React.memo<Props>((props) =>
{

  const number : number[] | null | undefined = props.isDisLoadMoreData ? [1] : [1,2,3];
  const {themedColors}  = usePreferredTheme();
  const scrollX = useRef(new Animated.Value(0)).current ;

  function HomeTrendSkelItem(length : number,index : number)
  {
    return(
      <View style={[styles.homeTrendSkelItemMainCont,props.style,{marginStart: index === 0 ? 15 : 6,marginEnd: index === length - 1 ?  15 : 6}]}>
        <View style={{flex:1,width:130,}}>
          <View style={styles.homeTrendSkelItemIconCont}>
            <MainSkeleton
              style={styles.homeTrendSkelItemHeartIcon}/>
          </View>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <MainSkeleton
              style={{ height:85, width:85,
                borderRadius:BORDER_RADIUS._8xl,}}/>
          </View>
          <View style={{alignItems:'center'}}>
            <View style={{marginTop:SPACE._2lg}}>
              <MainSkeleton
                style={{ height:15, width:110}}/>
            </View>
            <View style={{marginTop:SPACE._2xs}}>
              <MainSkeleton
                style={{ height:15, width:110}}/>
            </View>
            <View style={{marginTop:SPACE._2xs}}>
              <MainSkeleton
                style={{ height:15, width:110}}/>
            </View>
          </View>
          <View style={{marginEnd:SPACE._2md,marginTop:SPACE._2lg,marginBottom:SPACE._2md,alignItems:'flex-end'}}>
            <MainSkeleton
              style={{ width:20, height:20, borderRadius:BORDER_RADIUS._2xs,}}/>
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
        renderItem={({item, index}) => HomeTrendSkelItem(number?.length,index)}
        keyExtractor={(item, index) => index.toString()}/>
    </View>
  )
})

const styles = StyleSheet.create({
  homeTrendSkelItemMainCont : {
    width:130,
    borderRadius:BORDER_RADIUS.lg,
    backgroundColor:colors.colors.white,
    marginBottom:SPACE.sm,
    marginTop:SPACE._2lg,
  },
  homeTrendSkelItemBottomCont : {
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
  homeTrendSkelItemIconCont : {
    marginTop:SPACE._2md,
    marginEnd:SPACE._2md,
    alignItems:'flex-end'
  },
  homeTrendSkelItemIcon : {
    height:15,
    width:120,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center',
  },
  homeTrendSkelItemHeartIcon : {
    height:25,
    width:25,
  }
})
