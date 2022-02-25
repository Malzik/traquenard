export default () => {
    return {
        "expo": {
            "name": "Traquenard",
            "slug": "Traquenard",
            "privacy": "public",
            "version": "1.0.2",
            "orientation": "default",
            "icon": "./assets/traquenardicon2.png",
            "splash": {
                "image": "./assets/traquenardicon.png",
                "resizeMode": "contain",
                "backgroundColor": "#2A2A2A"
            },
            "updates": {
                "fallbackToCacheTimeout": 0
            },
            "assetBundlePatterns": [
                "**/*"
            ],
            "ios": {
                "supportsTablet": true,
                "bundleIdentifier": "com.thetraquenard.corpo",
                "buildNumber": "1.0.0"
            },
            "android": {
                "package": "com.thetraquenard.corpo",
                "playStoreUrl": "https://play.google.com/store/apps/details?id=com.thetraquenard.corpo",
                "permissions": [],
                "versionCode": 9,
                "softwareKeyboardLayoutMode": "pan"
            },
            "web": {
                "favicon": "./assets/traquenardicon.png"
            },
            "androidNavigationBar": {
                "visible": "leanback",
                "backgroundColor": "#2A2A2A"
            }
        }
    };
};