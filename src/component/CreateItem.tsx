import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useState} from 'react';
import styled from 'styled-components/native';

import UserInput from './UserInput';
import {LIST_COLOR} from '../constants';
import {useListContext} from '../context/ListContext';

const Button = styled.TouchableOpacity`
  background: white;
  border-radius: 10px;
  color: white;
  display: inline-block;
  margin-left: 100px;
  margin-right: 100px;
  margin-top: 30px;
  margin-bottom: 0px;
  opacity: 0.8;
`;
const ButtonText = styled.Text`
  color: black;
  font-family: 'Montserrat_Regular';
  font-size: 20px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
  text-align: center;
`;
const DeleteButton = styled.TouchableOpacity`
  background-color: #303030;
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`;

const ItemFinalizedText = styled.TextInput`
  color: ${LIST_COLOR};
  flex: 1;
  font-family: Montserrat-Regular;
  font-size: 20px;
  height: 40px;
  border-width: 1;
  padding: 10px;
`;

const ItemText = styled.Text`
  font-family: Montserrat-Regular;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 2px;
  color: ${LIST_COLOR};
`;

const ItemHeaderView = styled.View`
  align-items: center;
  background-color: '#303030';
  display: flex;
  flex-direction: row;
  height: 42px;
  justify-content: space-between;
  margin-top: 50px;
  margin-bottom: 30px;
`;

const ItemView = styled.View`
  display: flex;
  flex-direction: row;
  height: 42px;
  justify-content: space-between;
  align-items: center;
`;

export default function CreateItem({index, id}: {index: number; id: string}) {
  const {deleteListItem, modifyTasks, newListItems} = useListContext();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [finalizeTask, setFinalizeTask] = useState(false);
  const [error, setError] = useState(false);

  const errorCheck = () => {
    if (
      name.length < 2 ||
      name.length > 30 ||
      description.length < 2 ||
      description.length > 30 ||
      assignee.length < 2 ||
      assignee.length > 30
    ) {
      setError(true);
      return error;
    }
  };

  const onPress = () => {
    errorCheck();
    console.log('errorcheck', error);
    if (!error) {
      modifyTasks({id, name, description, assignee});
      setFinalizeTask(true);
    }
  };

  return (
    <>
      <ItemHeaderView>
        <ItemText style={{fontSize: 20}}>
          Task #{index + 1} ID #{id}
        </ItemText>
        {newListItems && newListItems.tasks?.length > 1 && (
          <DeleteButton
            onPress={() => {
              deleteListItem(Number(id));
            }}>
            <FontAwesomeIcon
              icon={faTrash}
              style={{color: LIST_COLOR}}
              size={20}
            />
          </DeleteButton>
        )}
      </ItemHeaderView>
      {!finalizeTask && (
        <>
          <ItemView>
            <ItemText>Task Name</ItemText>
          </ItemView>
          <ItemView>
            <UserInput text={name} setText={setName} />
          </ItemView>
          <ItemView>
            <ItemText>Task Description</ItemText>
          </ItemView>
          <ItemView>
            <UserInput text={description} setText={setDescription} />
          </ItemView>
          <ItemView>
            <ItemText>Assignee</ItemText>
          </ItemView>
          <ItemView>
            <UserInput text={assignee} setText={setAssignee} />
          </ItemView>
          <Button onPress={onPress}>
            <ButtonText>Set Task</ButtonText>
          </Button>
          {error && (
            <ItemView>
              <ItemText>
                Please enter between 2 and 30 characters in each field
              </ItemText>
            </ItemView>
          )}
        </>
      )}
      {finalizeTask && (
        <>
          <ItemView>
            <ItemText>Task Name</ItemText>
          </ItemView>
          <ItemView>
            <ItemFinalizedText>{name}</ItemFinalizedText>
          </ItemView>
          <ItemView>
            <ItemText>Task Description</ItemText>
          </ItemView>
          <ItemView>
            <ItemFinalizedText>{description}</ItemFinalizedText>
          </ItemView>
          <ItemView>
            <ItemText>Assignee</ItemText>
          </ItemView>
          <ItemView style={{marginBottom: 30}}>
            <ItemFinalizedText>{assignee}</ItemFinalizedText>
          </ItemView>
        </>
      )}
    </>
  );
}
