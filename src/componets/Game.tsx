import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {  SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../styles/colors';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Direction, GestureEventType,Coordinate } from '../types/types';
import Snake from './Snake';




const SNAKE_INTIAL_POSITION=[{x:5,y:5}];
const FOOD_INITIAL_POSITION={x:5,y:20};
const GAME_BOUNDS = { Xmin:0, Xmax:35,yMin:0,yMax:63}
const MOVE_INTERNAL=50;
const   SCORE_INCREMENT =10;

export default function Game():React.JSX.Element{
    const [direction, SetDirection]=React.useState<Direction>(Direction.Right);
    const [snake,setSnake]= React.useState<Coordinate[]>(
        SNAKE_INTIAL_POSITION);
    const [food,setFood]= React.useState<Coordinate>(
        FOOD_INITIAL_POSITION
    )
    const [isGameOver,setIsGameOver]= React.useState<boolean>(false);
    const [isPaused,setIsPaused]= React.useState<boolean>(false);
   const handleGesture = (event: GestureEventType) => {
  const { translationX, translationY } = event;

  if (translationX > 30) {
    SetDirection(Direction.Right);
    console.log(direction)
  } else if (translationX < -30) {
    SetDirection(Direction.Left);
    console.log(direction)
  } else if (translationY > 30) {
    console.log(direction)
    SetDirection(Direction.Down);
     
  } else if (translationY < -30) {
    SetDirection(Direction.Up);
    console.log(direction) 
  }
};

const pan = Gesture.Pan().onEnd((event) => {
  handleGesture(event);
});
    return(
       <GestureDetector gesture={pan}>
        <SafeAreaView style={styles.container} >
            <View style={styles.boundaries}> <Snake snake={snake}/></View>
        </SafeAreaView>
        </GestureDetector>
    )

}
const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.primary,
        paddingTop:5
    },
    boundaries:{
        flex:1,
        borderColor: Colors.primary,
        borderWidth:15,
        
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        borderTopRightRadius:30,
        borderTopLeftRadius:30,
        backgroundColor:Colors.background,
    }

})