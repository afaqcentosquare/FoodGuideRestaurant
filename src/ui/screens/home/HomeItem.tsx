import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
// @ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";
// @ts-ignore
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// @ts-ignore
import Feather from "react-native-vector-icons/Feather";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
// @ts-ignore
import VideoPlayer from 'react-native-video-player';
import Video, { OnBufferData } from "react-native-video";
// @ts-ignore
import AntDesign from "react-native-vector-icons/AntDesign";
// @ts-ignore
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import database from "@react-native-firebase/database";
import auth from "@react-native-firebase/auth";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { BORDER_RADIUS, FONT_SIZE, height, SPACE } from "../../../config/Dimens";
import { GILROY, MONTSERRAT } from "../../../config";
import Helper from "../../../helper/Helper";
import { AppText } from "../../components/AppText";
import colors from "../../../config/colors";
import { postObj } from "../../../models/PostModel";
// @ts-ignore
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { useAppDispatch } from "../../../redux";
import { setIsVideoLoad } from "../../../redux/slice/HomeSlice";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

type Props = {
  index : number,
  length : number,
  item : postObj,
  isActive : boolean,
  activeIndex : number
}

type postNavProp = StackNavigationProp<AllScreenStackParamList>;

const BOTTOM_HEIGHT = Platform.OS === 'ios' ? 176 : 135

export const HomeItem = React.memo<Props>((props) =>
{
  const navigation = useNavigation<postNavProp>();
  const {themedColors} = usePreferredTheme();
  const dispatch = useAppDispatch();
  const {height} = useWindowDimensions();
  const { postVideo,postDes,postThumbNail,postKey,postUserId,foodId,parentCatId,resId } = props.item
  const { isVideoLoad } = useSelector((state: RootState) => state.Home);

  //------------ res data --------------------
  const [resName,setResName] = useState('')
  const [resImg,setResImg] = useState('')
  const [resLoc,setResLoc] = useState('');

  //------------ food data --------------------
  const [foodRating,setFoodRating] = useState('')
  const [foodCatName,setFoodCatName] = useState('')
  const [foodPrice,setFoodPrice] = useState('');
  const [foodName,setFoodName] = useState('');
  const [foodImg,setFoodImg] = useState('');
  const [foodDes,setFoodDes] = useState('');

  //------------ video like --------------------
  const [isPostLike,setIsPostLike] = useState(false);
  const [postLikeCount,setPostLikeCount] = useState(0);
  const player = useRef<Video>(null);
  const [bookmarkCount,setBookmarkCount] = useState(0);
  const [reviewCount,setReviewCount] = useState(0);
  const [isBookmark,setIsBookmark] = useState(0);
  const [isPaused,setIsPaused] = useState(props.isActive);

  function getResData()
  {
    Helper.getRestaurantData(postUserId)
      .then((result : any) =>
      {
        setResName(result.name)
        setResImg(result.resImg)
        setResLoc(result.location)
      })
  }

  const onBuffer = (buffer : OnBufferData) =>
  {
    if(buffer.isBuffering)
    {
      dispatch(setIsVideoLoad(true))
    }
    else
    {
      dispatch(setIsVideoLoad(false))
    }
    //console.log("onBuffer : " + e.isBuffering)
  }

  function getFoodData(foodId : string,parentCatId : string,resId : string)
  {
    Helper.getFoodData(foodId,parentCatId,resId)
      .then((result : any) =>
      {
        setFoodImg(result.foodImg)
        setFoodName(result.foodName)
        setFoodCatName(result.foodCatName)
        setFoodRating(result.foodRating)
        setFoodPrice(result.foodPrice)
        setFoodDes(result.foodDes)
      })
  }

  function getPostLikes(postKey : string)
  {
    try
    {
      const userId : any = auth().currentUser?.uid;
      const showDataRef =
        database()
          .ref()
          .child("Likes")
          .child("Post")
          .child(postKey)
          .child(userId)
      showDataRef.on('value', (showDataSnap)  =>
      {
        setIsPostLike(showDataSnap.child("isLike").val())
      })
    }
    catch (e)
    {
      console.log("POST_ERROR : " + e);
    }
  }

  function postLike(postKey :string,resId : string)
  {
    Helper.postLike(postKey,resId)
      .then((result : any) =>
      {
        getPostLikes(postKey)
      })
  }

  function removePostLike(postKey : string)
  {
    Helper.removePostLike(postKey)
      .then((result) =>
      {
        if(result === 'isSuccessfull')
        {
          getPostLikes(postKey)
        }
      })
  }

  function checkPostLikes(postKey : string,resId : string)
  {
    Helper.checkPostLikes(postKey)
      .then((result : any) =>
      {
        if (result === null)
        {
          postLike(postKey,resId)
        }
        else
        {
          removePostLike(postKey)
        }
      })
  }

  function getPostLikeCount()
  {
    try
    {
      const showDataRef =
        database()
          .ref()
          .child("Likes")
          .child("Post")
          .child(postKey)
      showDataRef.on('value', (showDataSnap)  =>
      {
        setPostLikeCount(showDataSnap.numChildren())
      })
    }
    catch (e)
    {
      console.log("POST_ERROR : " + e);
    }
  }

  function getReviewCount()
  {
    try
    {
      const showDataRef =
        database()
          .ref()
          .child("Reviews")
          .child("Food")
          .child(foodId)
      showDataRef.on('value', (showDataSnap)  =>
      {
        setReviewCount(showDataSnap.numChildren())
      })
    }
    catch (e)
    {
      console.log("POST_ERROR : " + e);
    }
  }

  function postBookmark(postKey : string)
  {
    Helper.postBookmark(postKey)
      .then((result : any) =>
      {
        getBookmark(postKey)
      })
  }

  function getBookmark(postKey : string)
  {
    try
    {
      const userId : any = auth().currentUser?.uid;
      const showDataRef =
        database()
          .ref()
          .child("Bookmark")
          .child(postKey)
          .child(userId)
      showDataRef.on('value', (showDataSnap)  =>
      {
        setIsBookmark(showDataSnap.child("isSaved").val())
      })
    }
    catch (e)
    {
      console.log("POST_ERROR : " + e);
    }
  }

  function removeBookmark(postKey : string)
  {
    Helper.removeBookmark(postKey)
      .then((result : any) =>
      {
        if(result === 'isSuccessfull')
        {
          getBookmark(postKey)
        }
      })
  }

  function checkBookmark(postKey : string)
  {
    Helper.checkBookmark(postKey)
      .then((result : any) =>
      {
        if (result === null)
        {
          postBookmark(postKey)
        }
        else
        {
          removeBookmark(postKey)
        }
      })
  }

  function getBookmarkCount(postKey : string)
  {
    try
    {
      const showDataRef =
        database().ref()
          .child("Bookmark")
          .child(postKey)
      showDataRef.on('value', (showDataSnap)  =>
      {
        setBookmarkCount(showDataSnap.numChildren())
      })
    }
    catch (e)
    {
      console.log("POST_ERROR : " + e);
    }
  }

  useEffect(() =>
  {
    getFoodData(foodId,parentCatId,resId)
    getBookmark(postKey)
    getBookmarkCount(postKey)
    getPostLikeCount()
    getPostLikes(postKey)
    getResData()
    getReviewCount()
  },[])

  return(
    <View
      style={{flex:1,height:height - BOTTOM_HEIGHT,
      borderRadius:BORDER_RADIUS.lg,
        marginStart: SPACE._2lg,marginEnd:SPACE._2lg,
        marginTop: props.index === 0 ? SPACE.xs : SPACE.xs,
        marginBottom: props.index === props.length - 1 ?  SPACE.xs : SPACE.xs}}>
      <Video
        ref={player}
        resizeMode={'cover'}
        source={{uri : postVideo}}
        onBuffer={onBuffer}
        poster={postThumbNail}
        posterResizeMode={'cover'}
        playInBackground={false}
        onEnd={() => {
          console.log("on end")
          dispatch(setIsVideoLoad(false))}}
        onVideoEnd={() => dispatch(setIsVideoLoad(false))}
        onLoad={() => dispatch(setIsVideoLoad(true))}
        onVideoLoad={() => dispatch(setIsVideoLoad(true))}
        onLoadStart={() =>dispatch(setIsVideoLoad(true))}
        onVideoLoadStart={() =>dispatch(setIsVideoLoad(true))}
        onVideoBuffer={() => {
          dispatch(setIsVideoLoad(true))}}
        playWhenInactive={false}
        paused={!props.isActive}
        progressUpdateInterval={23000}
        maxBitRate={25000}
        style={{ backgroundColor:colors.colors.black,height:'100%',width:'100%',borderRadius:BORDER_RADIUS.lg}}/>
      {!props.isActive  &&
        <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0, }}>
          <View style={{
            height: 45,
            width: 45,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: themedColors.bgColor,
            borderRadius: BORDER_RADIUS._8xl,
          }}>
            <ActivityIndicator
              animating={true}
              color="red" />
          </View>
        </View>}
      <View style={{flex:1,flexDirection:'row',position:'absolute',left:0,right:0,bottom:0,}}>
        <View style={{flex:1,justifyContent:'flex-end',marginStart:SPACE._2lg,marginEnd:SPACE._2md,marginBottom:SPACE._2lg,}}>
          <View style={{justifyContent:'flex-end',borderRadius:BORDER_RADIUS.lg,backgroundColor:colors.colors.transparent,padding:SPACE._2md}}>
            <View style={{flex:1,flexDirection:'row'}}>
              <View style={{height:40,width:40,backgroundColor:themedColors.cardBgColor,borderRadius:BORDER_RADIUS._8xl,justifyContent:'center',alignItems:'center'}}>
                {foodImg != '' ?
                  <Image
                    style={{ height: 35, width: 35, borderRadius: BORDER_RADIUS._8xl }}
                    source={{ uri: foodImg }} /> : null}
              </View>
              <View style={{flex:1,justifyContent:'center'}}>
                <View style={{flex:1,marginStart:SPACE._2md}}>
                  <AppText
                    numberOfLine={1}
                    style={{color:colors.colors.white,fontFamily:GILROY.semi_bold,fontSize:FONT_SIZE.lg,}}
                    text={foodName != '' ? foodName : ''}/>
                </View>
                <View style={{marginStart:SPACE._2md,justifyContent:'center'}}>
                  <AppText
                    numberOfLine={1}
                    style={{color:colors.colors.white,fontFamily:GILROY.medium,fontSize:FONT_SIZE._2xs,}}
                    text={resName != '' ? "from " + resName : ''}/>
                </View>
              </View>
            </View>
            <View style={{flexDirection:'row',marginTop:SPACE._2md}}>
              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:25,paddingStart:SPACE._2md,paddingEnd:SPACE._2md,borderRadius:BORDER_RADIUS._8xl,backgroundColor:themedColors.bgColor}}>
                <View>
                  <MaterialCommunityIcons
                    name={"food"}
                    size={14}/>
                </View>
                <View style={{marginStart:SPACE._2xs}}>
                  <AppText
                    style={{fontFamily:GILROY.semi_bold,fontSize:FONT_SIZE._3xs}}
                    text={foodCatName}/>
                </View>
              </View>
              <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',height:25,marginStart:SPACE.sm,paddingStart:SPACE._2md,paddingEnd:SPACE._2md,borderRadius:BORDER_RADIUS._8xl,backgroundColor:themedColors.bgColor}}>
                <View>
                  <AntDesign
                    color={colors.colors.star}
                    size={14}
                    name={"star"}/>
                </View>
                <View style={{marginStart:SPACE._2xs}}>
                  <AppText
                    style={{fontFamily:GILROY.semi_bold,fontSize:FONT_SIZE._3xs}}
                    text={foodRating != '' ? parseInt(foodRating).toFixed(1) : ''}/>
                </View>
              </View>
            </View>
            <View style={{flexDirection:'row',width:100,justifyContent:'center',alignItems:'center',height:25,marginTop:SPACE._2md,borderRadius:BORDER_RADIUS._8xl,backgroundColor:themedColors.bgColor,}}>
              <View>
                <FontAwesome
                  color={themedColors.primaryIconColor}
                  size={14}
                  name={"money"} />
              </View>
              <View style={{marginStart:SPACE._2xs}}>
                <AppText
                  style={{fontFamily:GILROY.semi_bold,fontSize:FONT_SIZE._3xs}}
                  text={foodPrice != '' ? "RS : " + foodPrice : ''}/>
              </View>
            </View>
            <View style={{marginTop:SPACE._2md}}>
              <AppText
                numberOfLine={3}
                style={{letterSpacing:1,color:colors.colors.white,fontFamily:GILROY.semi_bold,fontSize:FONT_SIZE._3xs,}}
                text={postDes != '' ? postDes : ''}/>
            </View>
          </View>
        </View>
        <View style={{marginBottom:SPACE._4xl,marginEnd:SPACE._2md,marginTop:SPACE._2xl}}>
          <View>
            <TouchableOpacity
              onPress={() => checkPostLikes(postKey,resId)}
              activeOpacity={0.6}
              style={{backgroundColor:themedColors.cardBgColor,borderRadius:BORDER_RADIUS._8xl,height:40,width:40,justifyContent:'center',alignItems:'center'}}>
              {isPostLike ?
                <MaterialCommunityIcons
                  size={22}
                  color={colors.colors.red}
                  name={"cards-heart"}/> :
                <MaterialCommunityIcons
                  size={22}
                  name={"cards-heart-outline"}/>}
            </TouchableOpacity>
            <View style={{marginTop:SPACE.xs,alignItems:'center'}}>
              <AppText
                style={{color:colors.colors.white,fontFamily:GILROY.semi_bold,fontSize:FONT_SIZE._2xs}}
                text={postLikeCount.toString()}/>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Comments',{postData : props.item})}
            activeOpacity={0.6}>
            <View style={{marginTop:SPACE.md,backgroundColor:themedColors.cardBgColor,borderRadius:BORDER_RADIUS._8xl,height:40,width:40,justifyContent:'center',alignItems:'center'}}>
              <MaterialCommunityIcons
                color={themedColors.primaryIconColor}
                size={22}
                name={"clipboard-text-multiple-outline"}/>
            </View>
            <View style={{marginTop:SPACE.xs,alignItems:'center'}}>
              <AppText
                style={{color:colors.colors.white,fontFamily:GILROY.semi_bold,fontSize:FONT_SIZE._2xs}}
                text={reviewCount.toString()}/>
            </View>
          </TouchableOpacity>
          {/*<View>
            <View style={{marginTop:SPACE.md,backgroundColor:themedColors.cardBgColor,borderRadius:BORDER_RADIUS._8xl,height:40,width:40,justifyContent:'center',alignItems:'center'}}>
              <SimpleLineIcons
                color={themedColors.primaryIconColor}
                size={18}
                name={"badge"}/>
            </View>
            <View style={{marginTop:SPACE.xs,alignItems:'center'}}>
              <AppText
                style={{color:colors.colors.white,fontFamily:GILROY.semi_bold,fontSize:FONT_SIZE._2xs}}
                text={"12"}/>
            </View>
          </View>*/}
          <View>
            <TouchableOpacity
              onPress={() => checkBookmark(postKey)}
              activeOpacity={0.6}
              style={{marginTop:SPACE.md,backgroundColor:themedColors.cardBgColor,borderRadius:BORDER_RADIUS._8xl,height:40,width:40,justifyContent:'center',alignItems:'center'}}>
              {isBookmark ?
                <MaterialCommunityIcons
                  color={themedColors.commonBtnColor}
                  size={22}
                  name={"bookmark"} /> :
                <MaterialCommunityIcons
                  color={themedColors.primaryIconColor}
                  size={22}
                  name={"bookmark-outline"} />}
            </TouchableOpacity>
          </View>
          <View style={{marginTop:SPACE.xs,alignItems:'center'}}>
            <AppText
              style={{color:colors.colors.white,fontFamily:GILROY.bold,fontSize:FONT_SIZE._2xs}}
              text={bookmarkCount.toString()}/>
          </View>
        </View>
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  signInMainCont : {
    flex:1,
    backgroundColor:colors.colors.white
  }
})


