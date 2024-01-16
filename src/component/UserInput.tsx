import React from 'react';
import styled from 'styled-components/native';

const InputField = styled.TextInput`
  flex: 1;
  font-family: Montserrat-Regular;
  height: 40px;
  border-width: 1;
  padding: 10px;
  background-color: white;
`;

export default function UserInput({
  text,
  setText,
}: {
  text: string;
  setText: any;
}) {
  return (
    <InputField onChangeText={(text: string) => setText(text)} value={text} />
  );
}
