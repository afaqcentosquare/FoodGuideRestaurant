import React from 'react';
import {StyleSheet, View} from 'react-native';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppText} from './AppText';
import { GILROY, MONTSERRAT, POPPINS } from "../../config";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../config/Dimens";
import usePreferredTheme from '../../hooks/theme/usePreferredTheme';

type Props = {
    iconType? : any,
    iconName? : string,
    iconTxt? : string,
    iconSize? : number,
    numberOfLines? : number,
    iconTxtStyle? : any
}

export const IconText = React.memo<Props>((props) =>
{
    const {themedColors}  = usePreferredTheme()

    return(
       <View style={styles.iconTxtMainCont}>
           <View style={styles.iconCont}>
               <props.iconType
                   color={themedColors.secondaryTxtColor}
                   size={props.iconSize}
                   name={props.iconName}/>
           </View>
           <View style={styles.iconTxtCont}>
               <AppText
                   numberOfLine={props.numberOfLines}
                   style={[styles.iconTxt,props.iconTxtStyle,{color : themedColors.secondaryTxtColor}]}
                   text={props.iconTxt}/>
           </View>
       </View>

    )
})

const styles = StyleSheet.create({
    iconTxtMainCont : {
        flexDirection:'row',
        alignItems:'center',
        paddingStart:2,
    },
    iconCont : {
        backgroundColor:"#E5E5E5",
        borderRadius:BORDER_RADIUS._8xl,
        height:30,
        width:30,
        justifyContent:'center',
        alignItems:'center'
    },
    iconTxtCont : {
        flex:1,
        marginStart:SPACE.sm,
        justifyContent: 'center',
    },
    iconTxt : {
        fontFamily:GILROY.semi_bold,
        paddingStart:2,
        lineHeight:18,
        letterSpacing:1,
        includeFontPadding:false,
        fontSize:FONT_SIZE.xs,
    }
})
