import { View, Text, ScrollView, TouchableWithoutFeedback, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';

import { moderateScale } from 'react-native-size-matters';
import numeral from 'numeral';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEntypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from './.env/Config';
import axios from 'axios';

const Pay = ({ navigation, route }) => {
    const [user, setUser] = useState({});

    const { products } = route.params;
    //Chuyển đổi tiền tệ
    const formatNumberWithCommas = (number) => {
        return numeral(number).format('0,0');
    };
    // Hàm sử lí tách họ và tên
    function splitFullName(fullName) {
        if (!fullName) {
            return { ho: '', ten: '' };
        }
        // Loại bỏ khoảng trắng thừa ở đầu và cuối chuỗi
        fullName = fullName.trim();

        // Tách chuỗi thành mảng bằng cách sử dụng dấu cách làm dấu phân cách
        const parts = fullName.split(/\s+/);
        // Xác định họ (phần đầu tiên) và tên (phần cuối cùng)
        const ho = parts.slice(0, 1).join(' '); // Lấy tất cả phần trước tên
        const ten = parts[parts.length - 1]; // Lấy phần cuối cùng là tên
        return { ho, ten };
    }
    // Xử lí khi bấm nút thanh toán
    const handlePay = async () => {
        // Add đơn hàng vào bảng
        const idUser = JSON.parse(await AsyncStorage.getItem('idUser'));
        await axios.post(`${Config.API_URL}/api/addOrder?idUser=${idUser}`, products);
        // Gửi mail
        // let string = ``;
        // Duyệt qua từng sản phẩm
        // products.forEach((product) => {
        //     let stringQuantity = ``;

        //     // Duyệt qua từng phần tử quantity trong sản phẩm
        //     product.quantity.forEach((ele) => {
        //         stringQuantity += `${ele.amount} &times; ${ele.age}<br/>`; // Thêm chi tiết số lượng vào chuỗi
        //     });

        //     // Xây dựng chuỗi chi tiết đơn hàng cho từng sản phẩm
        //     string += `
        //     <b>${product.name}</b>  <!-- In đậm tên sản phẩm -->
        //     <br/>
        //     <br/>
        //     ${product.name_package}
        //     <br/>
        //     ${stringQuantity}
        //     <br/>
        //     <br/>
        //     <b>${formatNumberWithCommas(
        //         product.quantity.reduce((total, item) => total + item.price * item.amount, 0)
        //     )}</b>  <!-- In đậm tổng giá sản phẩm -->
        //     `;
        // });

        // Gửi email với nội dung xác nhận đơn hàng
        // await axios.post(`${Config.API_URL}/api/email/send`, {
        //     getTo: user.email,
        //     getSubject: 'Xác nhận đơn hàng',
        //     getBody: `
        //     Dear <b>${user.name}</b>,
        //     <br/>
        //     <br/>
        //     Thank you for booking your recent tour with Travello. We are thrilled to have you on board!
        //     <br/>
        //     <br/>
        //     Your package details:
        //     <br/>
        //     <br/>
        //     ${string}
        //     <br/>
        //     <br/>
        //     <br/>
        //     Tổng cộng: <b>${formatNumberWithCommas(
        //         products.reduce((total, item) => {
        //             return total + item.quantity.reduce((total, item) => total + item.price * item.amount, 0);
        //         }, 0)
        //     )}đ</b>  <!-- In đậm tổng tiền -->
        //     <br/>
        //     <br/>
        //     If you have any questions or need assistance, feel free to contact us at support@example.com or call us at +1-234-567-890.
        //     <br/>
        //     <br/>
        //     Looking forward to making your trip memorable!
        //     <br/>
        //     <br/>
        //     Best regards,
        //     <br/>
        //     Travello
        //     <br/>
        //     Customer Support Team
        //     `,
        //     // Nếu API hỗ trợ, bạn có thể cần thêm một phần như content-type
        //     headers: {
        //         'Content-Type': 'text/html', // Chỉ định kiểu nội dung là HTML
        //     },
        // });
        // navigation.navigate('Pay_status');
    };
    // Hàm render phần tử trong FlatList
    const renderItem = ({ item }) => (
        <View style={{ backgroundColor: '#fff', padding: 12, marginBottom: 12 }}>
            <Text
                numberOfLines={3}
                style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#000',
                }}
            >
                {item.name}
            </Text>
            <View style={{ marginTop: 12 }}>
                <Text numberOfLines={2} style={{ color: '#000' }}>
                    {item.name_package}
                </Text>
                {item.quantity.map((ele) => (
                    <Text style={{ color: '#000', marginTop: 4 }}>
                        {ele.amount} &times; {ele.age}
                    </Text>
                ))}
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#000',
                        marginTop: 12,
                    }}
                >
                    đ {formatNumberWithCommas(item.quantity.reduce((total, item) => total + item.price * item.amount, 0))}
                </Text>
            </View>
        </View>
    );
    // Lấy người dùng
    useEffect(() => {
        async function fetchData() {
            try {
                const idUser = JSON.parse(await AsyncStorage.getItem('idUser'));
                const res = await axios.get(`${Config.API_URL}/api/getUser/${idUser}`);
                setUser(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    return (
        <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    style={{ paddingHorizontal: moderateScale(12), paddingTop: 12, flex: 1 }}
                    data={products}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index} // Dùng id làm key duy nhất
                    initialNumToRender={1}
                    maxToRenderPerBatch={1}
                    windowSize={3}
                    removeClippedSubviews={true}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                />
                <View
                    style={{
                        backgroundColor: '#fff',
                        padding: 12,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
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
                            }}
                        >
                            Thông tin liên lạc:
                        </Text>
                    </View>
                    <Text style={{ color: '#000', paddingHorizontal: 14 }}>Chúng tôi sẽ thông báo mọi thay đổi về đơn hàng cho bạn</Text>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: '#f1f1f1',
                            padding: 14,
                            borderRadius: 12,
                            marginTop: 12,
                        }}
                    >
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ flex: 1, color: '#000' }}>Họ</Text>
                            <Text
                                style={{
                                    flex: 1,
                                    fontWeight: '500',
                                    color: '#000',
                                }}
                            >
                                {splitFullName(user.name).ho}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 12 }}>
                            <Text style={{ flex: 1, color: '#000' }}>Tên</Text>
                            <Text
                                style={{
                                    flex: 1,
                                    fontWeight: '500',
                                    color: '#000',
                                }}
                            >
                                Đức
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 12 }}>
                            <Text style={{ flex: 1, color: '#000' }}>Email(để cập nhật thông tin đơn hàng của bạn)</Text>
                            <Text
                                style={{
                                    flex: 1,
                                    fontWeight: '500',
                                    color: '#000',
                                }}
                            >
                                {user.email}
                            </Text>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        backgroundColor: '#fff',
                        padding: 12,
                        marginTop: 12,
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
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
                            }}
                        >
                            Mã khuyến mại:
                        </Text>
                    </View>
                    <Text style={{ color: '#000', paddingHorizontal: 14 }}>Các mã ưu đãi sẽ được áp dụng sau khi chọn</Text>
                    <View
                        style={{
                            borderWidth: 1,
                            borderColor: '#f1f1f1',
                            padding: 14,
                            borderRadius: 12,
                            marginTop: 12,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Text style={{ color: '#000' }}>Mã ưu đãi nền tảng</Text>
                            <Text>Không khả dụng</Text>
                            <IconEntypo name="chevron-right" size={18} />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginTop: 12,
                            }}
                        >
                            <Text style={{ color: '#000', flex: 1 }}>Mã ưu đãi phương thức thanh toán</Text>
                            <Text>Không khả dụng</Text>
                            <IconEntypo name="chevron-right" size={18} />
                        </View>
                    </View>
                </View>
                <View style={{ paddingHorizontal: 12, paddingVertical: 20 }}>
                    <Text style={{ color: '#c0c0c0' }}>
                        Tôi đã hiểu và đồng ý với Điều khoản Sử dụng Chung và Chính sách Quyền riêng tư của Klook
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
                        }}
                    >
                        <IconAntDesign name="filetext1" color="#1f908f" size={18} />
                        <Text style={{ color: '#1f908f', marginLeft: 8 }}>Hoàn hủy miễn phí trong vòng 48h</Text>
                    </View>
                    <Text
                        style={{
                            backgroundColor: '#fcf1db',
                            borderWidth: 1,
                            borderColor: '#f5e0b7',
                            padding: 12,
                            borderRadius: 12,
                            marginTop: 12,
                            color: '#000',
                        }}
                    >
                        Xin điền thông tin cẩn thận. Khi đã gửi sẽ không thể thay đổi.
                    </Text>
                </View>
            </ScrollView>
            <View
                style={{
                    padding: 12,
                    elevation: 1,
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: '600',
                        color: '#000',
                        marginBottom: 12,
                    }}
                >
                    đ{' '}
                    {formatNumberWithCommas(
                        products.reduce((total, item) => {
                            // total + item.price * item.amount
                            return (
                                total +
                                item.quantity.reduce((total, item) => {
                                    return total + item.price;
                                }, 0)
                            );
                        }, 0)
                    )}
                </Text>
                <TouchableWithoutFeedback onPress={handlePay}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 16,
                            fontWeight: '500',
                            color: '#fff',
                            backgroundColor: '#ff5c19',
                            paddingVertical: 12,
                            borderRadius: 12,
                        }}
                    >
                        Thanh toán
                    </Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
};

export default Pay;
