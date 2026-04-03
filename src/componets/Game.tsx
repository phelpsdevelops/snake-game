import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {  SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../styles/colors';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export default function Game():React.JSX.Element{
    const handleGesture =(event: any) =>
    {

    }
    const pan=Gesture.Pan().minDistance(20).onEnd((event)=>{
        console.log(event)
        const {translationX,translationY} = event;

        //decide whether swipe was mostly horizontal or vertical
          if (translationX > 30) {
        //  handleSwipe("right");
        console.log("right");
        } else if (translationX < -30) {
        //  handleSwipe("left");
        console.log("left");
        }
        else {
        if (translationY > 30) {
        //  handleSwipe("down");
        console.log("down");
        } else if (translationY < -30) {
         // handleSwipe("up");
         console.log("up");
        }
      }
    });
    return(
       <GestureDetector gesture={pan}>
        <SafeAreaView style={styles.container} >

        </SafeAreaView>
        </GestureDetector>
    )

}
const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.primary,
    }

})