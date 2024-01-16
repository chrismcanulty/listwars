import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';

import UserInput from './UserInput';
import {LIST_COLOR} from '../constants';
import {useListContext} from '../context/ListContext';

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
  const {deleteListItem, modifyTasks} = useListContext();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');

  // data state should be passed from parent component CreateScreen

  // CreateTask function should modify the state of a given task
  // based on the task id. The state should be tracked in context
  // so it's available in the parent component
  // the context function should modify the contents of newlistitems

  useEffect(() => {
    modifyTasks({id, name, description, assignee});
    console.log('testpika');
  }, [name, description, assignee]);

  return (
    <>
      <ItemHeaderView>
        <ItemText style={{fontSize: 20}}>
          Task #{index + 1} ID #{id}
        </ItemText>
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
    </>
  );
}
