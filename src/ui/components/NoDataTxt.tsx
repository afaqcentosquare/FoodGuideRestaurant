import React from 'react';
import {AppText} from './AppText';
import {StyleSheet, View} from 'react-native';
import {GILROY} from '../../config';
import {FONT_SIZE, SPACE} from '../../config/Dimens';
import usePreferredTheme from '../../hooks/theme/usePreferredTheme';
import { AppButton } from './AppButton';
import LottieView from 'lottie-react-native';

type Props = {
  reloadBtnClick? : () => void,
  noDataTxt? : string,
  reloadBtnVisible? : boolean,
  noMoreDataVisible? : boolean
}

export const NoDataTxt = React.memo<Props>((props) =>
{
    const {themedColors}  = usePreferredTheme()
    const { noMoreDataVisible } = props

    return(
        <View style={styles.noDataTxtMainCont}>
            {noMoreDataVisible ?
              <View style={styles.noDataImg}>
                <LottieView source={require("../../assets/images/no_more_data.json")} autoPlay loop />
              </View> :
              <View style={styles.noDataImg}>
                <LottieView source={require("../../assets/images/no_data_found.json")} autoPlay loop />
              </View>
            }
            <View style={styles.noDataTxtCont}>
                <AppText
                  style={{
                      fontFamily : GILROY.bold,
                      fontSize : FONT_SIZE._2xl,
                      paddingStart:SPACE._2xl,
                      paddingEnd:SPACE._2xl,
                      textAlign:'center',
                      color:themedColors.primaryTxtColor}}
                  text={"Ooops!"}/>
            </View>
            <View style={styles.noDataTxtCont}>
                <AppText
                    style={[styles.noDataTxt,{color:themedColors.secondaryTxtColor}]}
                    text={props.noDataTxt}/>
            </View>
            {props.reloadBtnVisible && <View style={styles.noDataTxtMargTop}>
              <AppButton
                onPress={props.reloadBtnClick}
                btnContStyle={[styles.noDataBtnTxt, { backgroundColor: themedColors.commonBtnColor }]}
                text={"Reload"} />
            </View>}
        </View>
    )
})

const styles = StyleSheet.create({
    noDataTxtMainCont : {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    noDataImg : {
        height:160,
        width:160
    },
    noDataTxtCont : {
      marginTop : SPACE._2xs
    },
    noDataTxt : {
        fontFamily : GILROY.semi_bold,
        fontSize : FONT_SIZE.lg,
        paddingStart:SPACE._2xl,
        paddingEnd:SPACE._2xl,
        fontWeight:'600',
        textAlign:'center'
    },
    noDataTxtMargTop : {
        marginTop:SPACE._2xl
    },
    noDataBtnTxt : {
        paddingStart:SPACE._2xl,
        paddingEnd:SPACE._2xl,
        height:40,
    }
})
