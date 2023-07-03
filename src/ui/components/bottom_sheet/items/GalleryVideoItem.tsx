import React, { useEffect } from "react";
import {Dimensions, Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../../../../config/colors';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StackNavigationProp} from '@react-navigation/stack';
import {AllScreenStackParamList} from '../../../../routes/all_routes/AllScreenStack';
import {useNavigation} from '@react-navigation/native';
import { videoObj } from "../../../../models/VideoRes";
import Video from "react-native-video";
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../../config/Dimens";
import { AppText } from "../../AppText";
import { GILROY } from "../../../../config";
import usePreferredTheme from "../../../../hooks/theme/usePreferredTheme";
import CalculateFileSize from "../../../../hooks/CalculateFileSize";


type Props = {
    item : videoObj,
    videoSheetClose : () => void
}

type videoNavProp = StackNavigationProp<AllScreenStackParamList>;

export const GalleryVideoItem = React.memo<Props>((props) =>
{
    const navigation = useNavigation<videoNavProp>();
    const {themedColors} = usePreferredTheme();

    return(
        <View style={styles.videoItemMainCont}>
            <Image
              style={styles.videoItemImg}
              source={{uri : "file://" + props.item.path}}/>
            <View style={styles.videoItemPlayBtnCont}>
                <TouchableOpacity
                    onPress={() => {
                        props.videoSheetClose()
                        navigation.navigate('Video', {videoPath : props.item.path})}}
                    activeOpacity={0.6}
                    style={styles.videoItemPlayBtnTouchCont}>
                    <Ionicons
                        name={"md-play"}
                        size={18}
                        color={colors.colors.white}/>
                </TouchableOpacity>
            </View>
            <View style={{paddingTop:2,paddingBottom:2,paddingStart:SPACE.xs,paddingEnd:SPACE.xs,borderRadius:BORDER_RADIUS.lg,backgroundColor:themedColors.bgColor,position:'absolute',top:5,left:5}}>
                <AppText
                  style={{fontSize:8,fontFamily:GILROY.semi_bold,color:themedColors.primaryTxtColor}}
                  text={CalculateFileSize.BytesToSize(props.item.size)}/>
            </View>
            {/*<View style={{paddingTop:2,paddingBottom:2,paddingStart:SPACE.xs,paddingEnd:SPACE.xs,borderRadius:BORDER_RADIUS.lg,backgroundColor:themedColors.bgColor,position:'absolute',bottom:5,right:5}}>
                <AppText
                  style={{fontSize:8,fontFamily:GILROY.semi_bold,color:themedColors.primaryTxtColor}}
                  text={CalculateFileSize.ConvertTime(props.item).toString()}/>
            </View>*/}
        </View>
    )
})

const styles = StyleSheet.create({
    videoItemMainCont : {
        backgroundColor:colors.colors.blue,
        borderRadius:BORDER_RADIUS.sm,
        margin : 2,
        flex:1,
        maxWidth: "24%" ,
        height : 150,
    },
    videoItemImg : {
        flex:1,
        borderRadius:BORDER_RADIUS.sm,
    },
    videoItemPlayBtnCont : {
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0,
        justifyContent:'center',
        alignItems:'center'
    },
    videoItemPlayBtnTouchCont : {
        borderRadius:30,
        width:35,
        height:35,
        backgroundColor:colors.colors.yellow,
        justifyContent:'center',
        alignItems:'center'
    },
})


