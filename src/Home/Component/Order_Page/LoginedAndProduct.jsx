import { View, Text, ScrollView, FlatList } from 'react-native';
import React, { Fragment } from 'react';

import numeral from 'numeral';
import FastImage from 'react-native-fast-image';
import { moderateScale } from 'react-native-size-matters';

const LoginedAndProduct = ({ navigation, products }) => {
    //Chuyển đổi tiền tệ
    const formatNumberWithCommas = (number) => {
        return numeral(number).format('0,0');
    };
    // Hàm render phần tử trong FlatList
    const renderItem = ({ item }) => (
        <View>
            <View
                style={{
                    backgroundColor: '#fff',
                    marginTop: 16,
                    padding: 12,
                    borderRadius: 12,
                }}
            >
                <Text
                    style={{
                        fontSize: 17,
                        fontWeight: '700',
                        color: '#000',
                    }}
                    numberOfLines={1}
                >
                    {item.name}
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 16,
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <Text numberOfLines={3} style={{ color: '#000' }}>
                            {item.name_package}
                        </Text>
                        {item.quantitys?.map((ele, index) => (
                            <Text key={index} style={{ color: '#000', marginTop: 4 }}>
                                {ele.amount} &times; {ele.age}
                            </Text>
                        ))}
                        <Text style={{ color: '#000', marginTop: 12 }}>
                            Đã thanh toán: đ {formatNumberWithCommas(item.quantitys?.reduce((total, item) => total + item.price * item.amount, 0))}
                        </Text>
                        <Text style={{ color: '#1cb57a', marginTop: 2 }}>Đơn hàng đã được xác nhận</Text>
                    </View>
                    <View>
                        <FastImage
                            style={{
                                height: 60,
                                width: 60,
                                borderRadius: 8,
                            }}
                            source={{
                                uri: item.image,
                                priority: FastImage.priority.high,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
    return (
        <Fragment>
            <View
                style={{
                    paddingHorizontal: 12,
                    paddingTop: 30,
                    paddingBottom: 12,
                    backgroundColor: '#fff',
                }}
            >
                <Text style={{ fontSize: 24, fontWeight: '700', color: '#000' }}>Đơn hàng</Text>
            </View>
            <FlatList
                style={{ paddingHorizontal: moderateScale(12), backgroundColor: '#fff', flex: 1 }}
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id} // Dùng id làm key duy nhất
                initialNumToRender={1}
                maxToRenderPerBatch={1}
                windowSize={3}
                removeClippedSubviews={true}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            />
        </Fragment>
    );
};

export default LoginedAndProduct;
