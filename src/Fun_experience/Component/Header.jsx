import { View } from 'react-native';
import React, { useState } from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';

const Header = ({ navigation }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                backgroundColor: 'rgba(255, 255, 255, 0)', // Transparent background
                paddingTop: verticalScale(24), // Responsive padding top
                paddingBottom: verticalScale(12), // Responsive padding bottom
                paddingHorizontal: scale(12), // Responsive padding horizontal
                top: 0,
                right: 0,
                left: 0,
                zIndex: 100,
            }}
        >
            <IconEntypo
                onPress={() => navigation.navigate('Home')}
                name="chevron-left"
                size={moderateScale(30)} // Responsive icon size
                color="#fff"
            />
        </View>
    );
};

export default Header;
