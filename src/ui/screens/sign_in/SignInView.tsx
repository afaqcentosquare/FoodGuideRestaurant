import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { Screens } from "../../components/Screens";
import { AppText } from "../../components/AppText";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { Fonts,Strings } from "../../../config";
import { InputText } from "../../components/InputText";
import { AppButton } from "../../components/AppButton";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { setSignInEdtEmail, setSignInEdtPass } from "../../../redux/slice/SignInSlice";
import { ProgressBar } from "../../components/ProgressBar";

type Props = {
  signInBtn : () => void
}

type signInNavProp = StackNavigationProp<AllScreenStackParamList>;

export const SignInView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<signInNavProp>();
  const {themedColors} = usePreferredTheme();
  const signInTxt = Strings.signIn;
  const dispatch = useAppDispatch();
  const signIn = useSelector((state: RootState) => state.SignIn);

  return(
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.keyboardAvoidingView]}>
      <Screens statusBarColor={themedColors.primaryColor}>
        {signIn.signInLoad &&
          <View style={{ flex: 1 }}>
            <ProgressBar />
          </View>}
        {!signIn.signInLoad &&
          <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.signInMainCont}>
            <View style={styles.signInLogoCont}>
              <Image
                style={styles.signLogo}
                source={require("../../../assets/images/splash_img.png")} />
            </View>
            <View style={styles.signInTitleTxtCont1}>
              <AppText
                style={[styles.signInTitleTxt1, { color: themedColors.primaryTxtColor }]}
                text={signInTxt.signInTitle1} />
            </View>
            <View style={styles.singInTitleTxtCont2}>
              <AppText
                style={[styles.signInTitleTxt2, { color: themedColors.secondaryTxtColor }]}
                text={signInTxt.signInTitle2} />
            </View>
            <View style={styles.signInEdtEmailCont}>
              <InputText
                valueToShowAtStart={signIn.signInEdtEmail}
                onChangeText={(e) => dispatch(setSignInEdtEmail(e))}
                txtInputStyle={styles.signInEdtTxt}
                txtInputContStyle={[styles.signInEdtHeight, { backgroundColor: themedColors.editTxtPrimaryCont }]}
                hint={signInTxt.signInEmailEdtTxt} />
            </View>
            <View style={styles.signInEdtPassCont}>
              <InputText
                valueToShowAtStart={signIn.signInEdtPass}
                secureTxtEntry={true}
                maxLength={8}
                onChangeText={(e) => dispatch(setSignInEdtPass(e))}
                txtInputStyle={styles.signInEdtTxt}
                txtInputContStyle={[styles.signInEdtHeight, { backgroundColor: themedColors.editTxtPrimaryCont }]}
                hint={signInTxt.signInPassEdtTxt} />
            </View>
            <View style={styles.signInBtnCont}>
              <AppButton
                onPress={() => props.signInBtn()}
                btnContStyle={styles.signInBtnHeight}
                text={signInTxt.signInBtnTxt} />
            </View>
            <View style={styles.signInNoAccountTxtCont}>
              <View>
                <AppText
                  style={[styles.signInNoAccountTxt, { color: themedColors.secondaryTxtColor }]}
                  text={signInTxt.signInNoAccountTxt} />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignUp")}
                activeOpacity={0.6}>
                <AppText
                  style={[styles.signInNoAccountTxt, { color: themedColors.blue }]}
                  text={signInTxt.signInTxt} />
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
  signInMainCont : {
    flex:1,
    margin:SPACE._2xl,
    justifyContent:'center'
  },
  signInLogoCont : {
    alignItems:'center'
  },
  signLogo : {
    height: 250,
    width: 250
  },
  signInTitleTxtCont1 : {
    marginTop:SPACE._2xl,
  },
  singInTitleTxtCont2 : {
    marginTop:SPACE.sm
  },
  signInTitleTxt1 : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xl
  },
  signInTitleTxt2 : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.base
  },
  signInEdtEmailCont : {
    marginTop:SPACE._2xl
  },
  signInEdtHeight : {
    height:45,
  },
  signInEdtPassCont : {
    marginTop:SPACE.sm
  },
  signInEdtTxt : {
    fontSize: FONT_SIZE.xs,
    fontFamily: Fonts.semi_bold,
    includeFontPadding: true
  },
  signInForgetPassTxtCont : {
    alignItems:'flex-end',
    marginTop:SPACE.xl
  },
  signInForgetPassTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE._2xs
  },
  signInBtnCont : {
    marginTop:SPACE._2xl,
  },
  signInBtnHeight : {
    height:45
  },
  signInSocialIconMainCont : {
    marginTop:SPACE._3xl,
    marginBottom:SPACE._3xl,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  signInSocialIconCont : {
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS._8xl,
    height:60,width:60,
  },
  signInOrTxtCont : {
    marginTop:SPACE._2xl,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  signInOrTxt : {
    marginStart:SPACE._2md,
    marginEnd:SPACE._2md,
    fontFamily:Fonts.semi_bold
  },
  signInNoAccountTxtCont : {
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    marginTop:SPACE._2xl
  },
  signInNoAccountTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.base,
  },
})
