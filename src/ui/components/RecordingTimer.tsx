import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {FONT_SIZE, SPACE} from '../../config/Dimens';
import colors from '../../config/colors';
import {AppText} from './AppText';
import { GILROY, MONTSERRAT } from "../../config";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/stores/store";
import { setIsRecording } from "../../redux/slice/CameraSlice";
import { useAppDispatch } from "../../redux";
import { Camera } from "react-native-vision-camera";

type Props = {
    isStartRecording : boolean,
    stopRecClick : () => void
}

export const RecordingTimer = React.memo<Props>((props) =>
{
    const dispatch = useAppDispatch();
    const { isRecording } = useSelector((state: RootState) => state.Camera);
    const timer = useRef(null);
    const [mint,setMint] = useState(0);
    const [sec,setSec] = useState(0);
    const secRef = useRef(sec);
    const mintRef = useRef(mint);

    function startTimer()
    {
        secRef.current += 1;
        if (15 <= secRef.current)
        {
            /*setMint(mintRef.current +=1)*/
            setSec(0)
            // @ts-ignore
            clearInterval(timer.current)
            props.stopRecClick()

        }
        else
        {
            setSec(secRef.current);
        }
    }

    function changeTime()
    {
        let mintDisplay = mint > 9 ? mint : '0' + mint ;
        let secDisplay = sec > 9 ? sec : '0' + sec ;
        return mintDisplay.toString() + ' : ' + secDisplay.toString();
    }

    useEffect(() =>
    {
        if(isRecording)
        {
            // @ts-ignore
            timer.current = setInterval(() =>
            {
                startTimer()
            },1000);
            // @ts-ignore
            return () => clearInterval(timer.current);
        }
    },[])

    return(
        <View style={styles.recordTimeMainCont}>
            <AppText
                style={styles.recordTimeTxt}
                text={changeTime()}/>
        </View>
    )
})

const styles = StyleSheet.create({
    recordTimeMainCont : {
        paddingStart:SPACE._2xl,
        paddingEnd:SPACE._2xl,
        height:40,
        backgroundColor:colors.colors.red,
        borderRadius:120,
        justifyContent:'center',
        alignItems:'center'
    },
    recordTimeTxt : {
        fontFamily:GILROY.semi_bold,
        letterSpacing:1,
        fontSize:FONT_SIZE.xl,
        color:colors.colors.white
    }
})
