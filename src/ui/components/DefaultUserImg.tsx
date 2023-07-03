import React from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet, View } from "react-native";
import { BORDER_RADIUS, SPACE } from "../../config/Dimens";
import usePreferredTheme from "../../hooks/theme/usePreferredTheme";

type Props = {
  showAddIcon? : boolean
}

export const DefaultUserImg = React.memo<Props>((props) =>
{
  const {themedColors}  = usePreferredTheme()
  const {showAddIcon} = props

  return(
    <View>
      <View style={[styles.duiMainCont,{backgroundColor:themedColors.cardBgColor}]}>
        <Ionicons
          color={themedColors.black}
          size={45}
          name={"md-images"} />
      </View>
      {showAddIcon &&
        <View style={[styles.addIconCont,{backgroundColor: themedColors.blue,}]}>
          <Ionicons
            color={themedColors.secondaryIconColor}
            size={15}
            name={"ios-add"} />
        </View>}
    </View>
  )
})

const styles = StyleSheet.create({
  duiMainCont : {
    width:120,
    height:120,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS._8xl
  },
  addIconCont : {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BORDER_RADIUS._8xl,
    width: 25,
    height: 25,
    marginBottom:SPACE._2md,
    position: "absolute",
    bottom:0,
    right: 0,
  }
})
