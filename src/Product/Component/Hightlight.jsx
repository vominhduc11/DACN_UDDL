import React, { memo, useState } from 'react';
import WebView from 'react-native-webview';

const Hightlight = ({ highlight, setModalVisible }) => {
    const [contentHeight1, setContentHeight1] = useState(0);
    // Hàm xử lý khi nhận dữ liệu từ WebView
    const handleMessage1 = (event) => {
        const webData = JSON.parse(event.nativeEvent.data); // Dữ liệu từ WebView
        // Giả sử bạn phân loại dựa trên nội dung message
        if (webData.action === 'action1') {
            setContentHeight1(Number(webData.height)); // Gọi hàm 1
        }
        if (webData.action === 'action2') {
            setModalVisible(webData.data);
        }
    };
    return (
        <WebView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            source={{
                html: `                              
                                    <head>
                                        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
                                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
                                        <style>
                                            ul {height:100px;overflow:hidden;font-size: 16; border-radius: 12px;padding-right: 50;padding-left: 30;background-color: #FCF6F2;padding-top: 14;padding-bottom: 14}
                                            i {margin-left:10}
                                            p {position:absolute;bottom:0;right:8px;left:8px;background-color: #FCF6F2;margin-bottom:0;padding:6px 12px;box-shadow: 0px -10px 10px 1px #FCF6F2;}
                                            span {text-decoration: underline;}
                                        </style>
                                    </head>
                                    <body>
                                        ${highlight} 
                                        <p>
                                            <span>Xem thêm</span>
                                        </p>
                                    </body>
                             `,
            }}
            injectedJavaScript={`
                                function sendMessageToReactNative(param) {
                                        window.ReactNativeWebView.postMessage(param);
                                }

                                const height = document.querySelector("ul").offsetHeight;
                                sendMessageToReactNative(JSON.stringify({ height, action: 'action1' }))

                                document.querySelector("span").onclick = () => {
                                    sendMessageToReactNative(JSON.stringify({ data: true, action: 'action2' }))
                                }
                            `}
            onMessage={handleMessage1}
            style={{
                height: contentHeight1 + 10,
                marginTop: 12,
                backgroundColor: 'transparent',
            }}
        />
    );
};

export default memo(Hightlight);
