import RNFS from 'react-native-fs';
import CameraRoll from '@react-native-community/cameraroll';
import { videoObj } from "../models/VideoRes";
//import {RNFFmpeg} from 'react-native-ffmpeg';


async function saveVideoCustomDir(videoPathData : any)
{
    try
    {
        return new Promise((resolve, reject) =>
        {
            CameraRoll.save(videoPathData, {type: "video", album: 'FoodGuide'})
              .then((result) =>
              {
                  resolve(result)
                  console.log("RESULT : " + result);
              })
        })


    }
    catch (e)
    {
        console.log("SAVE_VIDEO_CUSTOM_DIR : " + e);
    }

}

async function getVideosCustomDir()
{
    try
    {
        return new Promise((resolve,reject) =>
        {
            CameraRoll.getPhotos({
                first :2000000,
                assetType : "Videos",
            })
              .then((result) =>
              {
                  // @ts-ignore
                  console.log("videos" + JSON.stringify(result.edges))
                  // @ts-ignore
                  //resolve(result.edges);
              })
              .catch((err) =>
              {
                  //Error Loading Images
              });
            //let videoList : Array<videoObj> = []

            /*RNFS.readDir("file:///storage/emulated/0/DCIM/Camera/")
                .then((result) =>
                {
                    //console.log("list + " + result);
                    // @ts-ignore
                    videoList = result
                    //videoList.push(result)
                    RNFS.readDir("file:///storage/emulated/0/WhatsApp Business/Media/WhatsApp Business Video/")
                      .then((result) =>
                      {
                          //console.log('GOT RESULT', result);
                          // @ts-ignore
                          videoList = [...result,...videoList]
                          resolve(videoList)
                          // stat the first file
                          return Promise.all([RNFS.stat(result[0].path), result[0].path]);
                      })
                      .catch((err) =>
                      {
                          console.log(err.message, err.code);
                      });
                    // stat the first file
                    return Promise.all([RNFS.stat(result[0].path), result[0].path]);
                })
                .catch((err) =>
                {
                    console.log(err.message, err.code);
                });*/
        })

    }
    catch (e)
    {
        console.log("GET_VIDEO_CUSTOM_DIR : " + e);
    }

}

export default {
    saveVideoCustomDir,
    getVideosCustomDir
}
