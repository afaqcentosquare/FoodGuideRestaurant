import React, { useEffect, useState } from "react";
import { Image, StyleSheet,TouchableOpacity, View } from "react-native";
import { AppText } from "../../components/AppText";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
import { Fonts } from "../../../config";
import usePreferredTheme from "../../../hooks/theme/usePreferredTheme";
import { StackNavigationProp } from "@react-navigation/stack";
import { AllScreenStackParamList } from "../../../routes/all_routes/AllScreenStack";
import { useNavigation } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { ViewLine } from "../../components/ViewLine";
import { inboxObj } from "../../../models/InboxModel";
import Helper from "../../../helper/Helper";

type Props = {
  index : number,
  length : number,
  item : inboxObj
}

type inboxDetailNavProp = StackNavigationProp<AllScreenStackParamList>;

export const InboxItem = React.memo<Props>((props) =>
{
  const navigation = useNavigation<inboxDetailNavProp>();
  const {themedColors} = usePreferredTheme();
  const { receiverId,senderId } = props.item
  const [resName,setResName] = useState('')
  const [resImg,setResImg] = useState('')
  const [lastMsg,setLastMsg] = useState('')

  function getInboxUserData()
  {
    Helper.getUserData(receiverId)
      .then((result : any) =>
      {
        setResName(result.userName)
        setResImg(result.userImg)
      })
  }

  function getData()
  {
    try
    {
      const userId : any = auth().currentUser?.uid;

      const inboxDetailRef =
        database()
          .ref()
          .child("Chats")

      inboxDetailRef.on('value', (inboxDetailSnap)  =>
      {
        // @ts-ignore
        inboxDetailSnap.forEach((inboxDetailChildSnap) =>
        {
          let receiveId = inboxDetailChildSnap.child("receiverId").val();
          console.log("receiverID : " +inboxDetailChildSnap.child("receiverId").val() )
          let sendId = inboxDetailChildSnap.child("senderId").val();
          if(receiverId === receiveId && sendId === userId || receiveId === receiverId && sendId === userId)
          {
            setLastMsg(inboxDetailChildSnap.child("msgTxt").val())
          }
        })

      })
    }
    catch (e)
    {
      console.log("ERROR : " + e);
    }

  }

  useEffect(() =>
  {
    getData()
    getInboxUserData()
  },[])

  return(
    <TouchableOpacity
      onPress={() => navigation.navigate('InboxDetail',{receiverId : receiverId})}
      activeOpacity={0.6}
      style={[styles.inboxItemMainCont,
        { marginTop: props.index === 0 ? SPACE._2lg : SPACE.xs,
          marginBottom: props.index === props.length - 1 ?  SPACE._2lg : SPACE.xs}]}>
      <View style={styles.inboxItemSubCont}>
        <View style={[styles.inboxItemUserImgCont,{backgroundColor:themedColors.cardBgColor}]}>
          {resImg != '' ?
            <Image
              style={styles.inboxItemUserImg}
              source={{ uri: resImg }} /> : null}
        </View>
        <View style={styles.inboxItemNameMainCont}>
          <View>
            <AppText
              style={[styles.inboxItemNameTxt,{color:themedColors.primaryTxtColor}]}
              text={resName}/>
          </View>
          <View style={{marginTop:2}}>
            <AppText
              numberOfLine={1}
              style={[styles.inboxItemMsgTxt,{color:themedColors.secondaryTxtColor}]}
              text={lastMsg}/>
          </View>
          <View style={{marginTop:SPACE.xl}}>
            <ViewLine style={{backgroundColor:themedColors.viewLineColor}}/>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  inboxItemMainCont : {
    marginStart:SPACE._2lg,
    marginEnd:SPACE._2lg,
  },
  inboxItemSubCont : {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  inboxItemUserImgCont : {
    height:65,
    width:65,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:BORDER_RADIUS._8xl,
  },
  inboxItemUserImg : {
    width:58,
    height:58,
    borderRadius:BORDER_RADIUS._8xl
  },
  inboxItemNameMainCont : {
    flex:1,
    marginStart:SPACE._2md,
    marginTop:SPACE.sm
  },
  inboxItemNameTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.lg,
  },
  inboxItemMsgTxt : {
    fontFamily:Fonts.semi_bold,
    fontSize:FONT_SIZE.xs,
  }
})
