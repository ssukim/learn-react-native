package com.todoapp

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class BrightnessModule(reactApplicationContext: ReactApplicationContext): ReactContextBaseJavaModule(reactApplicationContext) {

    override fun getName(): String{
        return "BrightnessModule"
    }

    override fun getConstants(): MutableMap<String, Any>{
        val constants = HashMap<String, Any>()
        constants.put("SAMPLE_VALUE", "Hello World")
        return constants
    }

    @ReactMethod
    fun getBrightness(promise: Promise)  {
        val activity = currentActivity!!
        val lp = activity.window.attributes
        promise.resolve(lp.screenBrightness)
    }

    @ReactMethod
    fun setBrightness(brightness: Float)  {
        val activity = currentActivity!!
        activity.runOnUiThread {
            val lp = activity.window.attributes
            lp.screenBrightness = brightness
            activity.window.attributes = lp
        }
    }
}