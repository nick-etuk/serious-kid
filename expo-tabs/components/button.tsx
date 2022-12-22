import React from 'react';
import { Text, Pressable } from 'react-native';
import { ButtonProps } from '../app.interface';
import { buttonStyles } from '../styles';

export function NavButton(props:ButtonProps) {
  const { onPress, title, style } = props;
  return (
    <Pressable style={style} onPress={onPress}>
      <Text style={buttonStyles.newNavButtonLabel}>{title}</Text>
    </Pressable>
  );
}

export function AnswerButton(props:ButtonProps) {
  const { onPress, title } = props;
  return (
    <Pressable style={buttonStyles.answerButton} onPress={onPress}>
      <Text style={buttonStyles.answerButtonLabel}>{title}</Text>
    </Pressable>
  );
}


