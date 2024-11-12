import { View, TextInput } from 'react-native';
import React from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';

const Header = () => {
    return (
        <View
            style={{
                position: 'absolute',
                zIndex: 1,
                left: 0,
                right: 0,
                top: 0,
                padding: 12,
                backgroundColor: '#fff',
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <IconEntypo name="chevron-left" size={28} color="#000" onPress={() => navigation.goBack()} />
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 30,
                    // paddingHorizontal: 0,
                    backgroundColor: '#fff',
                    // marginTop: 24,
                    borderWidth: 1,
                    flex: 1,
                    marginLeft: 12,
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
        </View>
    );
};

export default Header;
