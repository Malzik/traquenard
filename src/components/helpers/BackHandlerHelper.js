import {Alert, BackHandler} from 'react-native';

const exitTexts = [
    "text.exit.title",
    "text.exit.yes",
    "text.exit.no"
];

const handleAndroidBackButton = textReducer => {
    BackHandler.addEventListener('hardwareBackPress', () => {
        backAction(textReducer);
        return true;
    });
};

const backAction = textReducer => {
    const title = textReducer.texts["text.exit.title"].toString();
    const yes = textReducer.texts["text.exit.yes"].toString();
    const no = textReducer.texts["text.exit.no"].toString();
    Alert.alert(title, null, [
            {
                text: no,
                onPress: () => null,
                style: "cancel"
            },
            {text: yes, onPress: () => BackHandler.exitApp()}
        ],
        {cancelable: false});
    return true;
};

const removeAndroidBackButtonHandler = () => {
    BackHandler.removeEventListener('hardwareBackPress', () => {
    });
};

export {handleAndroidBackButton, removeAndroidBackButtonHandler};
