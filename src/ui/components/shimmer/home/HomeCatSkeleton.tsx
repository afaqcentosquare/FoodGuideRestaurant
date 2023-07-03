import React, { useRef } from "react";
import { Animated, Dimensions, FlatList, StyleProp, StyleSheet, TextStyle, View } from "react-native";
import {MainSkeleton} from '../MainSkeleton';
import { BORDER_RADIUS, FONT_SIZE, SPACE, width } from "../../../../config/Dimens";
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../../config/colors';
import {GILROY} from '../../../../config';
import usePreferredTheme from '../../../../hooks/theme/usePreferredTheme';

type Props = {
  isDisLoadMoreData? : boolean,
  style? : StyleProp<TextStyle>
}

export const HomeCatSkeleton = React.memo<Props>((props) =>
{

  const number : number[] | null | undefined = props.isDisLoadMoreData ? [1] : [1,2,3];
  const {themedColors}  = usePreferredTheme();
  const scrollX = useRef(new Animated.Value(0)).current ;

  function HomeCatSkelItem(length : number,index : number)
  {
    return(
      <View style={[styles.homeCatSkelItemMainCont,props.style,{marginStart: index === 0 ? 15 : 6,marginEnd: index === length - 1 ?  15 : 6}]}>
        <View>
          <MainSkeleton
            style={[styles.homeCatSkelItemImg,{backgroundColor:themedColors.skeletonContentColor}]}/>
        </View>
        <View style={{marginTop:SPACE.md,}}>
          <MainSkeleton
            style={[styles.homeCatSkelItemTxt,{backgroundColor:themedColors.skeletonContentColor}]}/>
        </View>
        <View style={{marginTop:SPACE.md,}}>
          <MainSkeleton
            style={[styles.homeCatSkelItemIcon,{backgroundColor:themedColors.skeletonContentColor}]}/>
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
        renderItem={({item, index}) => HomeCatSkelItem(number?.length,index)}
        keyExtractor={(item, index) => index.toString()}/>
    </View>
  )
})

const styles = StyleSheet.create({
  skillsItemCont : {
    width:'100%',
    marginBottom:SPACE.sm,
    marginStart:SPACE._2lg
  },
  homeCatSkelItemMainCont : {
    flex:1,
    width:110,
    marginTop:SPACE._2lg,
    backgroundColor:colors.colors.white,
    overflow:'hidden',
    borderRadius:BORDER_RADIUS.lg,
    justifyContent:'center',
    alignItems:'center',
    padding:SPACE.xl
  },
  homeCatSkelItemImg : {
    height:60,
    width:60,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center',
  },
  homeCatSkelItemTxt : {
    width:90,
    height:12,
  },
  homeCatSkelItemIcon : {
    height:35,
    width:35,
    borderRadius:BORDER_RADIUS._8xl,
    justifyContent:'center',
    alignItems:'center',
  },
})
