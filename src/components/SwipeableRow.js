import React, {useRef, useEffect} from 'react';
import {RectButton} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Animated, StyleSheet, I18nManager} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default function SwipeableRow({children, onDeletePress, disabled}) {
  const _swipeableRow = useRef();
  useEffect(() => {
    if (disabled) {
      close();
    }
  }, [disabled]);
  const renderRightAction = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <RectButton
        style={styles.rightAction}
        onPress={() => {
          onDeletePress();
          close();
        }}>
        <AnimatedIcon
          name="archive"
          size={30}
          color="#fff"
          style={[styles.actionIcon, {transform: [{scale}]}]}
        />
      </RectButton>
    );
  };

  const close = () => {
    _swipeableRow.current.close();
  };

  return (
    <Swipeable
      ref={_swipeableRow}
      friction={2}
      enabled={!disabled}
      rightThreshold={40}
      renderRightActions={renderRightAction}>
      {children}
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  actionIcon: {
    width: 30,
    marginHorizontal: 10,
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    backgroundColor: '#dd2c00',
    flex: 1,
    justifyContent: 'flex-end',
  },
});
