import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { BackBtnHeader } from "../../components/headers/BackBtnHeader";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { AppText } from "../../components/AppText";
import { Fonts } from "../../../config";
import { InputText } from "../../components/InputText";
import { AppButton } from "../../components/AppButton";
import { Screens } from "../../components/Screens";
import colors from "../../../config/colors";
import { useNavigation } from "@react-navigation/native";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { setFoodCatName } from "../../../redux/slice/FoodCatSlice";
import { DefaultUserImg } from "../../components/DefaultUserImg";
import strings from "../../../config/languages/LocalizedStrings";

type Props = {
  foodCategoryImg : () => void,
  uploadFoodCatBtn : () => void,
}

type addCatNavProp = StackNavigationProp<AllScreenStackParamList>;

export const AddFoodCatView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<addCatNavProp>();
  const {themedColors} = usePreferredTheme();
  const dispatch = useAppDispatch();
  const { isRtl } = useSelector((state: RootState) => state.Lng);
  const foodCat = useSelector((state: RootState) => state.FoodCat);
  const Strings = strings;
  const {
    afcHeadTitle,
    afcImgTxt,
    afcEdtHintTxt,
    afcBtnTxt
  } = Strings


  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={[styles.afcMainCont,{backgroundColor:themedColors.bgColor}]}>
        <BackBtnHeader
          backBtnClick={() => navigation.goBack()}
          backBtnVisible={true}
          title={afcHeadTitle}/>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.afcSubCont}>
            <View style={styles.afcImgMainCont}>
              <TouchableOpacity
                onPress={props.foodCategoryImg}
                activeOpacity={0.6}
                style={styles.afcImgCont}>
                <View>
                  {foodCat.foodCatImg != '' ?
                    <Image
                      source={{uri:foodCat.foodCatImg}}
                      style={styles.afcImg}/> :
                    <DefaultUserImg
                      showAddIcon={true}/>
                  }
                </View>
                <View style={styles.afcImgTxtCont}>
                  <AppText
                    style={[styles.afcImgTxt,{color:themedColors.primaryTxtColor}]}
                    text={afcImgTxt}/>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.afcEdtEmailCont}>
              <InputText
                valueToShowAtStart={foodCat.foodCatName}
                onChangeText={(e) => dispatch(setFoodCatName(e))}
                txtInputStyle={[styles.afcEdtTxt,{ textAlign: isRtl ? "right" : "left" }]}
                txtInputContStyle={[styles.afcEdtHeight,{backgroundColor:themedColors.editTxtPrimaryCont}]}
                hint={afcEdtHintTxt}/>
            </View>
            <View style={styles.afcBtnCont}>
              <AppButton
                onPress={() => props.uploadFoodCatBtn()}
                btnContStyle={styles.afcBtnHeight}
                text={afcBtnTxt}/>
            </View>
          </View>
        </ScrollView>
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({
  afcMainCont : {
    flex:1
  },
  afcSubCont : {
    flex:1,
    margin:SPACE._2xl
  },
  afcImgMainCont : {
    flexDirection:"row",
    justifyContent:'center',
  },
  afcImgCont : {
    alignItems:'center',
    marginEnd:SPACE._2lg
  },
  afcImg : {
    height:120,
    width:120,
    borderRadius:BORDER_RADIUS._8xl,
  },
  afcImgTxtCont : {
    marginTop:SPACE._2lg
  },
  afcImgTxt : {
    textAlign:'center',
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xs
  },
  afcEdtHeight : {
    height:45,
  },
  afcEdtEmailCont : {
    marginTop:SPACE._2xl
  },
  afcEdtTxt : {
    fontSize: FONT_SIZE.xs,
    fontFamily: Fonts.semi_bold,
    includeFontPadding: true
  },
  afcBtnHeight : {
    height:45
  },
  afcBtnCont : {
    marginTop:SPACE._2xl,
  },
})
