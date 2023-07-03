import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { AppButton } from "../../components/AppButton";
import { Screens } from "../../components/Screens";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { Fonts } from "../../../config";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { BackBtnHeader } from "../../components/headers/BackBtnHeader";
import { AppText } from '../../components/AppText';
import { InputText } from "../../components/InputText";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { setMenuParentCatName } from "../../../redux/slice/CatSlice";
import strings from "../../../config/languages/LocalizedStrings";

type Props = {
  uploadBtn : () => void,
  categoryImg : () => void,
}

type addCatNavProp = StackNavigationProp<AllScreenStackParamList>;

export const AddCatView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<addCatNavProp>();
  const {themedColors} = usePreferredTheme();
  const { isRtl } = useSelector((state: RootState) => state.Lng);
  const dispatch = useAppDispatch();
  const category = useSelector((state: RootState) => state.Cat);
  const Strings = strings;
  const {
    acHeadTitle,
    amcImgTitleTxt,
    amcEdtHintTxt,
    amcBtnTxt
  } = Strings

  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={[styles.amcMainCont,{backgroundColor:themedColors.bgColor}]}>
        <BackBtnHeader
          backBtnVisible={true}
          title={acHeadTitle}/>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.amcSubCont}>
            <View style={styles.amcImgMainCont}>
              <TouchableOpacity
                onPress={props.categoryImg}
                activeOpacity={0.6}
                style={styles.amcImgCont}>
                <View>
                  <Image
                    source={{uri:category.menuParentCatImg}}
                    style={styles.amcImg}/>
                </View>
                <View style={styles.amcImgTxtCont}>
                  <AppText
                    style={[styles.amcImgTxt,{color:themedColors.primaryTxtColor}]}
                    text={amcImgTitleTxt}/>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.amcInputMainCont}>
              <InputText
                valueToShowAtStart={category.menuParentCatName}
                onChangeText={(e) => dispatch(setMenuParentCatName(e))}
                txtInputStyle={[styles.amcEdtTxt, { textAlign: isRtl ? "right" : "left" }]}
                txtInputContStyle={[styles.amcEdtHeight,{backgroundColor:themedColors.editTxtPrimaryCont}]}
                hint={amcEdtHintTxt}/>
            </View>
            <View style={styles.amcBtnCont}>
              <AppButton
                onPress={() => props.uploadBtn()}
                btnContStyle={styles.amcBtnHeight}
                text={amcBtnTxt}/>
            </View>
          </View>
        </ScrollView>
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({
  amcMainCont : {
    flex:1,
  },
  amcSubCont : {
    flex:1,
    margin:SPACE._2xl
  },
  amcImgMainCont : {
    flexDirection:"row",
    justifyContent:'center'
  },
  amcImgCont : {
    alignItems:'center',
    marginEnd:SPACE._2lg
  },
  amcImg : {
    height:120,
    width:120,
    borderRadius:BORDER_RADIUS._8xl,
  },
  amcImgTxtCont : {
    marginTop:SPACE._2lg
  },
  amcImgTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.base
  },
  amcBtnHeight : {
    height:45
  },
  amcBtnCont : {
    marginTop:SPACE._2xl,
  },
  amcInputMainCont  : {
    marginTop:SPACE._2xl
  },
  amcEdtTxt : {
    fontSize: FONT_SIZE.xs,
    fontFamily: Fonts.semi_bold,
    includeFontPadding: true
  },
  amcEdtHeight : {
    height:45,
  },
})
