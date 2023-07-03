import React, { FC, useEffect, useState } from "react";
import {VideoView} from './VideoView';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AllScreenStackParamList} from '../../../routes/all_routes/AllScreenStack';
import { RNFFmpeg } from "react-native-ffmpeg";
import RNFetchBlob from "rn-fetch-blob";
import { BackHandler } from "react-native";
import Snackbar from "react-native-snackbar";

type Props = {}

type videoNavProp = StackNavigationProp<AllScreenStackParamList>;

const VideoController : FC<Props> = () =>
{
    const navigation = useNavigation<videoNavProp>();
    // @ts-ignore
    const route = useRoute<videoNavProp['videoPath']>();
    const videoPathData = route.params.videoPath  ;

    const [videoVisibleDialog,setVideoVisibleDialog] = useState(false);
    const [deleteVisibleDialog,setDeleteVisibleDialog] = useState(false);
    const [muted,setMuted] = useState<'off' | 'on'>('on');
    const [enableMuted,setEnableMuted] = useState(false);
    const [isPlayVideo,setIsPlayVideo] = useState(false);
    const [isProgressDialogVisible,setIsProgressDialogVisible] = useState(false);
    const [thumbNailPath,setThumbNailPath] = useState('')
    const folderPath = "file:///storage/emulated/0/DCIM/Camera/";
    const videoFilePath = folderPath + "VID_" + Date.now() + ".mp4" ;

    function handleBackButtonClick()
    {
        navigation.goBack();
        return true;
    }

    function saveVideoLocal()
    {
        setVideoVisibleDialog(false);
        setIsProgressDialogVisible(true);
        RNFetchBlob.fs.isDir(folderPath).then((isDir : boolean) =>
        {
            if(isDir)
            {
                RNFFmpeg.execute('-y -i ' + videoPathData + ' -c:v libx264 -codec:a copy -preset ultrafast -b:v  1800k ' + videoFilePath )
                  .then((result) =>
                    {
                        console.log("RESULT : " + result)
                        if(result === 0)
                        {
                            setIsProgressDialogVisible(false)
                            //generateThumbnail(videoPathData)
                            navigation.navigate('AddPost',{videoPath : videoFilePath})
                            console.log("compress Successfully" + result);
                        }
                        else
                        {
                            Snackbar.show({ text:"Something went wrong", duration: Snackbar.LENGTH_LONG, });
                            setIsProgressDialogVisible(false)
                        }
                    },
                  )
                /*RNFFmpeg.execute('-i ' + videoPathData + ' -s 576x1024 -vf scale=1024:576 -codec:a copy -preset ultrafast -vcodec h264 -b:v  1800k -acodec mp3 ' + videoFilePath )
                  .then((result) =>
                    {
                        setIsProgressDialogVisible(false)
                        //generateThumbnail(videoPathData)
                        console.log("compress Successfully" + result);
                    },
                  );*/
            }
            else
            {
                RNFFmpeg.execute('-y -i ' + videoPathData + ' -c:v libx264 -codec:a copy -preset ultrafast -b:v  1800k ' + videoFilePath )
                  .then((result) =>
                    {
                        console.log("RESULT : " + result)
                        if(result === 0)
                        {
                            setIsProgressDialogVisible(false)
                            //generateThumbnail(videoPathData)
                            navigation.navigate('AddPost',{videoPath : videoFilePath})
                            console.log("compress Successfully" + result);
                        }
                        else
                        {
                            Snackbar.show({ text:"Something went wrong", duration: Snackbar.LENGTH_LONG, });
                            setIsProgressDialogVisible(false)
                        }
                    },
                  );
                /*RNFetchBlob.fs.mkdir(folderPath).then(() =>
                {
                    RNFFmpeg.execute('-i ' + videoPathData + ' -s 576x1024 -vf scale=1024:576 -codec:a copy -preset ultrafast -vcodec h264 -b:v  1800k -acodec mp3 ' + videoFilePath)
                      .then((result) =>
                        {
                            setIsProgressDialogVisible(false)
                            //generateThumbnail(videoPathData)
                            console.log("compress Successfully" + result);
                        },
                      );
                })*/
            }
        })
    }

    function checkMuted()
    {
        if(!enableMuted)
        {
            setMuted('off')
            setEnableMuted(true)
        }
        else
        {
            setMuted('on')
            setEnableMuted(false)
        }
    }

    function deleteVideo()
    {
        RNFetchBlob.fs
            .unlink(videoPathData)
            .then(() =>
            {
                navigation.goBack();
                setDeleteVisibleDialog(false);
            })
            .catch(err =>
            {
                console.log(err);
            });
    }

    useEffect(() =>
    {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
    },[])

    return(
        <VideoView
            videoPath={videoPathData}
            muted={muted}
            enableMuted={enableMuted}
            isPlayVideo={isPlayVideo}
            isProgressDialogVisible={isProgressDialogVisible}
            videoVisibleDialog={videoVisibleDialog}
            deleteVisibleDialog={deleteVisibleDialog}
            playBtnClick={() => setIsPlayVideo(!isPlayVideo)}
            muteBtnClick={() => checkMuted()}
            deleteBtnClick={() => setDeleteVisibleDialog(!deleteVisibleDialog)}
            downloadBtnClick={() => setVideoVisibleDialog(!videoVisibleDialog)}
            videoDialogSaveBtnClick={() => saveVideoLocal()}
            videoDialogCancelBtnClick={() => setVideoVisibleDialog(!videoVisibleDialog)}
            deleteDialogDeleteBtnClick={() => deleteVideo()}
            deleteDialogCancelBtnClick={() => setDeleteVisibleDialog(!deleteVisibleDialog)} />
    )
}

export default VideoController ;
