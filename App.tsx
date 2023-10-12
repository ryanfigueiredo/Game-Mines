import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert
} from 'react-native';
import params from './src/params';
import MineField from './src/components/MineField';
import { cloneBoard, createMinedBoard, flagsUsed, hadExplosition, invertFlag, openField, showMines, wonGame } from './src/logicHelpers';
import Header from './src/components/Header';
import LevelSelection from './src/screens/LevelSelection';

function App(): JSX.Element {
  const minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    
    return Math.ceil(cols * rows * params.difficultLevel)
  }
  
  const createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    
    return {
      board: createMinedBoard(rows, cols, minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false
    }
  }

  const onOpenField = (row, column) => {
    const board = cloneBoard(stateBoard)
    openField(board, row, column)
    const lost = hadExplosition(board)
    const won = wonGame(board)

    if(lost) {
      showMines(board)
      Alert.alert('Lost!', 'WTF')
    }

    if(won) {
      Alert.alert('Congratulations!!', 'You win')
    }

    setStateBoard(prevFields => ({
      ...prevFields,
      board,
      lost,
      won,
    }))
  }

  const onSelectField = (row, column) => {
    const board = cloneBoard(stateBoard)
    invertFlag(board, row, column)
    const won = wonGame(board)

    if(won) {
      Alert.alert('Congrats', 'You win!!')
    }

    setStateBoard(prevFields => ({
      ...prevFields,
      board,
      won
    }))
  }

  const onLevelSelected = level => {
    params.difficultLevel = level
    setStateBoard(createState())
  }

  const [stateBoard, setStateBoard] = useState(createState())

  return (
    <View style={styles.container}>
      <LevelSelection isVisible={stateBoard.showLevelSelection} onLevelSelected={onLevelSelected} onCancel={() => setStateBoard(prevFields => ({...prevFields, showLevelSelection: false}))} />
      <Header flagsLeft={minesAmount() - flagsUsed(stateBoard.board)}
        onNewGame={() => setStateBoard(createState())} 
        onFlagPress={() => setStateBoard(prevFields => ({...prevFields, showLevelSelection: true}))}/>

      <View style={styles.board}>
        <MineField board={stateBoard.board} onOpenField={onOpenField} onSelect={onSelectField}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  board: {
    alignItems: 'center',
    backgroundColor: '#AAA'
  }
});

export default App;
