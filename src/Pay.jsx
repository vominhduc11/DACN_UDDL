import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native';
import React from 'react';

import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';

const Pay = () => {
    return (
        <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ backgroundColor: '#fff', padding: 12 }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: '#000',
                        }}>
                        Vé Xe Buýt 2 Tầng Ngắm Cảnh Ở Thành Phố Hồ Chí Minh từ
                        City Sightseeing
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: '#000',
                            marginTop: 12,
                        }}>
                        đ 145,000
                    </Text>
                    <Text style={{ color: '#0000FF' }}>
                        Hoàn miễn phí trong 24h
                    </Text>
                </View>
                <View
                    style={{
                        backgroundColor: '#fff',
                        padding: 12,
                        marginTop: 12,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                backgroundColor: '#FF5B00',
                                width: 7,
                                borderRadius: 12,
                                height: 24,
                                marginRight: 10,
                            }}
                        />
                        <Text
                            style={{
                                color: '#000',
                                fontSize: 18,
                                fontWeight: '700',
                            }}>
                            Thông tin liên lạc:
                        </Text>
                    </View>
                    <Text style={{ color: '#000', paddingHorizontal: 14 }}>
                        Chúng tôi sẽ thông báo mọi thay đổi về đơn hàng cho bạn
                    </Text>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: '#f1f1f1',
                            padding: 14,
                            borderRadius: 12,
                            marginTop: 12,
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ flex: 1 }}>Họ</Text>
                            <Text
                                style={{
                                    flex: 1,
                                    fontWeight: '500',
                                    color: '#000',
                                }}>
                                Võ
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 12 }}>
                            <Text style={{ flex: 1 }}>Tên</Text>
                            <Text
                                style={{
                                    flex: 1,
                                    fontWeight: '500',
                                    color: '#000',
                                }}>
                                Đức
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 12 }}>
                            <Text style={{ flex: 1 }}>Số điện thoại</Text>
                            <Text
                                style={{
                                    flex: 1,
                                    fontWeight: '500',
                                    color: '#000',
                                }}>
                                +84 0896664086
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 12 }}>
                            <Text style={{ flex: 1 }}>
                                Email(để cập nhật thông tin đơn hàng của bạn)
                            </Text>
                            <Text
                                style={{
                                    flex: 1,
                                    fontWeight: '500',
                                    color: '#000',
                                }}>
                                vominhduc760@gmail.com
                            </Text>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        backgroundColor: '#fff',
                        padding: 12,
                        marginTop: 12,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                backgroundColor: '#FF5B00',
                                width: 7,
                                borderRadius: 12,
                                height: 24,
                                marginRight: 10,
                            }}
                        />
                        <Text
                            style={{
                                color: '#000',
                                fontSize: 18,
                                fontWeight: '700',
                            }}>
                            Mã khuyến mại:
                        </Text>
                    </View>
                    <Text style={{ color: '#000', paddingHorizontal: 14 }}>
                        Các mã ưu đãi sẽ được áp dụng sau khi chọn
                    </Text>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: '#f1f1f1',
                            padding: 14,
                            borderRadius: 12,
                            marginTop: 12,
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <Text style={{ color: '#000' }}>
                                Mã ưu đãi nền tảng
                            </Text>
                            <Text>Không khả dụng</Text>
                            <IconEntypo name="chevron-right" size={18} />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: 12,
                            }}>
                            <Text style={{ color: '#000', flex: 1 }}>
                                Mã ưu đãi phương thức thanh toán
                            </Text>
                            <Text>Không khả dụng</Text>
                            <IconEntypo name="chevron-right" size={18} />
                        </View>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 12, paddingVertical: 20 }}>
                    <Text>
                        Tôi đã hiểu và đồng ý với Điều khoản Sử dụng Chung và
                        Chính sách Quyền riêng tư của Klook
                    </Text>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: '#c0e0e0',
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#eef8f9',
                            padding: 12,
                            borderRadius: 12,
                            marginTop: 12,
                        }}>
                        <IconAntDesign
                            name="filetext1"
                            color="#1f908f"
                            size={18}
                        />
                        <Text style={{ color: '#1f908f', marginLeft: 8 }}>
                            Hoàn hủy miễn phí trong vòng 48h
                        </Text>
                    </View>
                    <Text
                        style={{
                            backgroundColor: '#fcf1db',
                            borderWidth: 1,
                            borderColor: '#f5e0b7',
                            padding: 12,
                            borderRadius: 12,
                            marginTop: 12,
                        }}>
                        Xin điền thông tin cẩn thận. Khi đã gửi sẽ không thể
                        thay đổi.
                    </Text>
                </View>
            </ScrollView>
            <View
                style={{
                    paddingTop: 6,
                    paddingHorizontal: 12,
                    elevation: 1,
                }}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: '600',
                        color: '#000',
                        marginBottom: 12,
                    }}>
                    đ 145,000
                </Text>
                <TouchableWithoutFeedback>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 16,
                            fontWeight: '500',
                            color: '#fff',
                            backgroundColor: '#ff5c19',
                            paddingVertical: 12,
                            borderRadius: 12,
                        }}>
                        Thanh toán
                    </Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};

export default Pay;
