import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {FONT_SIZE, SPACE} from '../../config/Dimens';
import colors from '../../config/colors';
import {AppText} from './AppText';
import {GILROY, MONTSERRAT} from '../../config';

type Props = {
    isStartRecording : boolean,
    countDownTimerStatus : (status : boolean) => void,
}

export const CountDownTimer = React.memo<Props>((props) =>
{
    const countTimer = useRef(null);
    const [countDownTime,setCountDownTime] = useState(5);
    const countTimerRef = useRef(countDownTime);

    function countDownTimer()
    {
        countTimerRef.current -= 1;
        if (countTimerRef.current < 1)
        {
            props.countDownTimerStatus(false)
            setCountDownTime(0)
            // @ts-ignore
            clearInterval(countTimer.current);
        }
        else
        {
            setCountDownTime(countTimerRef.current)
        }
    }

    useEffect(() =>
    {
        // @ts-ignore
        countTimer.current = setInterval(() => {countDownTimer()},1000);
        // @ts-ignore
        return () => clearInterval(countTimer.current);
    },[])

    return(
        <View style={styles.countDownTimeMainCont}>
            <View style={styles.countDownTimeTxtCont}>
                <AppText
                    style={styles.countDownTimeTxt}
                    text={countDownTime.toString()}/>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    countDownTimeMainCont : {
        position:'absolute',
        top:0,right:0,
        left:0,
        bottom:0,
        justifyContent:'center',
        alignItems:'center'
    },
    countDownTimeTxtCont : {
        justifyContent:'center',
        alignItems:'center',
        borderRadius:8,
        height: 60,
        width: 55,
        backgroundColor: colors.colors.blue
    },
    countDownTimeTxt : {
        color:colors.colors.white,
        fontFamily:GILROY.semi_bold,
        fontSize:FONT_SIZE._3xl
    }

})
