import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { AppButton } from "../../components/AppButton";
import { Screens } from "../../components/Screens";
import { useNavigation } from "@react-navigation/native";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { Fonts } from "../../../config";
import { BackBtnHeader } from "../../components/headers/BackBtnHeader";
import { AppText } from "../../components/AppText";
import { InputText } from "../../components/InputText";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import {
  setFoodCatName,
  setFoodDes,
  setFoodName,
  setFoodPrice, setSelectFoodCatResName,
} from "../../../redux/slice/FoodSlice";
import { DefaultUserImg } from "../../components/DefaultUserImg";
import { SelectCatDialog } from "../../components/dialog/SelectCatDialog";
import { setShowAddPostCatDialog, setShowResFoodDialog } from "../../../redux/slice/DialogSlice";
import { SelectFoodResCatDialog } from "../../components/dialog/SelectFoodResCatDialog";
import strings from "../../../config/languages/LocalizedStrings";

type Props = {
  selectFoodImg : () => void,
  uploadFoodBtn : () => void,
}

type addFoodNavProp = StackNavigationProp<AllScreenStackParamList>;

export const AddFoodView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<addFoodNavProp>();
  const {themedColors} = usePreferredTheme();
  const dispatch = useAppDispatch();
  const { isRtl } = useSelector((state: RootState) => state.Lng);
  const food = useSelector((state: RootState) => state.Food);
  const {foodImg,foodName,foodCatName,foodPrice,foodDes,selectFoodCatResName} = food
  const dialog = useSelector((state: RootState) => state.Dialog);
  const {showAddPostCatDialog,showResFoodCatDialog} = dialog;
  const Strings = strings;
  const {
    afHeadTitle,
    afImgTitleTxt,
    afFoodNameEdtHintTxt,
    afSelectFoodTypeHintTxt,
    afSelectFoodCatHintTxt,
    afFoodDesHintTxt,
    afFoodPriceHintTxt,
    afBtnTxt
  } = Strings

  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={[styles.afMainCont,{backgroundColor:themedColors.bgColor}]}>
        <BackBtnHeader
          backBtnClick={() => navigation.goBack()}
          backBtnVisible={true}
          title={afHeadTitle}/>
        {showResFoodCatDialog && <SelectFoodResCatDialog/>}
        {showAddPostCatDialog && <SelectCatDialog/>}
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.afSubCont}>
            <View style={styles.afImgMainCont}>
              <TouchableOpacity
                onPress={props.selectFoodImg}
                activeOpacity={0.6}
                style={styles.afImgSubCont}>
                <View>
                  {foodImg != '' ?
                    <Image
                      source={{ uri: food.foodImg }}
                      style={styles.afImg} /> :
                    <DefaultUserImg
                      showAddIcon={true}/>}
                </View>
                <View style={styles.afImgTitleTxtCont}>
                  <AppText
                    style={[styles.afImgTitleTxt,{color:themedColors.primaryTxtColor}]}
                    text={afImgTitleTxt}/>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.adEdtMarginTop}>
              <InputText
                valueToShowAtStart={foodName}
                onChangeText={(e) => dispatch(setFoodName(e))}
                txtInputStyle={[styles.afEdtTxt,{ textAlign: isRtl ? "right" : "left" }]}
                txtInputContStyle={[styles.afEdtHeight,{backgroundColor:themedColors.editTxtPrimaryCont}]}
                hint={afFoodNameEdtHintTxt}/>
            </View>
            <TouchableOpacity
              onPress={() => dispatch(setShowAddPostCatDialog(true))}
              activeOpacity={0.6}
              style={styles.adEdtMarginTop}>
              <InputText
                editable={false}
                valueToShowAtStart={foodCatName}
                onChangeText={(e) => dispatch(setFoodCatName(e))}
                txtInputStyle={[styles.afEdtTxt,{ textAlign: isRtl ? "right" : "left" }]}
                txtInputContStyle={[styles.afEdtHeight,{backgroundColor:themedColors.editTxtPrimaryCont}]}
                hint={afSelectFoodTypeHintTxt}/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch(setShowResFoodDialog(true))}
              activeOpacity={0.6}
              style={styles.adEdtMarginTop}>
              <InputText
                editable={false}
                valueToShowAtStart={selectFoodCatResName}
                onChangeText={(e) => dispatch(setSelectFoodCatResName(e))}
                txtInputStyle={[styles.afEdtTxt,{ textAlign: isRtl ? "right" : "left" }]}
                txtInputContStyle={[styles.afEdtHeight,{backgroundColor:themedColors.editTxtPrimaryCont}]}
                hint={afSelectFoodCatHintTxt}/>
            </TouchableOpacity>
            <View style={styles.adEdtMarginTop}>
              <InputText
                valueToShowAtStart={foodPrice}
                onChangeText={(e) => dispatch(setFoodPrice(e))}
                txtInputStyle={[styles.afEdtTxt,{ textAlign: isRtl ? "right" : "left" }]}
                txtInputContStyle={[styles.afEdtHeight,{backgroundColor:themedColors.editTxtPrimaryCont}]}
                hint={afFoodPriceHintTxt}/>
            </View>
            <View style={styles.adEdtMarginTop}>
              <InputText
                valueToShowAtStart={foodDes}
                onChangeText={(e) => dispatch(setFoodDes(e))}
                txtInputStyle={{ textAlign: isRtl ? "right" : "left" }}
                txtInputContStyle={[styles.afEdtDesCont,{backgroundColor:themedColors.editTxtPrimaryCont}]}
                hint={afFoodDesHintTxt}/>
            </View>
            <View style={styles.afBtnCont}>
              <AppButton
                onPress={() => props.uploadFoodBtn()}
                btnContStyle={styles.afBtnHeight}
                text={afBtnTxt}/>
            </View>
          </View>
        </ScrollView>
      </View>
    </Screens>

  )
})

const styles = StyleSheet.create({
  afMainCont : {
    flex:1
  },
  afSubCont : {
    flex:1,
    margin:SPACE._2xl
  },
  afImgMainCont : {
    flexDirection:"row",
    justifyContent:'center',
  },
  afImgSubCont : {
    alignItems:'center',
    marginEnd:SPACE._2lg
  },
  afImg : {
    height: 120,
    width: 120,
    borderRadius: BORDER_RADIUS._8xl,
  },
  afImgTitleTxtCont : {
    marginTop:SPACE._2lg
  },
  afImgTitleTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.base
  },
  afEdtHeight : {
    height:45,
  },
  afEdtEmailCont : {
    marginTop:SPACE._2xl
  },
  afEdtTxt : {
    fontSize: FONT_SIZE.xs,
    fontFamily: Fonts.semi_bold,
    includeFontPadding: true
  },
  adEdtMarginTop : {
    marginTop:SPACE._2lg
  },
  afEdtDesCont : {
    height:120,
    alignItems:'flex-start',
    borderRadius:BORDER_RADIUS.lg,
  },
  afBtnCont : {
    marginTop : SPACE._2xl,
  },
  afBtnHeight : {
    height:45,
  }
})
