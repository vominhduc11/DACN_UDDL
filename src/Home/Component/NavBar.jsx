import { View, Text, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialAntDesign from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { scale, moderateScale } from 'react-native-size-matters';

const NavBar = ({ activeMenu, setActiveMenu, navigation }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: scale(12),
                borderTopWidth: 1,
                borderTopColor: '#ccc',
                elevation: 0.5,
            }}
        >
            {/* Home */}
            <TouchableWithoutFeedback
                onPress={() => {
                    setActiveMenu(1);
                    navigation.navigate('Home_page');
                }}
            >
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    {activeMenu !== 1 && <IconIonicons name="home-outline" size={moderateScale(20)} color="#517fa4" />}
                    {activeMenu === 1 && <IconIonicons name="home" size={moderateScale(20)} color="#FF9900" />}
                    <Text
                        style={{
                            fontSize: moderateScale(10),
                            color: activeMenu === 1 ? '#FF9900' : '#517fa4',
                        }}
                    >
                        Trang chủ
                    </Text>
                </View>
            </TouchableWithoutFeedback>

            {/* Endow */}
            <TouchableWithoutFeedback
                onPress={() => {
                    setActiveMenu(2);
                    navigation.navigate('Endow_page');
                }}
            >
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    {activeMenu !== 2 && <IconMaterialAntDesign name="tagso" size={moderateScale(20)} color="#517fa4" />}
                    {activeMenu === 2 && <IconMaterialAntDesign name="tags" size={moderateScale(20)} color="#FF9900" />}
                    <Text
                        style={{
                            fontSize: moderateScale(10),
                            color: activeMenu === 2 ? '#FF9900' : '#517fa4',
                        }}
                    >
                        Ưu đãi
                    </Text>
                </View>
            </TouchableWithoutFeedback>

            {/* Likes */}
            <TouchableWithoutFeedback
                onPress={() => {
                    setActiveMenu(3);
                    navigation.navigate('Like_page');
                }}
            >
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    {activeMenu !== 3 && <IconMaterialIcons name="favorite-outline" size={moderateScale(20)} color="#517fa4" />}
                    {activeMenu === 3 && <IconMaterialIcons name="favorite" size={moderateScale(20)} color="#FF9900" />}
                    <Text
                        style={{
                            fontSize: moderateScale(10),
                            color: activeMenu === 3 ? '#FF9900' : '#517fa4',
                        }}
                    >
                        Yêu thích
                    </Text>
                </View>
            </TouchableWithoutFeedback>

            {/* Orders */}
            <TouchableWithoutFeedback
                onPress={() => {
                    setActiveMenu(4);
                    navigation.navigate('Order_page');
                }}
            >
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    {activeMenu !== 4 && <IconMaterialCommunityIcons name="wallet-travel" size={moderateScale(20)} color="#517fa4" />}
                    {activeMenu === 4 && <IconMaterialCommunityIcons name="wallet" size={moderateScale(20)} color="#FF9900" />}
                    <Text
                        style={{
                            fontSize: moderateScale(10),
                            color: activeMenu === 4 ? '#FF9900' : '#517fa4',
                        }}
                    >
                        Đơn hàng
                    </Text>
                </View>
            </TouchableWithoutFeedback>

            {/* User Account */}
            <TouchableWithoutFeedback
                onPress={() => {
                    setActiveMenu(5);
                    navigation.navigate('User_page');
                }}
            >
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    {activeMenu !== 5 && <IconMaterialCommunityIcons name="account-box-outline" size={moderateScale(20)} color="#517fa4" />}
                    {activeMenu === 5 && <IconMaterialCommunityIcons name="account-box" size={moderateScale(20)} color="#FF9900" />}
                    <Text
                        style={{
                            fontSize: moderateScale(10),
                            color: activeMenu === 5 ? '#FF9900' : '#517fa4',
                        }}
                    >
                        Tài khoản
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

export default NavBar;
