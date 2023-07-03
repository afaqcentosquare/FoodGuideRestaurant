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

export const  MenuChildSkeleton = React.memo<Props>((props) =>
{

  const number : number[] | null | undefined = props.isDisLoadMoreData ? [1] : [1,2,3,4,5,6];
  const {themedColors}  = usePreferredTheme();
  const scrollX = useRef(new Animated.Value(0)).current ;

  function MenuChildSkelItem(length : number,index : number)
  {
    return(
      <View style={[styles.homeTrendSkelItemMainCont,props.style]}>
        <View style={{ borderRadius:BORDER_RADIUS.lg,
          margin:SPACE._2xs,
          backgroundColor:colors.colors.white}}>
          <View style={styles.homeTrendSkelItemIconCont}>
            <MainSkeleton
              style={styles.homeTrendSkelItemHeartIcon}/>
          </View>
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <MainSkeleton
              style={{ height:85, width:85,
                borderRadius:BORDER_RADIUS._8xl,}}/>
          </View>
          <View style={{marginStart:SPACE._2md,marginEnd:SPACE._2md}}>
            <View style={{marginTop:SPACE._2lg}}>
              <MainSkeleton
                style={{ height:13, width:110}}/>
            </View>
            <View style={{marginTop:SPACE._2xs}}>
              <MainSkeleton
                style={{ height:13, width:80}}/>
            </View>
            <View style={{marginTop:SPACE._2xs}}>
              <MainSkeleton
                style={{ height:13, width:50}}/>
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
        numColumns={2}
        renderItem={({item, index}) => MenuChildSkelItem(number?.length,index)}
        keyExtractor={(item, index) => index.toString()}/>
    </View>
  )
})

const styles = StyleSheet.create({
  homeTrendSkelItemMainCont : {
    flex:1,
    maxWidth:'50%',
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
