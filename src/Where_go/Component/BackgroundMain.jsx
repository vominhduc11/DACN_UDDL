import { View, Text, ImageBackground, TextInput } from 'react-native';
import React from 'react';

import IconFeather from 'react-native-vector-icons/Feather';

const BackgroundMain = () => {
    return (
        <ImageBackground
            style={{
                paddingHorizontal: 12,
                paddingTop: 100,
                paddingBottom: 30,
                alignItems: 'center',
            }}
            source={{
                uri: 'https://dulichbienhaitien.com.vn/gomsu/sanpham/anh/images/chuan-bi-do-di-bien-cho-nu-7-cach-mix-do-di-bien-cuc-xinh-3.jpg',
            }}
        >
            <Text
                style={{
                    color: '#fff',
                    fontSize: 24,
                    fontWeight: '700',
                }}
            >
                Bạn muốn đi đâu chơi?
            </Text>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 30,
                    paddingHorizontal: 0,
                    backgroundColor: '#fff',
                    marginTop: 24,
                    width: '100%',
                }}
            >
                <IconFeather name="search" size={20} style={{ marginHorizontal: 10 }} />
                <TextInput
                    style={{
                        width: 130,
                        fontSize: 15,
                        color: '#000',
                        paddingVertical: 8,
                    }}
                    placeholder="Tìm địa điểm"
                />
            </View>
        </ImageBackground>
    );
};

export default BackgroundMain;
