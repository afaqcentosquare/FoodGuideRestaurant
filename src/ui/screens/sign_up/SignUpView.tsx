import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Screens } from "../../components/Screens";
// @ts-ignore
import SignInBgImg1 from "../../../assets/images/splash_img.svg";
import { AppText } from "../../components/AppText";
import { InputText } from "../../components/InputText";
import { AppButton } from "../../components/AppButton";
import { ViewLine } from "../../components/ViewLine";
import colors from "../../../config/colors";
// @ts-ignore
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { GILROY, POPPINS, Strings } from "../../../config";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { setSignUpEdtConfirmPass, setSignUpEdtEmail, setSignUpEdtPass } from "../../../redux/slice/SignUpSlice";
import { ErrorSnackBar } from "../../components/ErrorSnackBar";
import { ProgressBar } from "../../components/ProgressBar";

type Props = {
  errorSnackVisible : boolean,
  errorSnackTxt : string,
  signUpBtn : () => void
}

type signUpNavProp = StackNavigationProp<AllScreenStackParamList>;

export const SignUpView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<signUpNavProp>();
  const {themedColors} = usePreferredTheme();
  const signUpTxt = Strings.signUp;
  const dispatch = useAppDispatch();
  const signUp = useSelector((state: RootState) => state.SignUp);

  return(
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.keyboardAvoidingView]}>
      <Screens statusBarColor={themedColors.primaryColor}>
        {signUp.signUpLoad &&
          <View style={{ flex: 1 }}>
            <ProgressBar />
          </View>}
        {!signUp.signUpLoad &&
          <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.signUpMainCont}>
            <View style={styles.signUpLogoCont}>
              {/*<SignInBgImg1/>*/}
              <Image style={{ height: 250, width: 250 }} source={require("../../../assets/images/splash_img.png")} />
            </View>
            <View style={styles.signUpTitleTxtCont1}>
              <AppText
                style={[styles.signUpTitleTxt1, { color: themedColors.primaryTxtColor }]}
                text={signUpTxt.signUpTitle1} />
            </View>
            <View style={styles.singUpTitleTxtCont2}>
              <AppText
                style={[styles.signUpTitleTxt2, { color: themedColors.secondaryTxtColor }]}
                text={signUpTxt.signUpTitle2} />
            </View>
            <View style={styles.signUpEdtEmailCont}>
              <InputText
                valueToShowAtStart={signUp.signUpEdtEmail}
                onChangeText={(e) => dispatch(setSignUpEdtEmail(e))}
                txtInputContStyle={[styles.signUpEdtHeight, { backgroundColor: themedColors.bgColor }]}
                hint={signUpTxt.signUpEmailHint} />
            </View>
            <View style={styles.signUpEdtPassCont}>
              <InputText
                valueToShowAtStart={signUp.signUpEdtPass}
                secureTxtEntry={true}
                maxLength={8}
                onChangeText={(e) => dispatch(setSignUpEdtPass(e))}
                txtInputContStyle={[styles.signUpEdtHeight, { backgroundColor: themedColors.bgColor }]}
                hint={signUpTxt.signUpPassHint} />
            </View>
            <View style={styles.signUpEdtPassCont}>
              <InputText
                valueToShowAtStart={signUp.signUpEdtConfirmPass}
                secureTxtEntry={true}
                maxLength={8}
                onChangeText={(e) => dispatch(setSignUpEdtConfirmPass(e))}
                txtInputContStyle={[styles.signUpEdtHeight, { backgroundColor: themedColors.bgColor }]}
                hint={signUpTxt.signUpConfirmPassHint} />
            </View>
            <View style={styles.signUpBtnCont}>
              <AppButton
                onPress={() => props.signUpBtn()}
                btnContStyle={styles.signUpBtnHeight}
                text={signUpTxt.signUpBtnTxt} />
            </View>
            <View style={styles.signUpNoAccountTxtCont}>
              <View>
                <AppText
                  style={[styles.signUpNoAccountTxt, { color: themedColors.secondaryTxtColor }]}
                  text={signUpTxt.signUpNoAccountTxt} />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignIn")}
                activeOpacity={0.6}>
                <AppText
                  style={[styles.signUpNoAccountTxt, { color: colors.colors.facebook }]}
                  text={signUpTxt.signUpTxt} />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>}
      </Screens>
    </KeyboardAvoidingView>

  )
})

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1
  },
  signUpMainCont : {
    flex:1,
    margin:SPACE._2xl,
    justifyContent:'center'
  },
  signUpLogoCont : {
    alignItems:'center'
  },
  signUpTitleTxtCont1 : {
    marginTop:SPACE._2xl,
  },
  singUpTitleTxtCont2 : {
    marginTop:SPACE.sm
  },
  signUpTitleTxt1 : {
    fontFamily:GILROY.semi_bold,
    fontWeight:'600',
    fontSize:FONT_SIZE._2xl
  },
  signUpTitleTxt2 : {
    fontFamily:GILROY.semi_bold,
    fontWeight:'400',
    fontSize:FONT_SIZE.base
  },
  signUpEdtEmailCont : {
    marginTop:SPACE._2xl
  },
  signUpEdtHeight : {
    height:50,
  },
  signUpEdtPassCont : {
    marginTop:SPACE.sm
  },
  signUpForgetPassTxtCont : {
    alignItems:'flex-end',
    marginTop:SPACE.xl
  },
  signUpForgetPassTxt : {
    fontFamily:GILROY.semi_bold,
    fontSize:FONT_SIZE._2xs
  },
  signUpBtnCont : {
    marginTop:SPACE._2xl,
  },
  signUpBtnHeight : {
    height:50
  },
  signUpSocialIconMainCont : {
    marginTop:SPACE._3xl,
    marginBottom:SPACE._3xl,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  signUpSocialIconCont : {
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS._8xl,
    height:60,width:60,
  },
  signUpOrTxtCont : {
    marginTop:SPACE._2xl,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  signUpOrTxt : {
    marginStart:SPACE._2md,
    marginEnd:SPACE._2md,
    fontFamily:POPPINS.semi_bold
  },
  signUpNoAccountTxtCont : {
    marginTop:SPACE._2xl,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  signUpNoAccountTxt : {
    fontFamily:GILROY.semi_bold,
    fontSize:FONT_SIZE.base,
  },
})
