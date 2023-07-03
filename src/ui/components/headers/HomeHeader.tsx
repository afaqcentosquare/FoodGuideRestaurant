import React from "react";
import colors from "../../../config/colors";
import {StyleSheet, View} from "react-native";
import {AppText} from "../AppText";
import {POPPINS} from "../../../config";
import {FONT_SIZE} from '../../../config/Dimens';

type Props = {}

export const HomeHeader = React.memo<Props>(() =>
{
    return(
        <View style={styles.homeHeaderCont}>
            <View style={styles.homeHeaderNameCont}>
                <AppText style={styles.homeHeaderNameTxt} text={"Jhon Doe"}/>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
  homeHeaderCont : {
    paddingStart:15,
    paddingEnd:15,
    paddingBottom:60,
    paddingTop:10,
    flexDirection:'row',
    alignItems:'center'
  },

  homeHeaderImg : {
    height:40,
    width:40,
    borderRadius:80
  },

  homeHeaderNameCont : {
    flex:1,
    paddingStart:10
  },

  homeHeaderNameTxt : {
    fontFamily:POPPINS.medium,
    fontSize:FONT_SIZE.xl,
    lineHeight:22,
    color : colors.colors.black
  },

  homeHeaderIconCont : {
    flexDirection:'row'
  }
})
