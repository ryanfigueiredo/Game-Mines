import React from 'react'
import { StyleSheet, View } from 'react-native'
import Field from './Field'

interface IBoard {
  board: any[],
  onOpenField: (r: number, c: number) => void,
  onSelect: (r: number, c: number) => void
}

export default ({ board, onOpenField, onSelect }: IBoard) => {
  const rows = board.map((row, indexRow) => {
    const columns = row.map((field, indexField) => {
      return <Field key={indexField} {...field} 
        onOpen={() => onOpenField(indexRow, indexField)}
        onSelect={() => onSelect(indexRow, indexField)} />
    })

    return <View style={{flexDirection: 'row'}} key={indexRow}>
      {columns}
    </View>
  })

  return (
    <View style={styles.container}>
      {rows}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE'
  }
})