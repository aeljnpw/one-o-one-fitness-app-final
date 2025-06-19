# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Add any project specific keep options here:

# React Native
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-keep class com.facebook.jni.** { *; }

# Vector Icons
-keep class com.oblador.vectoricons.** { *; }

# React Native Reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# React Native SVG
-keep class com.horcrux.svg.** { *; }

# React Native Linear Gradient
-keep class com.BV.LinearGradient.** { *; }

# React Native Gesture Handler
-keep class com.swmansion.gesturehandler.** { *; }

# React Native Screens
-keep class com.swmansion.rnscreens.** { *; }

# React Native Safe Area Context
-keep class com.th3rdwave.safeareacontext.** { *; }

# AsyncStorage
-keep class com.reactnativecommunity.asyncstorage.** { *; }

# Device Info
-keep class com.learnium.RNDeviceInfo.** { *; }

# Permissions
-keep class com.zoontek.rnpermissions.** { *; }

# Haptic Feedback
-keep class com.mkuczera.** { *; }

# Chart Kit
-keep class org.wonday.** { *; }

# Progress
-keep class com.oblador.** { *; }