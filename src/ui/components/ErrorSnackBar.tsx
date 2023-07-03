import React from 'react';
// @ts-ignore
import SnackBar from 'react-native-snackbar-component'

type Props = {
    snackBarVisible : boolean,
    snackBarTxt : string
}

export const ErrorSnackBar = React.memo<Props>((props) =>
{
    return(
        <SnackBar
            position={"top"}
            visible={props.snackBarVisible}
            autoHidingTime={1500}
            textMessage={props.snackBarTxt}/>

    )
})

