import { View, Text, Image } from 'react-native';
import React from 'react';

const Order_Confirm = () => {
    return (
        <View style={{ paddingHorizontal: 12, paddingTop: 12 }}>
            <Text style={{ color: '#11a873', fontSize: 24, fontWeight: '600' }}>
                Đơn hàng đã được xác nhận
            </Text>
            <Text>
                Mã đơn: <Text style={{ color: '#000' }}>MTZ644523</Text>
            </Text>
            <View style={{ marginTop: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text
                        style={{
                            flex: 1,
                            fontSize: 18,
                            fontWeight: '500',
                            color: '#000',
                        }}>
                        Vé vào cửa MIỄN PHÍ Klook Travel Fest 2024 tại Sydney
                    </Text>
                    <Image
                        borderRadius={12}
                        height={80}
                        width={80}
                        source={{
                            uri: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_500,h_334,c_fill,q_85/activities/fdbxep6vcao6inbj611w.webp',
                        }}
                    />
                </View>
                <Text
                    style={{ fontSize: 18, fontWeight: '500', color: '#000' }}>
                    đ 0
                </Text>
            </View>
        </View>
    );
};

export default Order_Confirm;
