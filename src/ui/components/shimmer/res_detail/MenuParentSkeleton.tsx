import React, { useRef } from "react";
import { Animated, FlatList, StyleProp, StyleSheet, TextStyle, View } from "react-native";
import {MainSkeleton} from '../MainSkeleton';
import { BORDER_RADIUS, SPACE } from "../../../../config/Dimens";
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import usePreferredTheme from '../../../../hooks/theme/usePreferredTheme';
import colors from "../../../../config/colors";

type Props = {
  isDisLoadMoreData? : boolean,
  style? : StyleProp<TextStyle>
}

export const  MenuParentSkeleton = React.memo<Props>((props) =>
{

  const number : number[] | null | undefined = props.isDisLoadMoreData ? [1] : [1,2,3,4,5,6,7];
  const {themedColors}  = usePreferredTheme();
  const scrollX = useRef(new Animated.Value(0)).current ;

  function MenuParentSkelItem(length : number,index : number)
  {
    return(
      <View style={[styles.homeTrendSkelItemMainCont,props.style,{marginTop: index === 0 ? 15 : 6,marginBottom: index === length - 1 ?  15 : 6}]}>
        <View>
          <MainSkeleton
            style={{height:50,width:50}}/>
        </View>
        <View style={{marginTop:SPACE.sm}}>
          <MainSkeleton
            style={{height:10,width:50}}/>
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
        renderItem={({item, index}) => MenuParentSkelItem(number?.length,index)}
        keyExtractor={(item, index) => index.toString()}/>
    </View>
  )
})

const styles = StyleSheet.create({
  homeTrendSkelItemMainCont : {
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS.lg,
    backgroundColor:colors.colors.white,
  },

})
