import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Screens } from "../../components/Screens";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { BackBtnHeader } from "../../components/headers/BackBtnHeader";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { InputText } from "../../components/InputText";
import Strings from "../../../config/strings";
import { AppButton } from "../../components/AppButton";
import { DefaultUserImg } from "../../components/DefaultUserImg";
import { Fonts, GILROY } from "../../../config";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { useAppDispatch } from "../../../redux";
import {
  setEditCloseTime,
  setEditOpenTime, setEditUserDes, setEditUserDiscount,
  setEditUserLoc,
  setEditUserMinOrder,
  setEditUserName,
  setEditUserNum,
} from "../../../redux/slice/EditUserSlice";
// @ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../../config/colors";
import {
  setResProfileCloseTime, setResProfileDeliveredTime, setResProfileDescription, setResProfileDiscount,
  setResProfileLocation, setResProfileMinOrder,
  setResProfileName,
  setResProfileOpenTime, setResProfilePhoneNumber,
} from "../../../redux/slice/ProfileSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";

type Props = {
  updateUserBtn : () => void,
  editUserImgClick : () => void
}

type editProfileNavProp = StackNavigationProp<AllScreenStackParamList>;

export const EditProfileView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<editProfileNavProp>();
  const {themedColors} = usePreferredTheme();
  const epHeaderTxt = Strings.header;
  const epEdtTxt = Strings.editProfile;
  const dispatch = useAppDispatch();
  const { isRtl } = useSelector((state: RootState) => state.Lng);
  const editUser = useSelector((state: RootState) => state.EditUser);
  const {
    editUserImg,
    editUserName,
    editUserOpenTime,
    editUserCloseTime,
    editUserLoc,
    editUserDeliveryTime,
    editUserNum,
    editUserDes,
    editUserMinOrder,
    editUserDiscount
  } = editUser

  return(
    <Screens
      statusBarColor={themedColors.primaryColor}>
      <View style={[styles.epMainCont,{backgroundColor:themedColors.bgColor}]}>
        <BackBtnHeader
          backBtnClick={() => navigation.goBack()}
          backBtnVisible={true}
          title={epHeaderTxt.epTxt}/>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.epSubCont}>
            <TouchableOpacity
              onPress={props.editUserImgClick}
              style={styles.epImgCont}>
              {editUserImg != '' ?
                <View>
                  <Image
                    style={styles.epImg}
                    source={{ uri: editUserImg }} />
                  <View>
                    <View style={[styles.addIconCont,{backgroundColor:themedColors.blue}]}>
                      <Ionicons
                        color={themedColors.white}
                        size={15}
                        name={"ios-add"} />
                    </View>
                  </View>
                </View> :
                <DefaultUserImg showAddIcon={true}/>}
            </TouchableOpacity>
            <View style={styles.epInputBoxMainCont}>
              <View style={styles.epEdtMainCont}>
                <InputText
                  valueToShowAtStart={editUserName}
                  onChangeText={(e) => dispatch(setEditUserName(e))}
                  txtInputStyle={[styles.epEdtTxt, { textAlign: isRtl ? "right" : "left" }]}
                  txtInputContStyle={[styles.epInputCont,{backgroundColor:themedColors.editTxtPrimaryCont}]}
                  hint={"Enter Name"}/>
              </View>
              <View style={styles.epEdtMainCont}>
                <InputText
                  valueToShowAtStart={editUserOpenTime}
                  onChangeText={(e) => dispatch(setEditOpenTime(e))}
                  txtInputStyle={[styles.epEdtTxt, { textAlign: isRtl ? "right" : "left" }]}
                  txtInputContStyle={[styles.epInputCont,{backgroundColor:themedColors.editTxtPrimaryCont}]}
                  hint={"Enter Open Time"}/>
              </View>
              <View style={styles.epEdtMainCont}>
                <InputText
                  valueToShowAtStart={editUserCloseTime}
                  onChangeText={(e) => dispatch(setEditCloseTime(e))}
                  txtInputStyle={[styles.epEdtTxt, { textAlign: isRtl ? "right" : "left" }]}
                  txtInputContStyle={[styles.epInputCont,{backgroundColor:themedColors.editTxtPrimaryCont}]}
                  hint={"Enter Close Time"}/>
              </View>
              <View style={styles.epEdtMainCont}>
                <InputText
                  valueToShowAtStart={editUserLoc}
                  onChangeText={(e) => dispatch(setEditUserLoc(e))}
                  txtInputStyle={[styles.epEdtTxt, { textAlign: isRtl ? "right" : "left" }]}
                  txtInputContStyle={[styles.epInputCont,{backgroundColor:themedColors.editTxtPrimaryCont}]}
                  hint={"Location"}/>
              </View>
              <View style={styles.epEdtMainCont}>
                <InputText
                  valueToShowAtStart={editUserMinOrder}
                  onChangeText={(e) => dispatch(setEditUserMinOrder(e))}
                  txtInputStyle={[styles.epEdtTxt, { textAlign: isRtl ? "right" : "left" }]}
                  txtInputContStyle={[styles.epInputCont,{backgroundColor:themedColors.editTxtPrimaryCont}]}
                  hint={"Enter Minimum order"}/>
              </View>
              <View style={styles.epEdtMainCont}>
                <InputText
                  valueToShowAtStart={editUserDeliveryTime}
                  onChangeText={(e) => dispatch(setResProfileDeliveredTime(e))}
                  txtInputStyle={[styles.epEdtTxt, { textAlign: isRtl ? "right" : "left" }]}
                  txtInputContStyle={[styles.epInputCont,{backgroundColor:themedColors.editTxtPrimaryCont}]}
                  hint={"Enter Delivered Time"}/>
              </View>
              <View style={styles.epEdtMainCont}>
                <InputText
                  valueToShowAtStart={editUserNum}
                  onChangeText={(e) => dispatch(setEditUserNum(e))}
                  txtInputStyle={[styles.epEdtTxt, { textAlign: isRtl ? "right" : "left" }]}
                  txtInputContStyle={[styles.epInputCont,{backgroundColor:themedColors.editTxtPrimaryCont}]}
                  hint={"Enter Phone Number"}/>
              </View>
              <View style={styles.epEdtMainCont}>
                <InputText
                  valueToShowAtStart={editUserDiscount.toString()}
                  onChangeText={(e) => dispatch(setEditUserDiscount(parseInt(e)))}
                  txtInputStyle={[styles.epEdtTxt, { textAlign: isRtl ? "right" : "left" }]}
                  txtInputContStyle={[styles.epInputCont,{backgroundColor:themedColors.editTxtPrimaryCont}]}
                  hint={"Enter Discount"}/>
              </View>
              <View style={styles.epEdtMainCont}>
                <InputText
                  valueToShowAtStart={editUserDes}
                  onChangeText={(e) => dispatch(setEditUserDes(e))}
                  txtInputStyle={[styles.epEdtTxt, { textAlign: isRtl ? "right" : "left" }]}
                  txtInputContStyle={[styles.epInputCont,{backgroundColor:themedColors.editTxtPrimaryCont}]}
                  hint={"Enter Description"}/>
              </View>
              <View style={styles.epBtnCont}>
                <AppButton
                  onPress={props.updateUserBtn}
                  text={"Update"}/>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({
  epMainCont : {
    flex:1,
  },
  epSubCont : {
    flex:1,
    justifyContent:'center'
  },
  epInputBoxMainCont : {
    marginTop:SPACE._2xl,
    marginStart:SPACE.xl,
    marginEnd:SPACE.xl
  },
  epEdtMainCont : {
    marginTop:SPACE._2xl
  },
  addIconCont : {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BORDER_RADIUS._8xl,
    width: 30,
    height: 30,
    position: "absolute",
    right:0,
    bottom:0
  },
  epImgCont : {
    justifyContent:'center',
    alignItems:'center'
  },
  epImg : {
    width:110,
    height:110,
    borderRadius:BORDER_RADIUS._8xl
  },
  epInputMainCont : {
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
    marginTop:SPACE._2lg
  },
  epInputCont : {
    height:45
  },
  epEdtTxt : {
    fontSize: FONT_SIZE.xs,
    fontFamily: Fonts.bold,
    includeFontPadding: true
  },
  epDesInputCont : {
    borderRadius:BORDER_RADIUS.lg,
    height:150,
  },
  epDesInput : {
    paddingStart:SPACE._2md,
    paddingTop:SPACE._2lg,
    alignSelf:'flex-start'
  },
  epBtnCont : {
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
    marginTop:SPACE._4xl
  }
})
