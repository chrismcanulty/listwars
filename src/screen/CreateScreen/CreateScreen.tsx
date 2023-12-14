import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React from 'react';
import {ScrollView, StyleSheet, TextInput} from 'react-native';
import styled from 'styled-components/native';

import CreateItem from '../../component/CreatItem';
import {LIST_COLOR} from '../../constants';

// import {useListContext} from '../../context/ListContext';

const CreateView = styled.SafeAreaView`
  background-color: #000;
  flex: 1;
`;

const CreateHeader = styled.Text`
  color: ${LIST_COLOR};
  font-family: Montserrat-SemiBold;
  font-size: 25px;
  margin-bottom: 20px;
  text-align: center;
`;

const CreateSubheader = styled.Text`
  color: ${LIST_COLOR};
  font-family: Montserrat-SemiBold;
  font-size: 22px;
  margin-bottom: 20px;
  text-align: center;
`;

const ItemView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const CreateScreen = ({navigation}: NativeStackHeaderProps) => {
  // const {} = useListContext();

  const [title, onChangeTitle] = React.useState('Example title text');

  return (
    <CreateView>
      <ScrollView>
        <CreateHeader>Create New List</CreateHeader>
        <ItemView>
          <CreateSubheader>List Title</CreateSubheader>
        </ItemView>
        <ItemView>
          <TextInput
            style={styles.input}
            onChangeText={onChangeTitle}
            value={title}
          />
        </ItemView>
        <ItemView style={{marginTop: 40}}>
          <CreateSubheader>Tasks</CreateSubheader>
        </ItemView>
        <CreateItem />
      </ScrollView>
    </CreateView>
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    fontFamily: 'Montserrat-Regular',
    height: 40,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
});

export default CreateScreen;
