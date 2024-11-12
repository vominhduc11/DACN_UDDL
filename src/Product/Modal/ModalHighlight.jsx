import { View, Text, Modal } from 'react-native';
import React, { useState } from 'react';
import WebView from 'react-native-webview';

import IconAntDesign from 'react-native-vector-icons/AntDesign';

const ModalHighlight = ({ highlight, modalVisible, setModalVisible, navigation }) => {
    const [contentHeight3, setContentHeight3] = useState(0);
    // Hàm xử lý khi nhận dữ liệu từ WebView
    const handleMessage3 = (event) => {
        const webData = event.nativeEvent.data; // Dữ liệu từ WebView
        setContentHeight3(Number(webData));
    };

    return (
        <Modal
            animationType="slide" // hoặc 'fade', 'none'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}
        >
            <View
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    flex: 1,
                    position: 'relative',
                }}
            >
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        backgroundColor: '#fff',
                        width: '100%',
                        borderTopRightRadius: 12,
                        borderTopLeftRadius: 12,
                    }}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            fontWeight: '700',
                            color: '#000',
                            fontSize: 16,
                            paddingVertical: 12,
                        }}
                    >
                        Điểm nổi bật
                    </Text>
                    <WebView
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        source={{
                            html: `
                                        <head>
                                            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
                                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
                                            <style>
                                                ul {
                                                    font-size: 16px; /* Đảm bảo đơn vị px */
                                                    border-radius: 12px;
                                                    padding-right: 50px; /* Đảm bảo đơn vị px */
                                                    padding-left: 30px;
                                                }

                                                li {
                                                    margin-bottom: 10px;
                                                }

                                                i {
                                                    margin-left: 10px;
                                                }

                                                p {
                                                    position: absolute;
                                                    bottom: 0;
                                                    right: 8px;
                                                    left: 8px;
                                                    background-color: #FCF6F2;
                                                    margin-bottom: 0;
                                                    padding: 6px 12px;
                                                    box-shadow: 0px -10px 10px 1px #FCF6F2;
                                                }

                                                span {
                                                    text-decoration: underline;
                                                }
                                            </style>
                                        </head>
                                        <body>
                                            <div>
                                                ${highlight}
                                            </div>
                                        </body>
                                    `,
                        }}
                        injectedJavaScript={`
                                function sendMessageToReactNative(param) {
                                    window.ReactNativeWebView.postMessage(param);
                                }

                                const height = document.querySelector("ul").offsetHeight;
                                sendMessageToReactNative(height);
                            `}
                        onMessage={handleMessage3}
                        style={{
                            height: contentHeight3,
                        }}
                    />
                    <IconAntDesign
                        color="#000"
                        onPress={() => setModalVisible(false)}
                        name="close"
                        size={20}
                        style={{ position: 'absolute', top: 12, left: 12 }}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default ModalHighlight;
