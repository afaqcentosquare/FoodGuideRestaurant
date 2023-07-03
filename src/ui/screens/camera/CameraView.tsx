import React, { useEffect } from "react";
import {
    Platform,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import colors from '../../../config/colors';
import { BORDER_RADIUS, FONT_SIZE, SPACE } from "../../../config/Dimens";
// @ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
// @ts-ignore
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// @ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// @ts-ignore
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// @ts-ignore
import AntDesign from 'react-native-vector-icons/AntDesign';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';
import {CameraIcons} from '../../components/CameraIcons';
import {Camera} from 'react-native-vision-camera';
import {StackNavigationProp} from '@react-navigation/stack';
import {AllScreenStackParamList} from '../../../routes/all_routes/AllScreenStack';
import { useFocusEffect,useNavigation } from "@react-navigation/native";
import { useIsFocused } from '@react-navigation/core';
import {GILROY} from '../../../config';
import {RecordingTimer} from '../../components/RecordingTimer';
import {NoPermissionView} from '../../components/NoPermissionView';
import { CountDownTimer } from '../../components/CountDownTimer';
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { videoObj } from "../../../models/VideoRes";
import { VideoBottomSheet } from "../../components/bottom_sheet/VideoBottomSheet";

type Props = {
    cameraRef : any,
    device : any,
    videoGalleryList : videoObj[],
    isRecording : boolean,
    enableMic : boolean,
    isSheetOpen : boolean,
    flash : 'off' | 'on',
    mic : 'off' | 'on',
    enableHdr : boolean,
    supportFlash : boolean,
    startRecording : () => void,
    onInitialized : () => void,
    onHdrClick : () => void,
    onMicClick : () => void,
    onFlashClick : () => void,
    onChangeCameraClick : () => void,
    getGalleryData? : () => void,
    countDownTimerStatus : (status : boolean) => void,
    showCountDownTimer : boolean,
    isPermissionGranted : string,
    getPermission : () => void,
    onError : () => void,
    isVideoSheetCloseClick : () => void,
    stopRecClick : () => void,
    fps : any,
    format : any
}

type videoNavProp = StackNavigationProp<AllScreenStackParamList>;

export const CameraView = React.memo<Props>((props) =>
{
    const navigation = useNavigation<videoNavProp>();
    const { isRecording } = useSelector((state: RootState) => state.Camera);
    const isFocused = useIsFocused();

    useFocusEffect(() =>
    {
        StatusBar.setHidden(false);

        return () => {
            StatusBar.setHidden(false);
        }
    })

    useEffect(() =>
    {
        console.log("FPS : " + props.fps)
    },[])

    if(props.device == null) return null
    return(
        <View style={{flex:1,borderRadius:BORDER_RADIUS.xl}}>
            <StatusBar barStyle={"light-content"} translucent={true} backgroundColor={"rgba(0,0,0,0)"}/>
            {props.isPermissionGranted === 'granted' ?
              <Camera
                ref={props.cameraRef}
                device={props.device}
                video={true}
                fps={props.fps}
                torch={props.flash}
                onError={props.onError}
                audio={props.enableMic}
                onInitialized={() => props.onInitialized()}
                enableZoomGesture={true}
                orientation="portrait"
                isActive={isFocused}
                hdr={props.enableHdr}
                style={{flex:1,borderRadius:BORDER_RADIUS.xl,position:'absolute',width:"100%",height:'100%' }}/> : null}
            <View style={styles.cameraMainContainer}>
                <View style={styles.cameraIconMainCont}>
                    <View style={styles.cameraIconSubCont}>
                        {!isRecording && !props.showCountDownTimer &&
                          <View style={styles.cameraIconCont2}>
                            {props.supportFlash &&
                              <TouchableOpacity
                                style={[styles.cameraIconSize,{marginTop:SPACE._2xl}]}
                                onPress={() => props.onFlashClick()}
                                activeOpacity={0.6}>
                                  <CameraIcons
                                    iconType={Ionicons}
                                    name={'Flash'}
                                    size={18}
                                    color={colors.colors.white}
                                    iconName={props.flash === 'on' ? 'flash' : 'flash-off'}/>
                              </TouchableOpacity>}
                              <TouchableOpacity
                                onPress={() => props.onMicClick()}
                                style={[styles.cameraIconSize,{marginTop:SPACE.md,}]}
                                activeOpacity={0.6}>
                                  <CameraIcons
                                    iconType={Ionicons}
                                    size={22}
                                    color={colors.colors.white}
                                    iconName={props.mic === 'on' ? 'mic-sharp' : 'mic-off-sharp'}/>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => props.onHdrClick()}
                                style={[styles.cameraIconSize,{marginTop:SPACE.md,}]}
                                activeOpacity={0.6}>
                                  <CameraIcons
                                    iconType={MaterialIcons}
                                    size={22}
                                    color={colors.colors.white}
                                    iconName={props.enableHdr ? "hdr-on" : "hdr-off"} />
                              </TouchableOpacity>
                              {/*{props.support60Fps && (
                                <TouchableOpacity style={styles.button} onPress={() => props.support60Fps}>
                                    <AppText style={{fontFamily:GILROY.semi_bold}}>
                                        {is60Fps ? '60' : '30'}
                                        {'\n'}FPS
                                    </AppText>
                                </TouchableOpacity>
                              )}*/}
                              {/*<TouchableOpacity
                                onPress={() => props.nightModeClick()}
                                style={styles.cameraIconSize}
                                activeOpacity={0.6}>
                                  <CameraIcons
                                    iconType={Ionicons}
                                    size={22}
                                    color={colors.colors.white}
                                    iconName={"moon"} />
                              </TouchableOpacity>*/}
                          </View>}
                    </View>
                    {isRecording &&
                      <View style={styles.cameraRecordTimerCont}>
                          <RecordingTimer
                            stopRecClick={props.stopRecClick}
                            isStartRecording={isRecording}/>
                      </View>}
                    <View style={styles.cameraRecordBtnMainCont}>
                        {!isRecording && !props.showCountDownTimer &&
                          <TouchableOpacity
                            onPress={props.getGalleryData}
                            style={[styles.cameraIconSize, {marginStart: SPACE._3xl}]}
                            activeOpacity={0.6}>
                              <CameraIcons
                                iconType={MaterialIcons}
                                name={'Gallery'}
                                size={18}
                                color={colors.colors.white}
                                iconName={'photo-album'}/>
                          </TouchableOpacity>}
                        {!props.showCountDownTimer &&
                          <View style={[styles.cameraRecordBtnCont, { alignItems: "center" }]}>
                            <TouchableOpacity
                              activeOpacity={0.6}
                              onPress={() => {
                                  props.startRecording();
                              }}
                              style={styles.cameraRecordBtnBorder}>
                                {isRecording && <View style={styles.cameraRecordRedBtn} />}
                            </TouchableOpacity>
                          </View>}
                        {!isRecording && !props.showCountDownTimer &&
                          <TouchableOpacity
                            style={[styles.cameraIconSize, {marginEnd: SPACE._3xl}]}
                            onPress={() => props.onChangeCameraClick()}
                            activeOpacity={0.6}>
                              <CameraIcons
                                iconType={Ionicons}
                                name={'Flip'}
                                size={22}
                                color={colors.colors.white}
                                iconName={'camera-reverse-outline'}/>
                          </TouchableOpacity>}
                    </View>
                </View>
                {
                  props.showCountDownTimer &&
                  <CountDownTimer
                    countDownTimerStatus={(status) => props.countDownTimerStatus(status)}
                    isStartRecording={isRecording}/>
                }
            </View>
            {props.isPermissionGranted === 'denied' &&
                <NoPermissionView
                    getPermission={() => props.getPermission()}/>
            }
            {props.isSheetOpen &&
                <VideoBottomSheet
                    isVideoSheetCloseClick={() => props.isVideoSheetCloseClick()}
                    videoGalleryList={props.videoGalleryList}/>}
        </View>
    )
})

const styles = StyleSheet.create({
    cameraMainContainer : {
        flex:1,
    },
    cameraIconMainCont : {
        flex:1,
        marginTop:StatusBar.currentHeight,
    },
    cameraIconSubCont : {
        flex:1,
        marginTop:Platform.OS === 'ios' ? SPACE._2xl : SPACE._2lg,
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    cameraIconCont1:{
        flex:1,
    },
    cameraIconCont2 : {
        marginEnd: SPACE._2lg
    },
    cameraIconSize : {
        height:45,
        width:45,
        backgroundColor:colors.colors.transparent,
        borderRadius:120
    },
    button: {
        alignItems: 'center',
        backgroundColor:colors.colors.yellow,
        padding: 10,
    },
    buttonText: {
        color: colors.colors.white,
        fontSize: FONT_SIZE.xl,
        fontFamily : GILROY.medium
    },
    itemContainer: {
        padding: 12,
        margin: 6,
        overflow:'hidden',
        backgroundColor: colors.colors.yellow,
    },
    cameraRecordBtnMainCont : {
        justifyContent:'center',
        alignItems : 'center',
        flexDirection:'row',
        marginBottom:Platform.OS === 'android' ? SPACE._2lg : SPACE._4xl
    },
    cameraRecordBtnCont : {
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    cameraRecordBtnBorder : {
        height:75,
        width:75,
        borderRadius:120,
        borderWidth:3,
        borderColor:colors.colors.white,
        justifyContent:'center',
        alignItems:'center'
    },
    cameraRecordRedBtn : {
        height:60,
        width:60,
        borderRadius:120,
        backgroundColor:colors.colors.red
    },
    cameraRecordTimerCont : {
        marginBottom:SPACE._2lg,
        alignItems:'center'
    },
})
