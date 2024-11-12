import { View, TouchableWithoutFeedback, TextInput } from 'react-native';
import React from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import IconFeather from 'react-native-vector-icons/Feather';

const Header = ({ opacity, color, navigation }) => {
    return (
        <View
            style={{
                padding: 12,
                position: 'absolute',
                flexDirection: 'row',
                justifyContent: 'space-between',
                top: 0,
                right: 0,
                left: 0,
                zIndex: 1,
                backgroundColor: `rgba(255, 255, 255, ${opacity})`,
            }}
        >
            <TouchableWithoutFeedback
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <View
                    style={{
                        backgroundColor: '#fff',
                        padding: 10,
                        borderRadius: 30,
                    }}
                >
                    <IconEntypo name="chevron-left" size={20} color="#000" />
                </View>
            </TouchableWithoutFeedback>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 30,
                    paddingRight: 12,
                    backgroundColor: color,
                    flex: 1,
                    marginLeft: 24,
                }}
            >
                <IconFeather name="search" size={20} color="#000" style={{ marginHorizontal: 10 }} />
                <TextInput
                    placeholder="Tìm kiếm ..."
                    placeholderTextColor="#ccc"
                    style={{
                        width: 130,
                        fontSize: 15,
                        color: '#000',
                        paddingVertical: 5,
                        flex: 1,
                    }}
                />
            </View>
        </View>
    );
};

export default Header;
