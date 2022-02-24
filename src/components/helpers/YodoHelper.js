import { NativeModules, NativeEventEmitter, Alert } from 'react-native'
import {store} from "../../store/store";
const { Yodo1MASAds } = NativeModules

export const hasReward = () => {
    // Your code here to check if the user has earned a reward
    // From Redux, AsyncStorage
    return true
}

export const setReward = () => {
    // Your code here to store that the user earned a reward
    // Redux, AsyncStorage, etc...
}

export const isAdsInitialized = () => {
    // Your code here to check if the ads are initialized from other components
}

export const setAdsInitialized = (isInitialized) => {
    // Your code here to set the adsInitialized state
    // Redux, AsyncStorage, etc...
}

export const showAdExplainer = () =>
    Alert.alert('You must watch the entire Ad to earn the reward!')

const handleYodoEvent = ({ value }) => {
    __DEV__ && console.log(`MAS Event: ${value}`)
    switch (value) {
        // Event received when Ads initialization is successful
        case 'onMasInitSuccessful':
            setAdsInitialized(true)
            break

        case 'onMasInitFailed':
            setTimeout(() => Yodo1MASAds.initMasSdk(), 5000) // Try again in 5 seconds
            break

        // User earned a reward!
        case 'reward-onAdvertRewardEarned':
            setReward()
            break

        // User closed the Ad, let's check if he earned a reward
        case 'reward-onAdClosed':
            setTimeout(() => hasReward() ? null : showAdExplainer(), 500)
            break

        // Something went wrong, let's skip the checks on reward
        case 'reward-onAdError':
            setReward()
            break

        case 'interstitial-onAdOpened':
            store.dispatch({type:"PUB_STATE", isOpen: true})
            break

        // User closed the Ad, let's check if he earned a reward
        case 'interstitial-onAdError':
            console.log('interstitial-onAdError');
            break

        // Something went wrong, let's skip the checks on reward
        case 'interstitial-onAdClosed':
            store.dispatch({type:"PUB_STATE", isOpen: false})
            break
    }
}

// Call me on App Initialization
export const registerYodoAds = () => {
    const eventEmitter = new NativeEventEmitter(Yodo1MASAds)
    const eventListener = eventEmitter.addListener('adEvent', handleYodoEvent)
    Yodo1MASAds.initMasSdk()
    return eventListener
}

export const showInterstitialAds = async () => {
    const adsAvailable = await Yodo1MASAds.isInitialized()
    adsAvailable && Yodo1MASAds.showIntertstialAds()
}

export const showRewardedAds = async () => {
    const adsAvailable = await Yodo1MASAds.isInitialized()
    adsAvailable ? Yodo1MASAds.showRewardedAds() : setReward()
}