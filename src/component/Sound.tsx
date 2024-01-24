import Sound from 'react-native-sound';

Sound.setCategory('Playback');

export const pencil = new Sound('pencil.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // when loaded successfully
  console.log(
    'duration in seconds: ' +
      pencil.getDuration() +
      'number of channels: ' +
      pencil.getNumberOfChannels(),
  );
});

export const pencilPlayPause = () => {
  pencil.play(success => {
    if (success) {
      console.log('successfully finished playing pencil');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};

export const success = new Sound('success.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
  // when loaded successfully
  console.log(
    'duration in seconds: ' +
      success.getDuration() +
      'number of channels: ' +
      success.getNumberOfChannels(),
  );
});

export const successPlayPause = () => {
  success.play(success => {
    if (success) {
      console.log('successfully finished playing success');
    } else {
      console.log('playback failed due to audio decoding errors');
    }
  });
};
