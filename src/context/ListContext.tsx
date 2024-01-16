import React from 'react';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import {List, Task} from '../../types/data';
import {DefaultList} from '../data/DefaultList';
import {Data} from '../data/MockData';

export type ListContent = {
  listItems:
    | {
        listName: string;
        tasks: Array<{
          id: string;
          title: string;
          details: string;
          whodunnit: string;
          status: string;
        }>;
      }
    | undefined;
  newListItems:
    | {
        listName: string;
        tasks: Array<{
          id: string;
          title: string;
          details: string;
          whodunnit: string;
          status: string;
        }>;
      }
    | undefined;
  setListItems: Dispatch<
    SetStateAction<{
      listName: string;
      tasks: {
        id: string;
        title: string;
        details: string;
        whodunnit: string;
        status: string;
      }[];
    }>
  >;
  setNewListItems: Dispatch<
    SetStateAction<{
      listName: string;
      tasks: {
        id: string;
        title: string;
        details: string;
        whodunnit: string;
        status: string;
      }[];
    }>
  >;
  getListItems: () => void;
  getNewListItems: () => void;
  addNewListItem: () => void;
  deleteListItem: (id: number) => void;
  modifyTasks: ({
    id,
    name,
    description,
    assignee,
  }: {
    id: string;
    name: string;
    description: string;
    assignee: string;
  }) => void;
  listCleared: boolean;
  setListCleared: Dispatch<SetStateAction<boolean>>;
  checkListCleared: (arr: List) => void;
  listClickComplete: (i: string) => void;
  listWinner: (arr: List) => void;
};

export const MyListContext = createContext<ListContent>({
  listItems: {
    listName: 'none',
    tasks: [
      {
        id: '1',
        title: 'none',
        details: 'none',
        whodunnit: 'none',
        status: 'incomplete',
      },
    ],
  },
  newListItems: {
    listName: '',
    tasks: [
      {
        id: '1',
        title: '',
        details: '',
        whodunnit: '',
        status: 'incomplete',
      },
    ],
  },
  setListItems: () => {},
  setNewListItems: () => {},
  getListItems: () => {},
  getNewListItems: () => {},
  addNewListItem: () => {},
  deleteListItem: () => {},
  modifyTasks: () => {},
  listCleared: false,
  setListCleared: () => {},
  checkListCleared: () => {},
  listClickComplete: () => {},
  listWinner: () => {},
});

export function MyListProvider({children}: {children: React.ReactNode}) {
  const [listItems, setListItems] = useState<ListContent['listItems']>();
  const [newListItems, setNewListItems] =
    useState<ListContent['newListItems']>(DefaultList);
  const [listCleared, setListCleared] = useState(false);

  const [errorMessage, setErrorMessage] = useState<unknown>(null);
  const tempData = {...Data};

  const getListItems = useCallback(() => {
    setListItems(tempData);
  }, []);

  const getNewListItems = useCallback(() => {
    setNewListItems(DefaultList);
  }, []);

  const addNewListItem = useCallback(() => {
    const newList = {...DefaultList};
    const newId = Number(newList.tasks[newList.tasks.length - 1].id) + 1;
    const newItem = {
      id: `${newId}`,
      title: '',
      details: '',
      whodunnit: '',
      status: '',
    };
    newList.tasks.push(newItem);
    setNewListItems(newList);
  }, []);

  const deleteListItem = useCallback((id: string) => {
    const newList = {...newListItems};

    const index = newList.tasks?.findIndex(x => Number(x.id) === Number(id));

    if (Number(id) > -1 && index) {
      newList.tasks?.splice(index, 1);
    }
    if (newListItems) {
      setNewListItems(newList);
    }
  }, []);

  const modifyTasks = useCallback(
    ({
      id,
      name,
      description,
      assignee,
    }: {
      id: string;
      name: string;
      description: string;
      assignee: string;
    }) => {
      const tempList = {...newListItems};
      const task = {
        id: id,
        title: name,
        details: description,
        whodunnit: assignee,
        status: 'incomplete',
      };

      // let index = tempList.tasks?.findIndex(x => Number(x.id) === Number(id));

      if (Number(id) > -1) {
        const oldDetails = tempList.tasks?.find(id => id === id);
        oldDetails && Object.assign(oldDetails, task);
      }
      if (newListItems) {
        setNewListItems(tempList);
      }
      console.log(newListItems);
    },
    [],
  );

  const listClickComplete = useCallback(
    async (i: string) => {
      const modifiedData = {...tempData};
      const index = modifiedData.tasks.findIndex((element: Task) => {
        return element.id === i;
      });
      modifiedData.tasks[index].status = 'complete';
      await new Promise(resolve => setTimeout(resolve, 400));
      setListItems(modifiedData);
    },
    [getListItems],
  );

  const checkListCleared = useCallback((arr: List | undefined) => {
    if (arr?.tasks.every(v => v.status === 'complete')) {
      setListCleared(true);
    }
  }, []);

  const listWinner = useCallback((arr: List | undefined) => {
    let winnerAnnouncement = '';

    if (arr) {
      const playerScores = arr?.tasks.reduce(
        (a, {whodunnit}) =>
          Object.assign(a, {[whodunnit]: (a[whodunnit] || 0) + 1}),
        {},
      );

      const max = Object.keys(playerScores).reduce(
        (a, v) => Math.max(a, playerScores[v]),
        -Infinity,
      );
      const winner = Object.keys(playerScores).filter(
        v => playerScores[v] === max,
      );

      if (winner.length > 1) {
        winnerAnnouncement = "It's a tie! Good job to all the competitors";
      } else if (winner.length === 1) {
        winnerAnnouncement = `${winner} wins! Way to go!`;
      }

      return winnerAnnouncement;
    }
  }, []);

  const state = useMemo(
    () => ({
      listItems,
      setListItems,
      getListItems,
      errorMessage,
      setErrorMessage,
      listCleared,
      setListCleared,
      checkListCleared,
      listClickComplete,
      listWinner,
      getNewListItems,
      newListItems,
      setNewListItems,
      addNewListItem,
      deleteListItem,
      modifyTasks,
    }),
    [
      listItems,
      setListItems,
      errorMessage,
      getListItems,
      listCleared,
      checkListCleared,
      listClickComplete,
      listWinner,
      getNewListItems,
      newListItems,
      setNewListItems,
      addNewListItem,
      deleteListItem,
      modifyTasks,
    ],
  );

  return (
    <MyListContext.Provider value={state}>{children}</MyListContext.Provider>
  );
}

export const useListContext = () => useContext(MyListContext);
