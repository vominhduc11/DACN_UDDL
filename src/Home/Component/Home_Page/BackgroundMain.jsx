import { View, Text, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import IconFoundation from 'react-native-vector-icons/Foundation';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BackgroundMain = ({ navigation }) => {
    return (
        <ImageBackground
            blurRadius={5}
            style={{
                height: 200,
            }}
            source={{
                uri: 'https://img.freepik.com/free-photo/pouch-map-toy-airplane-blue-background-with-space-writing-text_23-2147958180.jpg',
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    // justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    marginTop: 100,
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
                        <IconMaterialIcons name="local-play" size={24} color="#663366" />
                        <Text style={{ maxWidth: 50, fontSize: 10, color: '#000' }}>Vui chơi & Trải nghiệm</Text>
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
                        <IconMaterialIcons name="tour" size={24} color="#990000" />
                        <Text style={{ maxWidth: 50, fontSize: 10, color: '#000' }}>Tour</Text>
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
                        <IconMaterialIcons name="directions-boat" size={24} color="#33FFFF" />
                        <Text style={{ maxWidth: 50, fontSize: 10, color: '#000' }}>Du thuyền</Text>
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
                        <IconFontAwesome5 name="hot-tub" size={24} color="#FF9999" />
                        <Text style={{ maxWidth: 50, fontSize: 10, color: '#000' }}>Massage & Suối nước nóng</Text>
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
                        <IconFoundation name="trees" size={24} color="#009933" />
                        <Text style={{ maxWidth: 50, fontSize: 10, color: '#000' }}>Phiêu lưu & khám phá thiên nhiên</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </ImageBackground>
    );
};

export default BackgroundMain;
