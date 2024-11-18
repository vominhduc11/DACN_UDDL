import { View, Text, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconFoundation from 'react-native-vector-icons/Foundation';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const BackgroundMain = ({ navigation }) => {
    return (
        <ImageBackground
            blurRadius={5}
            style={{
                height: verticalScale(220),
            }}
            source={{
                uri: 'https://img.freepik.com/free-photo/pouch-map-toy-airplane-blue-background-with-space-writing-text_23-2147958180.jpg',
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: moderateScale(120),
                }}
            >
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Fun_experience', { category: 'Vui chơi & Trải nghiệm' })}>
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            flexBasis: '20%',
                        }}
                    >
                        <IconMaterialIcons name="local-play" size={moderateScale(26)} color="#663366" />
                        <Text style={{ maxWidth: 50, fontSize: moderateScale(10), color: '#000' }}>Vui chơi & Trải nghiệm</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Search', { category: 'Tour' })}>
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            flexBasis: '20%',
                        }}
                    >
                        <IconMaterialIcons name="tour" size={moderateScale(26)} color="#990000" />
                        <Text style={{ maxWidth: 50, fontSize: moderateScale(10), color: '#000' }}>Tour</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Search', { category: 'Du thuyền' })}>
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            flexBasis: '20%',
                        }}
                    >
                        <IconMaterialIcons name="directions-boat" size={moderateScale(26)} color="#33FFFF" />
                        <Text style={{ maxWidth: 50, fontSize: moderateScale(10), color: '#000' }}>Du thuyền</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Search', { category: 'Massage & Suối nước nóng' })}>
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            flexBasis: '20%',
                        }}
                    >
                        <IconFontAwesome5 name="hot-tub" size={moderateScale(26)} color="#FF9999" />
                        <Text style={{ maxWidth: 50, fontSize: moderateScale(10), color: '#000' }}>Massage & Suối nước nóng</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Search', { category: 'Phiêu lưu & khám phá thiên nhiên' })}>
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            flexBasis: '20%',
                        }}
                    >
                        <IconFoundation name="trees" size={moderateScale(26)} color="#009933" />
                        <Text style={{ maxWidth: 50, fontSize: moderateScale(10), color: '#000' }}>Phiêu lưu & khám phá thiên nhiên</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </ImageBackground>
    );
};

export default BackgroundMain;
