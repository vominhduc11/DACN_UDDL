import { View, Text } from 'react-native';
import React from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableWithoutFeedback } from 'react-native';

const Pay_status = ({ navigation }) => {
    return (
        <View
            style={{
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}>
            <View
                style={{
                    paddingHorizontal: 12,
                    paddingTop: 30,
                }}>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <IconAntDesign
                        name="checkcircle"
                        color="#05b46f"
                        size={45}
                    />
                    <Text
                        style={{
                            fontSize: 23,
                            color: '#000',
                            fontWeight: '600',
                            marginTop: 12,
                        }}>
                        Thanh toán thành công
                    </Text>
                </View>
                <View style={{ marginTop: 40 }}>
                    <TouchableWithoutFeedback
                        onPress={() => navigation.navigate('Home')}>
                        <Text
                            style={{
                                borderWidth: 1,
                                borderColor: '#ff5c19',
                                color: '#ff5c19',
                                fontSize: 16,
                                fontWeight: '600',
                                textAlign: 'center',
                                paddingVertical: 12,
                                borderRadius: 12,
                            }}>
                            Đến trang chủ
                        </Text>
                    </TouchableWithoutFeedback>
                    <View style={{ height: 12 }} />
                    <TouchableWithoutFeedback>
                        <Text
                            style={{
                                backgroundColor: '#ff5c19',
                                color: '#fff',
                                fontSize: 16,
                                fontWeight: '600',
                                textAlign: 'center',
                                paddingVertical: 12,
                                borderRadius: 12,
                            }}>
                            Xem đơn hàng
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
                <Text style={{ marginTop: 24 }}>
                    Mã đặt hàng:
                    <Text style={{ color: '#000' }}>2651521150</Text>
                </Text>
                <View
                    style={{
                        backgroundColor: '#f5f5f5',
                        padding: 12,
                        borderRadius: 12,
                        marginTop: 24,
                    }}>
                    <Text>Cảm ơn bạn đã đặt dịch vụ với Klook!</Text>
                    <Text>
                        Thông tin đơn hàng và voucher sẽ được gửi đến{' '}
                        <Text style={{ color: '#000' }}>
                            vominhduc760@gmail.com
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default Pay_status;
