import { Image, View } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

const ImageMain = ({ bottom, opacityImage, image }) => {
    return (
        <View>
            <FastImage
                style={{
                    height: 290,
                    zIndex: 1,
                    position: 'relative',
                    bottom: bottom,
                    opacity: opacityImage,
                }}
                source={{ uri: image, priority: FastImage.priority.high }}
                resizeMode={FastImage.resizeMode.cover}
            />
        </View>
    );
};

export default ImageMain;
