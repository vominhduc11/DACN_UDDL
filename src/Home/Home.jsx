import { View } from 'react-native';
import React, { useState } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home_page from './Route/Home_page';
import Endow_page from './Route/Endow_page';
import Like_page from './Route/Like_page';
import Order_page from './Route/Order_page';
import User_page from './Route/User_page';
import NavBar from './Component/NavBar';

const Stack = createNativeStackNavigator();
const Home = ({ navigation }) => {
    const [activeMenu, setActiveMenu] = useState(1);

    const setActive = {
        setOrder(param) {
            setActiveMenu(param);
        },
        setHome(param) {
            setActiveMenu(param);
        },
    };

    return (
        <View style={{ position: 'relative', zIndex: 1, flex: 1 }}>
            <Stack.Navigator
                screenOptions={{
                    animation: 'fade',
                    gestureEnabled: true,
                    animationDuration: 3000,
                }}
            >
                {/* <Stack.Screen name="Like_page" component={Like_page} options={{ headerShown: false }} /> */}
                <Stack.Screen name="Home_page" component={Home_page} options={{ headerShown: false }} />
                <Stack.Screen name="Endow_page" component={Endow_page} options={{ headerShown: false }} />
                <Stack.Screen name="Like_page" component={Like_page} options={{ headerShown: false }} />
                <Stack.Screen name="Order_page" component={Order_page} options={{ headerShown: false }} initialParams={{ setActive: setActive }} />
                <Stack.Screen name="User_page" component={User_page} options={{ headerShown: false }} initialParams={{ setActive: setActive }} />
            </Stack.Navigator>
            <NavBar activeMenu={activeMenu} setActiveMenu={setActiveMenu} navigation={navigation} />
        </View>
    );
};

export default Home;
