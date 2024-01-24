import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, ScrollView, StyleSheet, TextInput} from 'react-native';
import styled from 'styled-components/native';

import CreateItem from '../../component/CreateItem';
import {LIST_COLOR} from '../../constants';
import {useListContext} from '../../context/ListContext';

const AddButton = styled.TouchableOpacity`
  background-color: #000;
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`;

const Button = styled.TouchableOpacity`
  background: white;
  border-radius: 10px;
  color: white;
  display: inline-block;
  margin-top: 30px;
  margin-bottom: 30px;
  opacity: 0.8;
`;

const ButtonText = styled.Text`
  color: black;
  font-family: 'Montserrat_Regular';
  font-size: 24px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
  text-align: center;
`;

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
  text-align: center;
`;
const ErrorText = styled.Text`
  font-family: Montserrat-Regular;
  font-size: 16px;
  font-weight: 500;
  color: red;
  position: absolute;
`;
const ErrorView = styled.View`
  align-items: center;
  position: relative;
`;
const ItemView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

// should only show trash icon when there is more than one list item

const CreateScreen = ({navigation}: NativeStackHeaderProps) => {
  const {addNewListItem, newListItems, finalizedTasks} = useListContext();

  const [title, onChangeTitle] = React.useState('Example title text');
  const [submitError, setSubmitError] = React.useState(false);

  // onpress: navigate to list screen with data that has been entered if
  // all tasks have been finalized with correct number of characters
  // if not, do not navigate instead render error message telling user
  // what they should do

  const listFinalized = (arr: {id: string; finalized: boolean}[]) => {
    if (arr?.every(v => v.finalized === true)) {
      return true;
    }
    return false;
  };

  const onPress = () => {
    if (listFinalized(finalizedTasks)) {
      navigation.push('List');
    }
    if (!listFinalized(finalizedTasks)) {
      setSubmitError(true);
    }
  };

  if (!newListItems) return null;
  return (
    <CreateView>
      <CreateHeader>Create New List</CreateHeader>
      <ScrollView>
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
        <FlatList
          data={newListItems.tasks}
          keyExtractor={item => item.id}
          renderItem={({index, item}) => (
            <CreateItem index={index} id={item.id} />
          )}
        />
        <AddButton onPress={addNewListItem}>
          <FontAwesomeIcon
            icon={faPlus}
            style={{color: LIST_COLOR}}
            size={26}
          />
        </AddButton>
        {submitError && (
          <ErrorView>
            <ErrorText>Please set all tasks then resubmit</ErrorText>
          </ErrorView>
        )}
        <Button onPress={onPress}>
          <ButtonText>Submit Form</ButtonText>
        </Button>
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
