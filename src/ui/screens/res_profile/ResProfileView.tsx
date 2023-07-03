import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Screens } from "../../components/Screens";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { AppText } from "../../components/AppText";
import { Fonts } from "../../../config";
import { InputText } from '../../components/InputText';
import { AppButton } from "../../components/AppButton";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import {
  setResProfileCloseTime,
  setResProfileDeliveredTime,
  setResProfileDescription,
  setResProfileDiscount,
  setResProfileLocation, setResProfileMinOrder,
  setResProfileName,
  setResProfileOpenTime, setResProfilePhoneNumber,
} from "../../../redux/slice/ProfileSlice";
import { DefaultUserImg } from "../../components/DefaultUserImg";
import strings from "../../../config/languages/LocalizedStrings";

type Props = {
  resProfileBtn : () => void,
  photoClick : () => void
}

export const ResProfileView = React.memo<Props>((props) =>
{
  const {themedColors} = usePreferredTheme();
  const dispatch = useAppDispatch();
  const resProfile = useSelector((state: RootState) => state.ResProfile);
  const {resProfileName,resProfileOpenTime,resProfileCloseTime,resProfileLocation,
  resProfileMinOrder,resProfileDeliveryTime,resProfilePhoneNumber,resProfileDescription,
  resProfileImage,resProfileDiscount} = resProfile
  const Strings = strings;
  const {
    rpImgTitleTxt,
    rpNameHintTxt,
    rpOpenTimeHintTxt,
    rpCloseTimeHintTxt,
    rpLocHintTxt,
    rpMinHintTxt,
    rpDeliverdHintTxt,
    rpPhoneHintTxt,
    rpDisHintTxt,
    rpDesHintTxt,
    rpBtnTxt,
  } = Strings


  return(
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.keyboardAvoidingView]}>
      <Screens statusBarColor={themedColors.primaryColor}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={[styles.rpMainCont,{backgroundColor:themedColors.bgColor}]}>
            <TouchableOpacity
              onPress={props.photoClick}
              activeOpacity={0.6}
              style={styles.rpImgCont}>
              {resProfileImage != '' ?
                <Image
                  source={{ uri: resProfileImage }}
                  style={styles.rpImg} /> :
                <DefaultUserImg
                  showAddIcon={true}/>}
            </TouchableOpacity>
            <View style={styles.rpImgTxtCont}>
              <AppText
                style={styles.rpImgTxt}
                text={rpImgTitleTxt}/>
            </View>
            <View style={styles.rpEdtMarginTop}>
              <InputText
                valueToShowAtStart={resProfileName}
                onChangeText={(e) => dispatch(setResProfileName(e))}
                txtInputStyle={styles.rpEdtTxt}
                txtInputContStyle={[styles.rpEdtHeight,{backgroundColor:themedColors.cardBgColor}]}
                hint={rpNameHintTxt}/>
            </View>
            <View style={styles.rpEdtMarginTop}>
              <InputText
                valueToShowAtStart={resProfileOpenTime}
                onChangeText={(e) => dispatch(setResProfileOpenTime(e))}
                txtInputStyle={styles.rpEdtTxt}
                txtInputContStyle={[styles.rpEdtHeight,{backgroundColor:themedColors.cardBgColor}]}
                hint={rpOpenTimeHintTxt}/>
            </View>
            <View style={styles.rpEdtMarginTop}>
              <InputText
                valueToShowAtStart={resProfileCloseTime}
                onChangeText={(e) => dispatch(setResProfileCloseTime(e))}
                txtInputStyle={styles.rpEdtTxt}
                txtInputContStyle={[styles.rpEdtHeight,{backgroundColor:themedColors.cardBgColor}]}
                hint={rpCloseTimeHintTxt}/>
            </View>
            <View style={styles.rpEdtMarginTop}>
              <InputText
                valueToShowAtStart={resProfileLocation}
                onChangeText={(e) => dispatch(setResProfileLocation(e))}
                txtInputStyle={styles.rpEdtTxt}
                txtInputContStyle={[styles.rpEdtHeight,{backgroundColor:themedColors.cardBgColor}]}
                hint={rpLocHintTxt}/>
            </View>
            <View style={styles.rpEdtMarginTop}>
              <InputText
                valueToShowAtStart={resProfileMinOrder}
                onChangeText={(e) => dispatch(setResProfileMinOrder(e))}
                txtInputStyle={styles.rpEdtTxt}
                txtInputContStyle={[styles.rpEdtHeight,{backgroundColor:themedColors.cardBgColor}]}
                hint={rpMinHintTxt}/>
            </View>
            <View style={styles.rpEdtMarginTop}>
              <InputText
                valueToShowAtStart={resProfileDeliveryTime}
                onChangeText={(e) => dispatch(setResProfileDeliveredTime(e))}
                txtInputStyle={styles.rpEdtTxt}
                txtInputContStyle={[styles.rpEdtHeight,{backgroundColor:themedColors.cardBgColor}]}
                hint={rpDeliverdHintTxt}/>
            </View>
            <View style={styles.rpEdtMarginTop}>
              <InputText
                valueToShowAtStart={resProfilePhoneNumber}
                onChangeText={(e) => dispatch(setResProfilePhoneNumber(e))}
                txtInputStyle={styles.rpEdtTxt}
                txtInputContStyle={[styles.rpEdtHeight,{backgroundColor:themedColors.cardBgColor}]}
                hint={rpPhoneHintTxt}/>
            </View>
            <View style={styles.rpEdtMarginTop}>
              <InputText
                valueToShowAtStart={resProfileDiscount}
                onChangeText={(e) => dispatch(setResProfileDiscount(e))}
                txtInputStyle={styles.rpEdtTxt}
                txtInputContStyle={[styles.rpEdtHeight,{backgroundColor:themedColors.cardBgColor}]}
                hint={rpDisHintTxt}/>
            </View>
            <View style={styles.rpEdtMarginTop}>
              <InputText
                valueToShowAtStart={resProfileDescription}
                onChangeText={(e) => dispatch(setResProfileDescription(e))}
                txtInputStyle={styles.rpEdtTxt}
                txtInputContStyle={[styles.rpEdtHeight,{backgroundColor:themedColors.cardBgColor}]}
                hint={rpDesHintTxt}/>
            </View>
            <View style={styles.rpBtnCont}>
              <AppButton
                onPress={() => props.resProfileBtn()}
                btnContStyle={styles.rpBtnHeight}
                text={rpBtnTxt}/>
            </View>
          </View>
        </ScrollView>
      </Screens>
    </KeyboardAvoidingView>

  )
})

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1
  },
  rpImgCont : {
    alignItems:'center'
  },
  rpImg : {
    height: 120,
    width: 120,
    borderRadius: BORDER_RADIUS._8xl,
  },
  rpImgTxtCont : {
    alignItems:'center',
    marginTop:SPACE._2lg
  },
  rpImgTxt : {
    fontFaimly:Fonts.semi_bold,
    fontSize:FONT_SIZE.lg
  },
  rpMainCont : {
    flex:1,
    padding:SPACE._2xl,
  },
  rpEdtHeight : {
    height:45,
  },
  rpEdtTxt : {
    fontSize: FONT_SIZE.xs,
    fontFamily: Fonts.semi_bold,
    includeFontPadding: true
  },
  rpEdtMarginTop : {
    marginTop:SPACE._2lg
  },
  rpBtnHeight : {
    height:45
  },
  rpBtnCont : {
    marginTop:SPACE._2xl
  }
})
