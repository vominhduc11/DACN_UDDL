import { View, Text, ImageBackground, TextInput, FlatList } from 'react-native';
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
                uri: 'https://moc247.com/wp-content/uploads/2023/12/hinh-anh-bien-dep_1.jpg',
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
                <IconFeather name="search" color="#c0c0c0" size={20} style={{ marginHorizontal: 10 }} />
                <TextInput
                    style={{
                        width: 130,
                        fontSize: 15,
                        color: '#000',
                        paddingVertical: 8,
                    }}
                    placeholder="Tìm địa điểm"
                    placeholderTextColor="#c0c0c0"
                />
            </View>
        </ImageBackground>
    );
};

export default BackgroundMain;
