import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import { ButtonProps } from '../app.interface';

export function NavButton(props:ButtonProps) {
  const { onPress, title } = props;
  return (
    <Pressable style={styles.navButton} onPress={onPress}>
      <Text style={styles.navButtonLabel}>{title}</Text>
    </Pressable>
  );
}

export function AnswerButton(props:ButtonProps) {
  const { onPress, title } = props;
  return (
    <Pressable style={styles.answerButton} onPress={onPress}>
      <Text style={styles.answerButtonLabel}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'green',
    },
  navButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "skyblue",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
    },
  navButtonLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  answerButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
  },
  answerButtonLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "coral",
  }
});
