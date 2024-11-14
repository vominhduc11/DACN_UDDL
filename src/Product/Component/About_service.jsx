import { View, Text } from 'react-native';
import React, { memo, useState } from 'react';
import WebView from 'react-native-webview';

const About_service = ({ information }) => {
    const [contentHeight, setContentHeight] = useState(0);

    // Hàm xử lý khi nhận dữ liệu từ WebView
    const handleMessage = (event) => {
        const webData = event.nativeEvent.data; // Dữ liệu từ WebView
        setContentHeight(Number(webData));
    };
    return (
        <View style={{ marginTop: 24 }}>
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
                    Về dịch vụ này
                </Text>
            </View>
            <WebView
                style={{
                    marginTop: 5,
                    height: contentHeight + 10,
                    backgroundColor: 'transparent',
                }} // Chiều rộng WebView
                javaScriptEnabled={true}
                injectedJavaScript={`
                const height = document.querySelector(".dynamic-image").offsetHeight;
                (function sendMessageToReactNative() {
                        window.ReactNativeWebView.postMessage(height);
                })()

                const imgs = document.querySelectorAll("img");
                imgs.forEach(img => {
                    img.classList.add("lazyload");
                })
                `}
                source={{
                    html: `
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
                    <style>
                        img {width:100%}
                        div {margin-top:12px}
                        p {font-size: 15}
                        ul {padding-left: 12}
                    </style>
                </head>
                <body>
                    ${information}
                </body>
                `,
                }}
                onMessage={handleMessage}
            />
        </View>
    );
};

export default memo(About_service);
