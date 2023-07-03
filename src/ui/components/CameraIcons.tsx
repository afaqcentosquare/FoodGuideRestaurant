import React from 'react';
import {Dimensions, StyleProp, StyleSheet, TextStyle, View} from 'react-native';
// @ts-ignore
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

type Props = {
    iconType? : any
    iconName? : string,
    size? : number,
    color? : string,
    name? : string,
    nameStyle? : StyleProp<TextStyle>
}

export const CameraIcons = React.memo<Props>((props) =>
{
    return(
        <View style={styles.cameraIconMainCont}>
            <View style={styles.cameraIconSubCont}>
                <props.iconType
                    name={props.iconName}
                    size={props.size}
                    color={props.color}/>
            </View>
        </View>

    )
})

const styles = StyleSheet.create({
    cameraIconMainCont : {
        alignItems:'center'
    },
    cameraIconSubCont : {
        height:45,
        width:45,
        justifyContent:'center',
        alignItems:'center'
    }
})
