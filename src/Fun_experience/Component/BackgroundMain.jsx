import { View, Text, ImageBackground } from 'react-native';
import React from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const BackgroundMain = () => {
    return (
        <View style={{ position: 'relative' }}>
            <ImageBackground
                style={{
                    paddingTop: verticalScale(100), // Responsive padding top
                    paddingBottom: verticalScale(80), // Responsive padding bottom
                    paddingHorizontal: scale(12), // Responsive padding horizontal
                    position: 'relative',
                    bottom: 0,
                }}
                source={{
                    uri: 'https://dep.com.vn/wp-content/uploads/2018/08/khinh-khi-cau_1.jpg',
                }}
            >
                <Text
                    style={{
                        color: '#fff',
                        fontSize: moderateScale(28), // Responsive font size
                        fontWeight: '600',
                    }}
                >
                    Vui chơi & Trải nghiệm
                </Text>
                <Text
                    style={{
                        color: '#fff',
                        fontSize: moderateScale(14), // Responsive font size
                        marginTop: verticalScale(8), // Responsive margin top
                    }}
                >
                    Tour, công viên, spa và nhiều hoạt động khác
                </Text>
            </ImageBackground>
        </View>
    );
};

export default BackgroundMain;
