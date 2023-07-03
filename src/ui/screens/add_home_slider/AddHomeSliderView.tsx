import React from 'react';
import { useNavigation } from "@react-navigation/native";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { Fonts } from "../../../config";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { Screens } from "../../components/Screens";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { BackBtnHeader } from "../../components/headers/BackBtnHeader";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { AppText } from "../../components/AppText";
import { AppButton } from "../../components/AppButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { DefaultUserImg } from "../../components/DefaultUserImg";
import strings from "../../../config/languages/LocalizedStrings";

type Props = {
  homeSliderImg : () => void,
  uploadSliderImgBtn : () => void,
}

type addCatNavProp = StackNavigationProp<AllScreenStackParamList>;

export const AddHomeSliderView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<addCatNavProp>();
  const {themedColors} = usePreferredTheme();
  const dispatch = useAppDispatch();
  const slider = useSelector((state: RootState) => state.Slider);
  const { sliderImage } = slider
  const Strings = strings;
  const {
    ahsHeadTitle,
    ahsImgTxt,
    ahsBtnTxt
  } = Strings

  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={[styles.ahsMainCont,{backgroundColor:themedColors.bgColor}]}>
        <BackBtnHeader
          backBtnClick={() => navigation.goBack()}
          backBtnVisible={true}
          title={ahsHeadTitle}/>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.ahsSubCont}>
            <View style={styles.ahsImgMainCont}>
              <TouchableOpacity
                onPress={props.homeSliderImg}
                activeOpacity={0.6}
                style={styles.ahsImgCont}>
                <View>
                  {sliderImage != '' ?
                    <Image
                    source={{ uri: sliderImage }}
                    style={styles.ahsImg} /> :
                    <DefaultUserImg
                      showAddIcon={true}/>}
                </View>
                <View style={styles.ahsImgTxtCont}>
                  <AppText
                    style={[styles.ahsImgTxt,{color:themedColors.primaryTxtColor}]}
                    text={ahsImgTxt}/>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.ahsBtnCont}>
              <AppButton
                onPress={() => props.uploadSliderImgBtn()}
                btnContStyle={styles.ahsBtnHeight}
                text={ahsBtnTxt}/>
            </View>
          </View>
        </ScrollView>
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({
  ahsMainCont : {
    flex:1
  },
  ahsSubCont : {
    flex:1,
    margin:SPACE._2xl
  },
  ahsImgMainCont : {
    flexDirection:"row",
    justifyContent:'center',
  },
  ahsImgCont : {
    alignItems:'center',
    marginEnd:SPACE._2lg
  },
  ahsImg : {
    height:120,
    width:120,
    borderRadius:BORDER_RADIUS._8xl,
  },
  ahsImgTxtCont : {
    marginTop:SPACE._2lg
  },
  ahsImgTxt : {
    textAlign:'center',
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.xs
  },
  ahsBtnHeight : {
    height:45
  },
  ahsBtnCont : {
    marginTop:SPACE._2xl,
  },
})
