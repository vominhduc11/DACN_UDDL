import { Image, View } from 'react-native';
import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ImageMain = ({ bottom, opacityImage, image }) => {
    return (
        <View>
            {typeof image === 'string' || (
                <SkeletonPlaceholder>
                    <View style={{ height: 290 }} />
                </SkeletonPlaceholder>
            )}
            {image && (
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
            )}
        </View>
    );
};

export default ImageMain;
