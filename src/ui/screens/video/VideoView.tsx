import React, {useState} from 'react';
import {Screens} from '../../components/Screens';
import { Image, Platform, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import colors from '../../../config/colors';
import Video from 'react-native-video';
import {CameraIcons} from '../../components/CameraIcons';
// @ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BORDER_RADIUS, SPACE } from "../../../config/Dimens";
import {StackNavigationProp} from '@react-navigation/stack';
import {AllScreenStackParamList} from '../../../routes/all_routes/AllScreenStack';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SaveVideoDialog} from '../../components/dialog/SaveVideoDialog';
import CameraRoll from '@react-native-community/cameraroll';
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DeleteDialog} from '../../components/dialog/DeleteDialog';
import { DialogComponent } from '../../components/dialog/DialogComponent';
import RNFS from "react-native-fs";

type Props = {
    videoPath : string,
    muted : 'off' | 'on',
    enableMuted : boolean,
    isPlayVideo : boolean,
    videoVisibleDialog : boolean,
    deleteVisibleDialog : boolean,
    playBtnClick : () => void,
    muteBtnClick : () => void,
    deleteBtnClick : () => void,
    downloadBtnClick : () => void,
    videoDialogSaveBtnClick : () => void,
    videoDialogCancelBtnClick : () => void,
    deleteDialogDeleteBtnClick : () => void,
    deleteDialogCancelBtnClick : () => void,
    isProgressDialogVisible : boolean
}

type videoNavProp = StackNavigationProp<AllScreenStackParamList>;

export const VideoView = React.memo<Props>((props) =>
{
    const navigation = useNavigation<videoNavProp>();

    useFocusEffect(() =>
    {
        StatusBar.setHidden(false);
    })

    return(
        <View style={{flex:1,borderRadius:BORDER_RADIUS._8xl}}>
            <StatusBar
              barStyle={"light-content"}
              translucent={true}
              backgroundColor={"rgba(0,0,0,0)"}/>
            <Video
                resizeMode={'cover'}
                repeat={true}
                fullscreen={false}
                muted={props.enableMuted}
                disableFocus={true}
                poster={props.videoPath}
                playWhenInactive={false}
                paused={props.isPlayVideo}
                onPlaybackResume={() => true}
                style={StyleSheet.absoluteFill}
                source={{uri: "file://" + props.videoPath}}/>
            <DialogComponent
              dialogTxt={"Processing"}
              dialogVisible={props.isProgressDialogVisible}/>
            <SaveVideoDialog
                videoDialogVisible={props.videoVisibleDialog}
                saveVideoBtnClick={() => props.videoDialogSaveBtnClick()}
                cancelVideoBtnClick={() => props.videoDialogCancelBtnClick()}/>
            {/*<DeleteDialog
                deleteDialogVisible={props.deleteVisibleDialog}
                cancelDeleteBtnClick={() => props.deleteDialogCancelBtnClick()}
                deleteVideoBtnClick={() => props.deleteDialogDeleteBtnClick()}/>*/}
            <View style={styles.videoIconMainCont}>
                <View style={styles.videoPlayBtnCont}>
                    <TouchableOpacity
                        onPress={() => props.playBtnClick()}
                        activeOpacity={0.6}
                        style={styles.galleryItemPlayBtnTouchCont}>
                        <Ionicons
                            name={props.isPlayVideo ? "md-play" : "ios-pause"}
                            size={22}
                            color={colors.colors.white}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.videoIconCont2}>
                    <TouchableOpacity
                        onPress={() => props.muteBtnClick()}
                        style={styles.videoIconSize}
                        activeOpacity={0.6}>
                        <CameraIcons
                            iconType={Ionicons}
                            size={16}
                            color={colors.colors.white}
                            iconName={props.muted === 'on' ? 'ios-volume-high-outline' : 'ios-volume-mute-outline'}/>
                    </TouchableOpacity>
                    {/*<TouchableOpacity
                        onPress={() => props.downloadBtnClick()}
                        style={styles.videoIconSize}
                        activeOpacity={0.6}>
                        <CameraIcons
                            iconType={Feather}
                            size={18}
                            color={colors.colors.white}
                            iconName={'download'}/>
                    </TouchableOpacity>*/}
                    <TouchableOpacity
                        onPress={() => props.deleteBtnClick()}
                        style={styles.videoIconSize}
                        activeOpacity={0.6}>
                        <CameraIcons
                            iconType={MaterialCommunityIcons}
                            size={16}
                            color={colors.colors.white}
                            iconName={'delete'}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => props.downloadBtnClick()}
                        style={styles.videoIconSize}
                        activeOpacity={0.6}>
                        <CameraIcons
                            iconType={AntDesign}
                            size={16}
                            color={colors.colors.white}
                            iconName={'arrowright'}/>
                    </TouchableOpacity>
                </View>
                <View style={[styles.videoBackIconCont,{marginTop: StatusBar.currentHeight}]}>
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={[styles.videoIconSize,{marginTop: SPACE.md}]}
                      activeOpacity={0.6}>
                        <CameraIcons
                          iconType={AntDesign}
                          size={16}
                          color={colors.colors.white}
                          iconName={'arrowleft'}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    videoIconSize : {
        flex:1,
        height:45,
        width:45,
        justifyContent:'center',
        alignItems:'center',
        marginTop:SPACE._2lg,
        backgroundColor:colors.colors.transparent,
        borderRadius:120
    },
    videoPlayBtnCont : {
        flex:1,
        position:'absolute',
        bottom:0,
        left:0,
        right:0,
        top:0,
        justifyContent:'center',
        alignItems:'center'
    },
    galleryItemPlayBtnTouchCont : {
        borderRadius:120,
        width:60,
        height:60,
        backgroundColor:colors.colors.yellow,
        justifyContent:'center',
        alignItems:'center'
    },
    videoIconMainCont : {
        flex:1,
        marginTop:Platform.OS === 'ios' ? SPACE._4xl : SPACE._2lg
    },
    videoBackIconCont : {
        position:'absolute',
        marginStart:SPACE._2lg,
    },
    videoIconCont2 : {
        marginEnd:SPACE._2lg,
        marginBottom:Platform.OS === 'android' ? SPACE._2xl : SPACE._4xl,
        position:'absolute',
        bottom:0,
        right:0
    }
})
