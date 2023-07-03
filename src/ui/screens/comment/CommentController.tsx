import React, { FC, useEffect, useRef } from "react";
import { CommentView } from "./CommentView";
import BottomSheet from "@gorhom/bottom-sheet";
import { useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import Helper from "../../../helper/Helper";
import { useAppDispatch } from "../../../redux";
import Snackbar from "react-native-snackbar";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import {
  setEdtFoodReviewRating,
  setEdtFoodReviewResImg, setEdtFoodReviewResName,
  setEdtFoodReviewTxt, setFoodData,
  setFoodReviewList, setShowFoodReviewSheet,
} from "../../../redux/slice/FoodReviewSlice";
import { BackHandler } from "react-native";

type Props = {}

type commentNavProp = StackNavigationProp<AllScreenStackParamList>;

const ControllerController : FC<Props> = () =>
{
  const navigation = useNavigation<commentNavProp>();
  // @ts-ignore
  const route = useRoute<commentNavProp['postData']>();
  const postData = route.params.postData ;
  const foodReviewSheetRef = useRef<BottomSheet>(null)
  const dispatch = useAppDispatch();
  const {edtFoodReviewTxt,edtFoodReviewRating} = useSelector((state: RootState) => state.FoodReview);

  function handleBackButtonClick()
  {
    navigation.goBack();
    return true;
  }

  function getFoodReviews()
  {
    Helper.getFoodReviews(postData.foodId)
      .then((result : any) =>
      {
        dispatch(setFoodReviewList(result.reverse()))
      })
  }

  function getFoodData()
  {
    Helper.getFoodData(postData.foodId,postData.parentCatId,postData.resId)
      .then((result : any) =>
      {
        dispatch(setFoodData(result));
        dispatch(setEdtFoodReviewResImg(result.foodImg))
        dispatch(setEdtFoodReviewResName(result.foodName))
      })
  }

  function addFoodReviewBtn()
  {
    try
    {
      if(edtFoodReviewTxt != '')
      {
        const userId : any = auth().currentUser?.uid;

        const postReviewRef = database().ref()
          .child("Reviews")
          .child("Food")
          .child(postData.foodId)
          .push()

        const postReviewObj = {
          userId : userId,
          foodReviewKey : postReviewRef.key,
          foodId: postData.foodId,
          rating : edtFoodReviewRating,
          review : edtFoodReviewTxt
        }

        postReviewRef
          .set(postReviewObj)
          .then(() =>
          {
            getFoodReviews()
            dispatch(setShowFoodReviewSheet(false))
            dispatch(setEdtFoodReviewTxt(''))
            dispatch(setEdtFoodReviewRating(0))
            Snackbar.show({ text: "Your review add successfully", duration: Snackbar.LENGTH_LONG, });
          });
      }
      else
      {
        Snackbar.show({ text: "Review field cannot be empty", duration: Snackbar.LENGTH_LONG, });
      }
    }
    catch (e)
    {
      console.log("HOME_RES_ERROR : " + e);
    }
  }

  useEffect(() =>
  {
    getFoodData()
    getFoodReviews()

    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  },[])

  return(
    <CommentView
      postData={postData}
      foodReviewSheetRef={foodReviewSheetRef}
      submitReviewClick={() => addFoodReviewBtn()}/>
  )
}

export default ControllerController ;
