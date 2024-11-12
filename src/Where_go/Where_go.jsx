import { View, Text, ScrollView, ImageBackground, TextInput } from 'react-native';
import React, { useState } from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import Header from './Component/Header';
import BackgroundMain from './Component/BackgroundMain';
import Container from './Component/Container';

const Where_go = ({ navigation }) => {
    const [show, setShow] = useState(false);
    // Thực hiện sự kiện khi scroll
    function handleScrollScreen(event) {
        const contentOffset = event.nativeEvent.contentOffset;

        if (contentOffset.y >= 150) {
            setShow(true);
        } else {
            setShow(false);
        }
    }
    return (
        <>
            {show && <Header />}
            <ScrollView onScroll={handleScrollScreen}>
                <View>
                    <View
                        style={{
                            position: 'absolute',
                            zIndex: 1,
                            left: 0,
                            right: 0,
                            top: 0,
                            padding: 12,
                        }}
                    >
                        <IconEntypo name="chevron-left" size={28} color="#fff" onPress={() => navigation.goBack()} />
                    </View>
                    <BackgroundMain />
                    <Container />
                </View>
            </ScrollView>
        </>
    );
};

export default Where_go;
