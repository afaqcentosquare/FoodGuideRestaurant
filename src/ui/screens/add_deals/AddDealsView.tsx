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
  homeDealsImg : () => void,
  uploadDealsImgBtn : () => void,
}

type addCatNavProp = StackNavigationProp<AllScreenStackParamList>;

export const AddDealsView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<addCatNavProp>();
  const {themedColors} = usePreferredTheme();
  const dispatch = useAppDispatch();
  const deal = useSelector((state: RootState) => state.Deal);
  const {dealImage} = deal;
  const Strings = strings;
  const {
    adHeadTitle,
    adImgTitle,
    adUploadBtnTxt
  } = Strings


  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={[styles.adMainCont,{backgroundColor:themedColors.bgColor}]}>
        <BackBtnHeader
          backBtnClick={() => navigation.goBack()}
          backBtnVisible={true}
          title={adHeadTitle}/>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.adSubCont}>
            <View style={styles.adImgMainCont}>
              <TouchableOpacity
                onPress={props.homeDealsImg}
                activeOpacity={0.6}
                style={styles.adImgCont}>
                <View>
                  {dealImage != '' ?
                    <Image
                      source={{ uri: dealImage }}
                      style={styles.adImg} /> :
                    <DefaultUserImg
                      showAddIcon={true}/>}
                </View>
                <View style={styles.adImgTitleTxtCont}>
                  <AppText
                    style={[styles.adImgTitleTxt,{color:themedColors.primaryTxtColor}]}
                    text={adImgTitle}/>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.adBtnCont}>
              <AppButton
                onPress={() => props.uploadDealsImgBtn()}
                btnContStyle={styles.adBtnHeight}
                text={adUploadBtnTxt}/>
            </View>
          </View>
        </ScrollView>
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({
  adMainCont : {
    flex:1,
  },
  adSubCont : {
    flex:1,
    margin:SPACE._2xl
  },
  adImgMainCont : {
    flexDirection:"row",
    justifyContent:'center',
  },
  adImgCont : {
    alignItems:'center',
    marginEnd:SPACE._2lg
  },
  adImg : {
    height: 120,
    width: 120,
    borderRadius: BORDER_RADIUS._8xl,
  },
  adImgTitleTxtCont : {
    marginTop:SPACE._2lg
  },
  adImgTitleTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.base
  },
  adBtnCont : {
    marginTop:SPACE._2xl,
  },
  adBtnHeight : {
    height:45
  },
})
