import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {CameraView} from './CameraView';
import {
    Camera,
    CameraDeviceFormat,
    CameraRuntimeError,
    frameRateIncluded, sortFormats,
    useCameraDevices,
} from "react-native-vision-camera";
import {StackNavigationProp} from '@react-navigation/stack';
import {AllScreenStackParamList} from '../../../routes/all_routes/AllScreenStack';
import Permission from '../../../hooks/Permission';
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../../redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/stores/store";
import { setIsRecording } from "../../../redux/slice/CameraSlice";
import FileSystem from "../../../hooks/FileSystem";
import { videoObj } from "../../../models/VideoRes";
import { BackHandler } from "react-native";

type Props = {}

type cameraNavProp = StackNavigationProp<AllScreenStackParamList>;

const CameraController : FC<Props> = () =>
{
    const navigation = useNavigation<cameraNavProp>();

    function handleBackButtonClick()
    {
        navigation.goBack();
        return true;
    }

    //lists
    const [videoGalleryList,setVideoGalleryList] = useState<Array<videoObj>>([]);
    const [isPermissionGranted,setIsPermissionGranted] = useState("");
    const dispatch = useAppDispatch();
    const { isRecording } = useSelector((state: RootState) => state.Camera);

    //reference
    const cameraRef = useRef<Camera>(null);
    const [onCameraInitialized,setOnCameraInitialized] = useState(false);
    const devices = useCameraDevices();
    const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('back');
    const device = devices[cameraPosition];

    //check state icons
    const [flash, setFlash] = useState<'off' | 'on'>('off');
    const [mic,setMic] = useState<'off' | 'on'>('on');

    //enable icons
    const [enableMic,setEnableMic] = useState(true);
    const [enableHdr, setEnableHdr] = useState(false);
    const [enableNightMode,setEnableNightMode] = useState(false)
    const [isSheetOpen,setIsSheetOpen] = useState(false);
    const [countDownStatus,setCountDownStatus] = useState(false);

    const formats = useMemo<CameraDeviceFormat[]>(() => {
        if (device?.formats == null) return [];
        return device.formats.sort(sortFormats);
    }, [device?.formats]);

    //#region Memos
    const [is60Fps, setIs60Fps] = useState(false);

    const fps = useMemo(() => {
        if (!is60Fps) return 30;

        if (enableNightMode && !device?.supportsLowLightBoost) {
            // User has enabled Night Mode, but Night Mode is not natively supported, so we simulate it by lowering the frame rate.
            return 30;
        }

        const supportsHdrAt60Fps = formats.some((f) => f.supportsVideoHDR && f.frameRateRanges.some((r) => frameRateIncluded(r, 60)));
        if (enableHdr && !supportsHdrAt60Fps) {
            // User has enabled HDR, but HDR is not supported at 60 FPS.
            return 30;
        }

        const supports60Fps = formats.some((f) => f.frameRateRanges.some((r) => frameRateIncluded(r, 60)));
        if (!supports60Fps) {
            // 60 FPS is not supported by any format.
            return 30;
        }
        // If nothing blocks us from using it, we default to 60 FPS.
        return 60;
    }, [device?.supportsLowLightBoost, enableHdr, enableNightMode, formats, is60Fps]);

    const supportsCameraFlipping = useMemo(() => devices.back != null && devices.front != null, [devices.back, devices.front]);
    const supportsFlash = device?.hasFlash ?? false;
    const supportsHdr = useMemo(() => formats.some((f) => f.supportsVideoHDR || f.supportsPhotoHDR), [formats]);
    const supports60Fps = useMemo(() => formats.some((f) => f.frameRateRanges.some((rate) => frameRateIncluded(rate, 60))), [formats]);
    const canToggleNightMode = enableNightMode
      ? true // it's enabled so you have to be able to turn it off again
      : (device?.supportsLowLightBoost ?? false) || fps > 30; // either we have native support, or we can lower the FPS
    //#endregion

    const format = useMemo(() => {
        let result = formats;
        if (enableHdr) {
            // We only filter by HDR capable formats if HDR is set to true.
            // Otherwise we ignore the `supportsVideoHDR` property and accept formats which support HDR `true` or `false`
            result = result.filter((f) => f.supportsVideoHDR || f.supportsPhotoHDR);
        }

        // find the first format that includes the given FPS
        return result.find((f) => f.frameRateRanges.some((r) => frameRateIncluded(r, fps)));
    }, [formats, fps, enableHdr]);

    const onError = useCallback((error: CameraRuntimeError) => {
        console.error("CAMERA ERROR" + error);
    }, []);

    function onChangeCameraClick()
    {
        if(cameraPosition === "front")
        {
            setCameraPosition('back')
        }
        else
        {
            setCameraPosition('front')
        }
    }

    function onFlashClick()
    {
        if(flash === 'on')
        {
            setFlash('off');
        }
        else
        {
            setFlash('on');
        }
    }

    function onMicClick()
    {
        if(mic === 'on')
        {
            setMic('off');
            setEnableMic(false);
        }
        else
        {
            setMic('on');
            setEnableMic(true)
        }
    }

    function saveVideo(videoPath : any)
    {
        try
        {
            navigation.navigate('Video',{videoPath : videoPath});
        }
        catch (e)
        {
            console.log("SIGN_ERROR : " + e)
        }
    }

    const onInitialized = useCallback(() => {
        setOnCameraInitialized(true);
    }, []);

    function onHdrClick()
    {
        setEnableHdr(!enableHdr)
    }

    async function startRecording()
    {
        try
        {
            if (cameraRef.current != null)
            {
                if(!isRecording)
                {
                    //console.log("if call")
                    if(countDownStatus)
                    {
                        setCountDownStatus(false)
                        dispatch(setIsRecording(true))
                        cameraRef.current.startRecording({
                            flash: flash,
                            fileType: 'mp4',
                            onRecordingFinished: (video) =>
                            {
                                saveVideo(video.path)
                            },
                            onRecordingError: (error: any) =>
                            {
                                console.error(error);
                            },
                        });
                    }
                    else
                    {
                        if (!isRecording)
                        {
                            setCountDownStatus(true)
                        }
                        else
                        {
                            setCountDownStatus(false)
                        }
                    }
                }
                else
                {
                    stopRecording()
                }
            }
        }
        catch (e)
        {
            console.error('failed to start recording!', e, 'camera');
        }
    }

    function stopRecording()
    {
        dispatch(setIsRecording(false))
        setCountDownStatus(false)
        setTimeout(() => {
            // @ts-ignore
            cameraRef.current?.stopRecording()
        },2000)
    }

    function getGalleryData()
    {
        setIsSheetOpen(true)
        FileSystem.getVideosCustomDir().then((result) =>
        {
            // @ts-ignore
            setVideoGalleryList(result);
        })
    }

    function countStatus(status : boolean)
    {
        if(status)
        {
            setCountDownStatus(status)
        }
        else
        {
            dispatch(setIsRecording(true))
            setCountDownStatus(status)
            startRecording().then(r => r);
        }
    }

    function getPermission()
    {
        Permission.ReadStoragePermission().then((result : any) =>
        {
            if(result === 'granted')
            {
                setIsPermissionGranted(result)
            }
            else
            {
                setIsPermissionGranted(result)
            }
        })
    }

    function sheetCheck()
    {
        if(isSheetOpen)
        {
            setIsSheetOpen(false)
        }
        else
        {
            setIsSheetOpen(true);
        }
    }

    useEffect(() =>
    {
        getPermission()

        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    },[])

    return(
        <CameraView
            cameraRef={cameraRef}
            device={device}
            videoGalleryList={videoGalleryList}
            onInitialized={() => onInitialized()}
            isPermissionGranted={isPermissionGranted}
            isRecording={isRecording}
            enableMic={enableMic}
            enableHdr={enableHdr}
            isSheetOpen={isSheetOpen}
            flash={flash}
            mic={mic}
            fps={60}
            format={format}
            showCountDownTimer={countDownStatus}
            onError={() => onError}
            supportFlash={supportsFlash}
            startRecording={() => startRecording() }
            onMicClick={() => onMicClick()}
            onHdrClick={() => onHdrClick()}
            onFlashClick={() => onFlashClick()}
            getPermission={() => getPermission()}
            onChangeCameraClick={() => onChangeCameraClick()}
            getGalleryData={() => getGalleryData()}
            isVideoSheetCloseClick={() => sheetCheck()}
            stopRecClick={() => stopRecording()}
            countDownTimerStatus={(status) => countStatus(status)} />
    )
}

export default CameraController ;

