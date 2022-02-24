package com.thetraquenard.corpo;

import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import com.yodo1.mas.Yodo1Mas;
import com.yodo1.mas.error.Yodo1MasError;
import com.yodo1.mas.event.Yodo1MasAdEvent;
import com.yodo1.mas.helper.model.Yodo1MasAdBuildConfig;

public class Yodo1MASAds extends ReactContextBaseJavaModule {
    ReactApplicationContext context = null;
    boolean initialized = false;

    Yodo1MASAds(ReactApplicationContext context) {
        super(context);
        this.context = context;
    }

    @ReactMethod
    public void initMasSdk()
    {
        Yodo1MasAdBuildConfig config = new Yodo1MasAdBuildConfig.Builder().enableUserPrivacyDialog(true).build();
        Yodo1Mas.getInstance().setAdBuildConfig(config);
        //Call Delegate Function before Init Sdk:
        intiDelagates();
        Yodo1Mas.getInstance().init(Yodo1MASAds.this.getCurrentActivity(), "MqqCsQVLP8", new Yodo1Mas.InitListener() {
            @Override
            public void onMasInitSuccessful() {
                setInitialized(true);
                sendEvent("onMasInitSuccessful");
            }
            @Override
            public void onMasInitFailed(@NonNull Yodo1MasError error) {
                sendEvent("onMasInitFailed");
            }
        });
    }

    @ReactMethod
    public void intiDelagates()
    {
        //Delegate for Banner
        Yodo1Mas.getInstance().setBannerListener(new Yodo1Mas.BannerListener() {
            @Override
            public void onAdOpened(@NonNull Yodo1MasAdEvent event) {
                sendEvent("banner-onAdOpened");
            }
            @Override
            public void onAdError(@NonNull Yodo1MasAdEvent event, @NonNull Yodo1MasError error) {
                sendEvent("banner-onAdError");
            }
            @Override
            public void onAdClosed(@NonNull Yodo1MasAdEvent event) {
                sendEvent("banner-onAdClosed");
            }
        });
        //Delegate for Interstitial
        Yodo1Mas.getInstance().setInterstitialListener(new Yodo1Mas.InterstitialListener() {
            @Override
            public void onAdOpened(@NonNull Yodo1MasAdEvent event) {
                sendEvent("interstitial-onAdOpened");
            }
            @Override
            public void onAdError(@NonNull Yodo1MasAdEvent event, @NonNull Yodo1MasError error) {
                sendEvent("interstitial-onAdError");
            }
            @Override
            public void onAdClosed(@NonNull Yodo1MasAdEvent event) {
                sendEvent("interstitial-onAdClosed");
            }
        });
        //Delegate for RewardedAds
        Yodo1Mas.getInstance().setRewardListener(new Yodo1Mas.RewardListener() {
            @Override
            public void onAdOpened(@NonNull Yodo1MasAdEvent event) {
                sendEvent("reward-onAdOpened");
            }
            @Override
            public void onAdvertRewardEarned(@NonNull Yodo1MasAdEvent event) {
                sendEvent("reward-onAdvertRewardEarned");
            }
            @Override
            public void onAdError(@NonNull Yodo1MasAdEvent event, @NonNull Yodo1MasError error) {
                sendEvent("reward-onAdError");
            }
            @Override
            public void onAdClosed(@NonNull Yodo1MasAdEvent event) {
                sendEvent("reward-onAdClosed");
            }
        });
    }

    @ReactMethod
    public void giveRewardToUsers(int rewardAmount)
    {
        Yodo1Mas.getInstance().setRewardListener(new Yodo1Mas.RewardListener() {
            @Override
            public void onAdOpened(@NonNull Yodo1MasAdEvent event) {
                sendEvent("giveReward-onAdOpened");
            }
            @Override
            public void onAdvertRewardEarned(@NonNull Yodo1MasAdEvent event) {
                sendEvent("giveReward-onAdvertRewardEarned");
            }
            @Override
            public void onAdError(@NonNull Yodo1MasAdEvent event, @NonNull Yodo1MasError error) {
                sendEvent("giveReward-onAdError");
            }
            @Override
            public void onAdClosed(@NonNull Yodo1MasAdEvent event) {
                sendEvent("giveReward-onAdClosed");
            }
        });

    }

    @ReactMethod
    public void showBannerAds()
    {
        int align = Yodo1Mas.BannerBottom | Yodo1Mas.BannerHorizontalCenter;
        Yodo1Mas.getInstance().showBannerAd(Yodo1MASAds.this.getCurrentActivity());
    }

    @ReactMethod
    public void hideBannerAds()
    {
        Yodo1Mas.getInstance().dismissBannerAd();
    }

    @ReactMethod
    public void showIntertstialAds()
    {
        Yodo1Mas.getInstance().showInterstitialAd(Yodo1MASAds.this.getCurrentActivity());
    }

    @ReactMethod
    public void showRewardedAds()
    {
        Yodo1Mas.getInstance().showRewardedAd(Yodo1MASAds.this.getCurrentActivity());
    }

    @ReactMethod
    public void isInitialized(final Promise promise){
        promise.resolve(this.initialized);
    }
    private void setInitialized(boolean initialized) {
        this.initialized = initialized;
    }

    @Override
    public String getName() {
        return "Yodo1MASAds";
    }

    private void sendEvent(String value) {
        WritableMap params = Arguments.createMap();
        params.putString("value", value);
        this.context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("adEvent", params);
    }

}