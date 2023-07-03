import React from 'react';
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { Screens } from "../../components/Screens";
import { FlatList, StyleSheet, View } from "react-native";
import { BackBtnHeader } from "../../components/headers/BackBtnHeader";
import { CommentItem } from "./CommentItem";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { useAppDispatch } from "../../../redux";
import { postObj } from "../../../models/PostModel";
import strings from "../../../config/languages/LocalizedStrings";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";

type Props = {
  submitReviewClick? : () => void,
  foodReviewSheetRef : any,
  postData : postObj
}

type comNavProp = StackNavigationProp<AllScreenStackParamList>;

export const CommentView = React.memo<Props>((props) =>
{
  const navigation = useNavigation<comNavProp>();
  const {themedColors} = usePreferredTheme();
  const dispatch = useAppDispatch();
  const {foodReviewList,showFoodReviewSheet} = useSelector((state: RootState) => state.FoodReview);
  const Strings = strings;
  const {
    commHeadTitle
  } = Strings

  const data = [
    {
      id : 0,
      name : 'header'
    },
    {
      id : 1,
      name : 'review'
    }
  ]

  return(
    <Screens statusBarColor={themedColors.primaryColor}>
      <View style={[styles.comMainCont,{backgroundColor:themedColors.bgColor}]}>
        <BackBtnHeader
          backBtnClick={() => navigation.goBack()}
          backBtnVisible={true}
          title={commHeadTitle}/>
        <View style={[styles.comSubCont,{backgroundColor:themedColors.bgColor}]}>
            <View style={[styles.comListCont,{backgroundColor:themedColors.bgColor}]}>
              <FlatList
                data={data}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) =>
                  <CommentItem
                    postData={props.postData}
                    item={item} />}
                keyExtractor={(item, index) => index.toString()} />
            </View>
        </View>
      </View>
    </Screens>
  )
})

const styles = StyleSheet.create({
  comMainCont : {
    flex:1
  },
  comSubCont : {
    flex:1,
  },
  comListCont : {
    flex:1
  }
})
