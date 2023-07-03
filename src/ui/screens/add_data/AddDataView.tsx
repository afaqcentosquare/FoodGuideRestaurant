import React from 'react';
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText } from '../../components/AppText';
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import { TextHeader } from "../../components/headers/TextHeader";
import { Fonts } from "../../../config";
import strings from "../../../config/languages/LocalizedStrings";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

type Props = {}

type addDataNavProp = StackNavigationProp<AllScreenStackParamList>;

export const AddDataView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<addDataNavProp>();
  const {themedColors} = usePreferredTheme();
  const Strings = strings;
  const {
    addDataHeadTitle,
    adVideoCardTxt,
    adFoodCardTxt,
    adSliderTxt,
    adDealsTxt,
    adCategoryTxt,
  } = Strings

  return(
    <View style={[styles.adMainCont,{backgroundColor:themedColors.bgColor}]}>
      <TextHeader
        txtHeadCont={styles.adHeadMainCont}
        titleTxtVisible={true}
        title={addDataHeadTitle}/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[styles.adSubCont,{backgroundColor:themedColors.cardBgColor}]}>
          <View style={styles.adCont1}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Camera')}
              activeOpacity={0.6}
              style={[styles.adCardCont,{marginEnd: SPACE._2xl,backgroundColor:themedColors.cardPrimaryColor}]}>
              <View
                style={[styles.adCardIconCont,{backgroundColor:themedColors.cardBgColor}]}>
                <FontAwesome
                  size={25}
                  name={"camera"}/>
              </View>
              <View style={styles.adCardTxtCont}>
                <AppText
                  style={[styles.adCardTxt,{color:themedColors.primaryTxtColor}]}
                  text={adVideoCardTxt}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddFood')}
              activeOpacity={0.6}
              style={[styles.adCardCont,{backgroundColor:themedColors.cardPrimaryColor}]}>
              <View
                style={[styles.adCardIconCont,{backgroundColor:themedColors.cardBgColor}]}>
                <Ionicons
                  size={25}
                  name={"fast-food"}/>
              </View>
              <View style={styles.adCardTxtCont}>
                <AppText
                  style={[styles.adCardTxt,{color:themedColors.primaryTxtColor}]}
                  text={adFoodCardTxt}/>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.adCont2}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddHomeSlider')}
              activeOpacity={0.6}
              style={[styles.adCardCont,{marginEnd: SPACE._2xl,backgroundColor:themedColors.cardPrimaryColor}]}>
              <View style={[styles.adCardIconCont,{backgroundColor:themedColors.cardBgColor}]}>
                <FontAwesome
                  size={25}
                  name={"sliders"}/>
              </View>
              <View style={styles.adCardTxtCont}>
                <AppText
                  style={[styles.adCardTxt,{color:themedColors.primaryTxtColor}]}
                  text={adSliderTxt}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddDeals')}
              activeOpacity={0.6}
              style={[styles.adCardCont,{backgroundColor:themedColors.cardPrimaryColor}]}>
              <View style={[styles.adCardIconCont,{backgroundColor:themedColors.cardBgColor}]}>
                <Ionicons
                  size={25}
                  name={"fast-food"}/>
              </View>
              <View style={styles.adCardTxtCont}>
                <AppText
                  style={[styles.adCardTxt,{color:themedColors.primaryTxtColor}]}
                  text={adDealsTxt}/>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.adCont3}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddFoodCat')}
              activeOpacity={0.6}
              style={[styles.adCardCont,{backgroundColor:themedColors.cardPrimaryColor}]}>
              <View style={[styles.adCardIconCont,{backgroundColor:themedColors.cardBgColor}]}>
                <Ionicons
                  size={25}
                  name={"reorder-four-outline"}/>
              </View>
              <View style={styles.adCardTxtCont}>
                <AppText
                  style={[styles.adCardTxt,{color:themedColors.primaryTxtColor}]}
                  text={adCategoryTxt}/>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
})

const styles = StyleSheet.create({
  adMainCont : {
    flex:1,
    justifyContent:'center',
  },
  adHeadMainCont : {
    paddingTop:SPACE._2md,
    paddingBottom:SPACE.md,
    borderBottomRightRadius:SPACE.xl,
    borderBottomLeftRadius:BORDER_RADIUS.xl
  },
  adSubCont : {
    flex:1,
    marginBottom:SPACE._2lg,
    margin:SPACE._2lg,
    padding:SPACE._2lg,
    borderRadius:BORDER_RADIUS.lg,

  },
  adCont1 : {
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',
    marginTop:SPACE._2lg,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg
  },
  adCont2 : {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop:SPACE._2lg,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg
  },
  adCont3 : {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:SPACE._2lg,
    marginTop:SPACE._2lg,
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg
  },
  adCardCont : {
    flex:1,
    borderRadius:BORDER_RADIUS.lg,
    paddingBottom:SPACE._2xl,
    paddingTop:SPACE._2xl,
    alignItems:'center',
  },
  adCardIconCont : {
    width:80,
    height:80,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:BORDER_RADIUS._8xl,
  },
  adCardTxtCont : {
    marginTop:SPACE._2xl
  },
  adCardTxt : {
    fontFamily:Fonts.bold,
    fontSize:FONT_SIZE.sm
  }
})
