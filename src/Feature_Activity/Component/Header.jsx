import { View, Text } from 'react-native';
import React from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Header = ({ opacity, color1, color2, navigation }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                backgroundColor: `rgba(255, 255, 255, ${opacity})`,
                paddingTop: verticalScale(24),
                paddingBottom: verticalScale(12),
                paddingHorizontal: scale(12),
                top: 0,
                right: 0,
                left: 0,
                zIndex: 100,
            }}
        >
            <IconEntypo onPress={() => navigation.goBack()} name="chevron-left" size={moderateScale(30)} color={color1} />
            <Text
                style={{
                    color: color2,
                    fontWeight: '600',
                    fontSize: moderateScale(16),
                }}
            >
                Hoạt động nổi bật gần đây
            </Text>
        </View>
    );
};

export default Header;
