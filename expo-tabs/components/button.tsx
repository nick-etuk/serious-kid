import React from 'react';
import { Text, Pressable } from 'react-native';
import { ButtonProps } from '../app.interface';
import { btnStyles } from '../styles';

export function NavButton(props:ButtonProps) {
  const { onPress, title, style } = props;
  return (
    <Pressable style={style} onPress={onPress}>
      <Text style={btnStyles.navButtonLabel}>{title}</Text>
    </Pressable>
  );
}

export function AnswerButton(props:ButtonProps) {
  const { onPress, title } = props;
  return (
    <Pressable style={btnStyles.answerButton} onPress={onPress}>
      <Text style={btnStyles.answerButtonLabel}>{title}</Text>
    </Pressable>
  );
}


