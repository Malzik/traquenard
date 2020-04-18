import {Alert, BackHandler} from 'react-native';

const handleAndroidBackButton = textReducer => {
    BackHandler.addEventListener('hardwareBackPress', () => {
        backAction(textReducer);
        return true;
    });
};

const backAction = textReducer => {
    Alert.alert(textReducer.texts["text.exit.title"], null, [
            {
                text: textReducer.texts["text.exit.no"],
                onPress: () => null,
                style: "cancel"
            },
            {text: textReducer.texts["text.exit.yes"], onPress: () => BackHandler.exitApp()}
        ],
        {cancelable: false});
    return true;
};

const removeAndroidBackButtonHandler = () => {
    BackHandler.removeEventListener('hardwareBackPress', () => {
    });
};

export {handleAndroidBackButton, removeAndroidBackButtonHandler};
