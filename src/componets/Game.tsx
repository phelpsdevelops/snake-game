import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {  SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../styles/colors';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { Direction, GestureEventType,Coordinate } from '../types/types';
import Snake from './Snake';
import { checkGameOver } from '../utils/checkGameOver';
import Food from './Food';
import { checkEatsFood } from '../utils/checkEatFood';
import { randomFoodPosition } from '../utils/randomFoodPosition';
import Header from './Header';




const SNAKE_INTIAL_POSITION=[{x:5,y:5}];
const FOOD_INITIAL_POSITION={x:5,y:20};
const GAME_BOUNDS = { xMin: 0, xMax: 37,yMin: 0,yMax: 85}
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
    const [score, setScore]= React.useState<number>(0);
    React.useEffect(()=>{
        // move the snake if the game is not over 
            if(!isGameOver){
                //move every 50 milliseconds if the game is not paused 
                const intervalId= setInterval(()=>{
                    !isPaused && moveSnake();
                },MOVE_INTERNAL)
                return ()=> clearInterval(intervalId);
            }
    },[snake, isGameOver,isPaused])

    const moveSnake = ()=>{
        //grab the snake head thats in the array of the snake at position 0
        const snakeHead=snake[0];
        // cant just do snakeHead.x=10 because we are using react... we will have to create a copy
        const newHead={...snakeHead}// create a copy ( we will replace the state by passing the newHead)

        //game over 
        if (checkGameOver(snakeHead,GAME_BOUNDS)){

            setIsGameOver((prev)=>!prev);
            return;
        }
        
        //switch case to determine which way the snake will go.
        switch(direction){
            case Direction.Up:
                newHead.y -=1;
                break;
            case Direction.Down:
                newHead.y +=1;
                break;
            case Direction.Left:
                newHead.x -=1;
                break;
            case Direction.Right:
                newHead.x +=1;
                break;
                default:
                    break;

        }
        //if its food grow the snake 
            if (checkEatsFood(newHead,food,2)){
                setFood(randomFoodPosition(GAME_BOUNDS.xMax,GAME_BOUNDS.yMax))

                setSnake([newHead,...snake])
                //get another position for the food and set the score
                setScore(score+SCORE_INCREMENT);
              
            }
            else{
                setSnake([newHead,...snake.slice(0,-1)])
            }


        //we need to remove the last position of the head so that snake does not continually grow without eating so we will use the slice function
        //slice is used like this slice(start,end) start=where to begin end=where to stop, but not include
            

    }
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
const reloadGame= () =>{
    setSnake(SNAKE_INTIAL_POSITION);
    setFood(FOOD_INITIAL_POSITION)
    setIsGameOver(false);
    setScore(0);
    SetDirection(Direction.Right);
    setIsPaused(false);
};
const pauseGame= () =>{
    setIsPaused(!isPaused);
};
    return(
       <GestureDetector gesture={pan}>
        <SafeAreaView style={styles.container} >
            <Header isPaused={isPaused} pauseGame={pauseGame} reloadGame={reloadGame}>
                <Text style={{
                    fontSize:22,
                    fontWeight:"bold",
                    color:Colors.primary,
                }}>{score}</Text>
            </Header>
            <View style={styles.boundaries}> <Snake snake={snake}/>
            <Food x={food.x} y={food.y}/>
            </View>
        </SafeAreaView>
        </GestureDetector>
    )

}
const styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:Colors.primary,
        paddingTop:15,
        
    },
    boundaries:{
        flex:1,
        borderColor: Colors.primary,
        borderWidth:10,
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        backgroundColor:Colors.background,
    }

})