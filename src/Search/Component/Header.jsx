import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';

const Header = ({ navigation, openModal, nameCity }, ref) => {
    const [valueInput, setValueInput] = useState(undefined);

    useImperativeHandle(ref, () => ({
        setValueInput(value) {
            setValueInput(value);
        },
    }));

    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingVertical: 12,
                elevation: 1,
                borderBottomWidth: 1,
                borderBottomColor: '#DDDDDD',
                // display: 'none',
            }}
        >
            <IconAntDesign name="left" color="#000" size={26} onPress={() => navigation.goBack()} />
            <View style={{ flex: 1, paddingHorizontal: 12 }}>
                <TouchableWithoutFeedback onPress={openModal}>
                    <View
                        style={{
                            paddingHorizontal: 15,
                            borderRadius: 25,
                            backgroundColor: '#f5f5f5',
                            paddingVertical: 10,
                        }}
                    >
                        <Text style={{ color: valueInput ? '#000' : '#868888' }} numberOfLines={1}>
                            {valueInput ? valueInput : 'Tìm kiếm thành phố hoặc điểm đến'}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <IconFeather name="shopping-cart" size={26} color="#000" onPress={() => navigation.navigate('Cart')} />
        </View>
    );
};

export default forwardRef(Header);
