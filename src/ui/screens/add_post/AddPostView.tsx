import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
// @ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";
import { AppButton } from "../../components/AppButton";
import { Fonts, GILROY, MONTSERRAT } from "../../../config";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import Strings from "../../../config/strings";
import { InputText } from "../../components/InputText";
// @ts-ignore
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import {
  setAddPostDesEdtTxt,
  setSelectFoodEdtTxt,
  setSelectLocEdtTxt,
} from "../../../redux/slice/AddPostSlice";
import { useAppDispatch } from "../../../redux";
import { Screens } from "../../components/Screens";
import { SelectCatDialog } from "../../components/dialog/SelectCatDialog";
import { BackBtnHeader } from "../../components/headers/BackBtnHeader";
import { setShowAddPostCatDialog, setShowPostFoodDialog } from "../../../redux/slice/DialogSlice";
import { SelectFoodDialog } from "../../components/dialog/SelectFoodDialog";
import colors from "../../../config/colors";
import { DialogComponent } from "../../components/dialog/DialogComponent";
import strings from "../../../config/languages/LocalizedStrings";

type Props = {
  videoPath : string,
  addPostBtnClick : () => void
}

type newPostNavProp = StackNavigationProp<AllScreenStackParamList>;

export const AddPostView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<newPostNavProp>();
  const {themedColors} = usePreferredTheme();
  const dispatch = useAppDispatch();
  const { isRtl } = useSelector((state: RootState) => state.Lng);
  const {showAddPostUploadDialog,showAddPostCatDialog,showPostFoodDialog} = useSelector((state: RootState) => state.Dialog);
  const {addPostDesEdtTxt,selectCatEdtTxt,selectFoodEdtTxt,selectLocEdtTxt} = useSelector((state: RootState) => state.AddPost);
  const Strings = strings;
  const {
    apHeadTitle,
    apCaptionHintTxt,
    apSelectCatHintTxt,
    apSelectFoodHintTxt,
    apLocHintTxt,
    apUploadBtnTxt
  } = Strings

  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={[styles.apMainCont,{backgroundColor:themedColors.bgColor}]}>
        <BackBtnHeader
          backBtnClick={() => navigation.goBack()}
          backBtnVisible={true}
          title={apHeadTitle}/>
        {showAddPostCatDialog &&
          <SelectCatDialog />}
        {showPostFoodDialog &&
          <SelectFoodDialog />}
        {showAddPostUploadDialog &&
          <DialogComponent
            dialogTxt={"Uploading Post"} />}
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.apSubCont}>
            <View style={[styles.apImgMainCont,{backgroundColor:themedColors.cardBgColor}]}>
              <View style={[styles.apImgSubCont,{backgroundColor:themedColors.bgColor}]}>
                <View>
                  <Image
                    style={styles.apImg}
                    source={{uri : props.videoPath}}/>
                </View>
                <TouchableOpacity
                  activeOpacity={0.6}
                  style={styles.apPlayIconMainCont}>
                  <View style={[styles.apPlayIconSubCont,{backgroundColor:themedColors.commonBtnColor}]}>
                    <Ionicons
                      color={themedColors.white}
                      size={18}
                      name={"play"}/>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.apCaptionMainCont}>
                <InputText
                  valueToShowAtStart={addPostDesEdtTxt}
                  onChangeText={(e) => dispatch(setAddPostDesEdtTxt(e))}
                  txtInputContStyle={styles.apInputCont}
                  txtInputStyle={[styles.apInput,{ textAlign: isRtl ? "right" : "left" }]}
                  multiLine={true}
                  hint={apCaptionHintTxt}/>
              </View>
            </View>
            <View style={[styles.apIconMainCont,{backgroundColor:themedColors.cardBgColor,}]}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => dispatch(setShowAddPostCatDialog(true))}
                style={{marginTop:SPACE._2lg}}>
                <InputText
                  editable={false}
                  valueToShowAtStart={selectCatEdtTxt}
                  edtLabelVisible={true}
                  edtLabelTxt={apSelectCatHintTxt}
                  txtInputStyle={[styles.apEdtTxt,{ textAlign: isRtl ? "right" : "left" }]}
                  txtInputContStyle={[styles.apEdtHeight,{backgroundColor:themedColors.bgColor}]}
                  hint={apSelectCatHintTxt}/>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => dispatch(setShowPostFoodDialog(true))}
                activeOpacity={0.6}
                style={{marginTop:SPACE._2lg}}>
                <InputText
                  editable={false}
                  valueToShowAtStart={selectFoodEdtTxt}
                  onChangeText={(e) => dispatch(setSelectFoodEdtTxt(e))}
                  edtLabelVisible={true}
                  edtLabelTxt={apSelectFoodHintTxt}
                  txtInputStyle={[styles.apEdtTxt,{ textAlign: isRtl ? "right" : "left" }]}
                  txtInputContStyle={[styles.apEdtHeight,{backgroundColor:themedColors.bgColor}]}
                  hint={apSelectFoodHintTxt}/>
              </TouchableOpacity>
              <View style={{marginTop:SPACE._2lg}}>
                <InputText
                  valueToShowAtStart={selectLocEdtTxt}
                  onChangeText={(e) => dispatch(setSelectLocEdtTxt(e))}
                  edtLabelVisible={true}
                  edtLabelTxt={apLocHintTxt}
                  txtInputStyle={[styles.apEdtTxt,{ textAlign: isRtl ? "right" : "left" }]}
                  txtInputContStyle={[styles.apEdtHeight,{backgroundColor:themedColors.bgColor}]}
                  hint={apLocHintTxt}/>
              </View>
              <View style={styles.apBtnCont}>
                <AppButton
                  onPress={props.addPostBtnClick}
                  text={apUploadBtnTxt}/>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({
  apMainCont : {
    flex:1
  },
  apHeadCont : {
    borderBottomRightRadius:0,
    borderBottomLeftRadius:0
  },
  apSubCont : {
    flex:1,
    margin:SPACE._2lg
  },
  apPlayIconMainCont : {
    position:'absolute',
    bottom:0,
    top:0,
    left:0,
    right:0,
    alignItems:'center',
    justifyContent:'center',
  },
  apPlayIconSubCont : {
    width:30,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS._8xl,
  },
  apImgMainCont : {
    justifyContent:'center',
    alignItems:'center',
    height:200,
    padding:SPACE._2md,
    flexDirection:'row',
    borderRadius:BORDER_RADIUS.lg
  },
  apImgSubCont : {
    borderRadius:BORDER_RADIUS.lg
  },
  apImg : {
    height:180,
    width:120,
    borderRadius:BORDER_RADIUS.lg,
  },
  apCaptionMainCont : {
    flex:1
  },
  apInputCont : {
    alignItems:'flex-start',
    height:180,
    marginTop:0,
    padding:0,
    margin:0,
    borderRadius:0
  },
  apInput : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xs,
    paddingStart:0,
    paddingEnd:0,
    paddingTop:0,
    paddingBottom:0
  },
  apIconMainCont : {
    marginTop:SPACE._2lg,
    padding:SPACE._2lg,
    borderRadius:BORDER_RADIUS.lg
  },
  apBtnCont : {
    marginTop:SPACE._2xl
  },
  apEdtHeight : {
    height:45,
  },
  apEdtEmailCont : {
    marginTop:SPACE._2xl
  },
  apEdtTxt : {
    fontSize: FONT_SIZE.xs,
    fontFamily: Fonts.semi_bold,
    includeFontPadding: true
  },
})
