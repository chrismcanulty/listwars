import React, {useEffect, useRef, useState} from 'react';
import {Animated, FlatList, ScrollView, Vibration} from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import Shimmer from 'react-native-shimmer';
import styled from 'styled-components/native';

import AnimatedView from '../../component/AnimatedView';
import ListItem from '../../component/ListItem';
import {success, successPlayPause} from '../../component/Sound';
import {LIST_COLOR} from '../../constants';
import {useListContext} from '../../context/ListContext';

const Button = styled.TouchableOpacity`
  background: white;
  border-radius: 10px;
  color: white;
  display: inline-block;
  margin-top: 30px;
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

const ListName = styled.Text`
  color: ${LIST_COLOR};
  font-family: Montserrat-SemiBold;
  font-size: 25px;
  margin-bottom: 20px;
  text-align: center;
`;

const SuccessText = styled.Text`
  color: white;
  font-family: Montserrat-SemiBold;
  text-align: center;
  font-size: 24px;
`;

const SuccessView = styled.View`
  background-color: #000;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const TopView = styled.SafeAreaView`
  background-color: #000;
  flex: 1;
`;

export default function ListScreen({navigation}: any) {
  const [listSuccess, setListSuccess] = useState(false);

  const {
    newListItems,
    getListItems,
    checkListCleared,
    listWinner,
    setNewListItems,
    setFinalizedTasks,
  } = useListContext();

  const listAnimatedValue = useRef(new Animated.Value(0)).current;

  const moveList = () => {
    Animated.timing(listAnimatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setListSuccess(true);
      successPlayPause();
      animateTrophy();
      Vibration.vibrate();
    });
  };

  const yVal = listAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -600],
  });

  const animStyle = {
    transform: [
      {
        translateY: yVal,
      },
    ],
  };

  const trophyAnimatedValue = useRef(new Animated.Value(0.7)).current;

  const animateTrophy = () => {
    Animated.spring(trophyAnimatedValue, {
      toValue: 1.2,
      friction: 1,
      useNativeDriver: true,
    }).start();
  };

  const trophyAnimStyle = {
    transform: [
      {
        scale: trophyAnimatedValue,
      },
    ],
    marginBottom: 20,
  };

  success.setVolume(1);

  const winnerMessage = listWinner(newListItems);

  const onPress = () => {
    setNewListItems({
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
    });
    setFinalizedTasks([{id: '1', finalized: false}]);

    navigation.push('Create');
  };

  const isListCleared = () => {
    const cleared = checkListCleared(newListItems);

    if (cleared) {
      moveList();
      listWinner(newListItems);
    }
    // add listener to detect if user has navigated to IndexScreen
    const listener = navigation.addListener('focus', () => {
      getListItems();

      // cleanup function to remove listener
      return () => {
        listener.remove();
      };
    });
  };

  isListCleared();

  useEffect(() => {
    getListItems();
  }, []);

  return (
    <>
      {newListItems && !listSuccess && (
        <TopView>
          <Animated.View style={[animStyle]}>
            <ListName>{newListItems?.listName}</ListName>
            <ScrollView>
              <FlatList
                data={newListItems?.tasks}
                renderItem={({item}) => <ListItem item={item} />}
                keyExtractor={item => item.id}
              />
            </ScrollView>
          </Animated.View>
        </TopView>
      )}
      {listSuccess && (
        <>
          <SuccessView>
            <Animated.Image
              style={[trophyAnimStyle]}
              source={require('../../images/Trophy.png')}
            />
            <Shimmer>
              <SuccessText>{winnerMessage}</SuccessText>
            </Shimmer>
            <AnimatedView>
              <Button onPress={onPress}>
                <ButtonText>Continue</ButtonText>
              </Button>
            </AnimatedView>
          </SuccessView>
          <ConfettiCannon
            count={200}
            origin={{x: -10, y: -600}}
            fadeOut={true}
          />
        </>
      )}
    </>
  );
}
