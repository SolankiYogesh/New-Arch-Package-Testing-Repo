import React, {useCallback, useEffect, useRef, useState} from 'react';

import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  type ImageStyle,
  StatusBar,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import TurboImage from 'react-native-turbo-image';
import {Slider} from 'react-native-awesome-slider';

import Sound from 'react-native-sound';
import {Colors, Images, Utils} from '@/Common';
import Tracks from './Tracks';
import {useSharedValue, withTiming} from 'react-native-reanimated';

Sound.setCategory('Playback');
export default () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const sound = useRef<Sound>();
  const timerRef = useRef<NodeJS.Timeout>();
  const [isLoading, setIsLoading] = useState(true);
  const currentTrackIndex = useRef(0);
  const [currentTrack, setCurrentTrack] = useState(Tracks[0]);
  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(100);
  const [audioDuration, setAudioDuration] = useState(0);

  const getImageStyle = (size: number) => {
    return {
      width: size,
      height: size,
      tintColor: currentTrack.color,
    } as ImageStyle;
  };

  const stopListening = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const startListening = useCallback(() => {
    stopListening();
    timerRef.current = setInterval(() => {
      if (sound.current) {
        sound.current.getCurrentTime((sec, playing) => {
          if (playing) {
            setCurrentTime(sec);
            progress.value = withTiming(
              Utils.getPercentage(sec, audioDuration),
            );
          }
        });
      }
    }, 1000);
  }, [audioDuration, progress]);

  const onPressPlayPause = useCallback(() => {
    if (sound.current) {
      if (isPlaying) {
        sound.current.pause();
        setIsPlaying(false);
        stopListening();
      } else {
        sound.current.play();
        setIsPlaying(true);
        startListening();
      }
    }
  }, [isPlaying, startListening]);

  const playCurrentTrack = useCallback(() => {
    setIsLoading(true);
    setIsPlaying(false);
    sound.current = new Sound(
      Tracks[currentTrackIndex.current].url,
      Sound.MAIN_BUNDLE,
      (error, props) => {
        console.log('props', props);
        console.log('error', error);
        setIsLoading(false);
        if (error) {
          Alert.alert('Error', 'failed to load the sound' + error);
          return;
        }
        if (props.duration) {
          setAudioDuration(props.duration);
          onPressPlayPause();
        }
      },
    );
  }, [onPressPlayPause]);

  const onPressLeft = () => {
    updateTrack(
      (currentTrackIndex.current - 1 + Tracks.length) % Tracks.length,
    );
  };

  const onPressRight = () => {
    updateTrack((currentTrackIndex.current + 1) % Tracks.length);
  };

  const updateTrack = useCallback(
    (index: number) => {
      progress.value = withTiming(0);
      setCurrentTime(0);
      setAudioDuration(0);
      sound.current?.release();
      stopListening();
      currentTrackIndex.current = index;
      setCurrentTrack(Tracks[index]);
      playCurrentTrack();
    },
    [playCurrentTrack, progress],
  );

  useEffect(() => {
    playCurrentTrack();

    return () => {
      sound.current?.release();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />

      <View style={[styles.imageContainer]}>
        <TurboImage
          resizeMode="cover"
          source={{
            uri: currentTrack.image,
          }}
          indicator={{
            color: currentTrack.color,
            style: 'large',
          }}
          style={styles.image_view}
        />
      </View>
      <View style={styles.name_of_song_View}>
        <Text style={styles.name_of_song_Text1}>{currentTrack.title}</Text>
      </View>
      <View style={styles.slider_view}>
        <Slider
          disable={isLoading}
          progress={progress}
          minimumValue={min}
          theme={{
            minimumTrackTintColor: currentTrack.color,
          }}
          onSlidingComplete={value => {
            setCurrentTime(Utils.getSlideTime(value, audioDuration));
            stopListening();
            sound.current?.setCurrentTime(
              Utils.getSlideTime(value, audioDuration),
            );
            startListening();
          }}
          maximumValue={max}
        />
        <View style={styles.progressiveTextStyle}>
          <Text style={styles.slider_time}>
            {Utils.secondsToMMSS(currentTime)}
          </Text>
          <Text style={styles.slider_time}>
            {Utils.secondsToMMSS(audioDuration)}
          </Text>
        </View>
      </View>

      <View style={styles.functions_view}>
        <TouchableOpacity onPress={onPressLeft}>
          <Image source={Images.previous} style={getImageStyle(24)} />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isLoading}
          style={[
            styles.playButtonStyle,
            {
              borderColor: currentTrack.color,
            },
          ]}
          onPress={onPressPlayPause}>
          {isLoading ? (
            <ActivityIndicator color={currentTrack.color} />
          ) : (
            <Image
              source={isPlaying ? Images.pause : Images.play}
              style={getImageStyle(25)}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressRight}>
          <Image source={Images.next} style={getImageStyle(24)} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
  },
  imageContainer: {
    width: '90%',
    height: 300,
    alignSelf: 'center',
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  image_view: {
    width: '100%',
    height: '100%',
  },
  name_of_song_View: {
    alignSelf: 'center',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    rowGap: 20,
  },
  name_of_song_Text1: {
    fontSize: 19,
    fontWeight: '500',
    textAlign: 'center',
  },
  slider_view: {
    width: '90%',
    alignSelf: 'center',
  },
  slider_style: {
    flex: 1,
  },
  slider_time: {
    fontSize: 15,
    color: Colors.greyShade80,
  },
  functions_view: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  playButtonStyle: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 300,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    borderWidth: 1,
  },
  progressiveTextStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
});
