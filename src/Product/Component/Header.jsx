import { TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconFeather from 'react-native-vector-icons/Feather';

const Header = ({ opacity, backgroundBtn, colorBtn, navigation }) => {
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
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <View
                    style={{
                        backgroundColor: backgroundBtn,
                        padding: 10,
                        borderRadius: 30,
                    }}
                >
                    <IconEntypo name="chevron-left" size={20} color={colorBtn} />
                </View>
            </TouchableWithoutFeedback>
            <View style={{ flexDirection: 'row' }}>
                <TouchableWithoutFeedback>
                    <View
                        style={{
                            backgroundColor: backgroundBtn,
                            padding: 10,
                            borderRadius: 30,
                            marginRight: 12,
                        }}
                    >
                        <IconMaterialIcons name="favorite-border" size={20} color={colorBtn} />
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <View
                        style={{
                            backgroundColor: backgroundBtn,
                            padding: 10,
                            borderRadius: 30,
                        }}
                    >
                        <IconFeather name="shopping-cart" size={20} color={colorBtn} />
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};

export default Header;
