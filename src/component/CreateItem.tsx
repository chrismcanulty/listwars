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

  const onPress = () => {
    modifyTasks({id, name, description, assignee});
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
    </>
  );
}
