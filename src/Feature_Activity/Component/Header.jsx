import { View, Text } from 'react-native';
import React from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';

const Header = ({ opacity, color1, color2, navigation }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                backgroundColor: 'red',
                backgroundColor: `rgba(255, 255, 255, ${opacity})`,
                paddingTop: 24,
                paddingBottom: 12,
                paddingHorizontal: 12,
                top: 0,
                right: 0,
                left: 0,
                zIndex: 100,
            }}
        >
            <IconEntypo onPress={() => navigation.goBack()} name="chevron-left" size={30} color={color1} />
            <Text style={{ color: color2, fontWeight: '600' }}>Hoạt động nổi bật gần đây</Text>
        </View>
    );
};

export default Header;
