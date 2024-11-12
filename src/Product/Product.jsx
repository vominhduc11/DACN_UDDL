import { View, Text, ScrollView, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from 'react';

import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import numeral from 'numeral';
import ModalHighlight from './Modal/ModalHighlight';
import ModalOrder from './Modal/ModalOrder';
import Bottom_Action_Bar from './Component/Bottom_Action_Bar';
import Header from './Component/Header';
import ImageMain from './Component/ImageMain';
import About_service from './Component/About_service';
import Package from './Component/Package';
import Comment from './Component/Comment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';

const Product = ({ navigation, route }) => {
    const [product, setProduct] = useState({});
    const [listProduct1, setListProduct1] = useState([]);
    const [listProduct2, setListProduct2] = useState([]);
    const [opacity, setOpacity] = useState(0);
    const [opacityImage, setOpacityImage] = useState(1);
    const [backgroundBtn, setBackgroundBtn] = useState('#fff');
    const [colorBtn, setColorBtn] = useState('#ccc');
    const [contentHeight1, setContentHeight1] = useState(0);
    const [bottom, setBottom] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [quantity, setQuantity] = useState([]);
    const [counts, setCounts] = useState([]);
    const [countsInit, setCountsInit] = useState([]);
    const [price, setPrice] = useState(undefined);
    const [package_service, setPackage_service] = useState({});

    const { id, category, cityId } = route.params;

    //chuyển đổi số lớn
    const formatNumber = (number) => {
        if (number >= 1000) {
            return numeral(number).format('0.[0]a').toUpperCase();
        }
        return number;
    };
    const formatNumberWithCommas = (number) => {
        return numeral(number).format('0,0');
    };

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

    // Thực hiện sự kiện khi scroll
    function handleScrollScreen(event) {
        const contentOffset = event.nativeEvent.contentOffset;
        setOpacity(contentOffset.y / 226);
        setBottom(contentOffset.y / 5);
        setOpacityImage(1.2 - contentOffset.y / 200);

        if (contentOffset.y >= 120) {
            setBackgroundBtn('transparent');
            setColorBtn('#000');
        } else {
            setBackgroundBtn('#fff');
            setColorBtn('#808080');
        }
    }

    //Tìm price nhỏ nhất
    function minPrice(data) {
        const pricelist = data.map((ele) => ele.price);
        return Math.min(...pricelist);
    }

    //Tìm gía nhỏ nhất trong gói
    function minPricePackage(data) {
        const pricelist = data.map((ele) => minPrice(ele.quantitys));
        return Math.min(...pricelist);
    }

    //Thực hiện khi nhấn vào sản phẩm
    const handlePressProduct = async (id, image, name, category, cityId) => {
        const arr = (await AsyncStorage.getItem('product')) ? JSON.parse(await AsyncStorage.getItem('product')) : [];

        if (!arr.some((item) => item.id === id)) {
            if (arr.length === 10) {
                arr.pop();
            }
            arr.unshift({ id: id, image: image, name: name, category: category, cityId: cityId });
            await AsyncStorage.setItem('product', JSON.stringify(arr));
        } else {
            // Tách phần tử có id bằng 2 và các phần tử còn lại
            const elementToMove = arr.filter((item) => item.id === id);
            const remainingElements = arr.filter((item) => item.id !== id);

            // Nối phần tử đã lọc lên đầu mảng
            const newArray = elementToMove.concat(remainingElements);
            await AsyncStorage.setItem('product', JSON.stringify(newArray));
        }
        setListProduct2(JSON.parse(await AsyncStorage.getItem('product')));

        //Chuyển sang trang sản phẩm
        navigation.navigate('Product', {
            id: id,
            category: category,
            cityId: cityId,
        });
    };
    // Gọi api sản phẩm
    useEffect(() => {
        async function fetchData() {
            try {
                const res1 = await axios.get(`http://192.168.0.113:8080/api/getProduct/${id}`);
                setProduct(res1.data);

                const res2 = await axios.get(`http://192.168.0.113:8080/api/getListProduct/${category}/${cityId}`);
                setListProduct1(res2.data);

                const res3 = await axios.get(`http://192.168.0.113:8080/api/getProductOfCity/${cityId}/10`);
                setListProduct2(res3.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <View style={{ flex: 1, position: 'relative' }}>
                <Header opacity={opacity} backgroundBtn={backgroundBtn} colorBtn={colorBtn} navigation={navigation} />

                <ScrollView onScroll={handleScrollScreen} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
                    <ImageMain bottom={bottom} opacityImage={opacityImage} image={product.image} />
                    <View
                        style={{
                            marginTop: -12,
                            paddingHorizontal: 12,
                            paddingTop: 16,
                            paddingBottom: 12,
                            zIndex: 10,
                            backgroundColor: '#fff',
                            borderTopEndRadius: 12,
                            borderTopLeftRadius: 12,
                        }}
                    >
                        {/* ten */}
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: '700',
                                color: '#000',
                            }}
                        >
                            {product.name}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 6,
                                marginBottom: 12,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <IconAntDesign name="star" size={20} color="#FFCC00"></IconAntDesign>
                                <Text
                                    style={{
                                        color: '#FFCC00',
                                        fontSize: 16,
                                        fontWeight: '800',
                                    }}
                                >
                                    {product.star}
                                </Text>
                            </View>
                            <Text style={{ color: '#000', marginLeft: 12 }}>({formatNumber(product.evaluate)} Đánh giá)</Text>
                            <Text style={{ marginLeft: 18 }}>{formatNumber(product.booked)} Đã đặt</Text>
                        </View>
                        <TouchableWithoutFeedback>
                            <View>
                                {product.notify !== null && (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginBottom: 6,
                                        }}
                                    >
                                        <IconIonicons name="notifications" size={20} />
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                width: 256,
                                                color: '#000',
                                                marginLeft: 5,
                                            }}
                                        >
                                            {product.notify}
                                        </Text>
                                    </View>
                                )}
                                {product.place !== null && (
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <IconIonicons name="location-sharp" size={20} />
                                        <Text
                                            numberOfLines={1}
                                            style={{
                                                width: 256,
                                                color: '#000',
                                                marginLeft: 5,
                                            }}
                                        >
                                            {product.place}
                                        </Text>
                                    </View>
                                )}
                                <Text
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        top: 3,
                                    }}
                                >
                                    <IconEntypo name="chevron-thin-right" size={14} color="#000" />
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
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
                                        ${product.highlight} 
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
                        {/* Cac goi dich vu */}
                        <Package
                            package_services={product.package_services}
                            activeIndex={activeIndex}
                            formatNumberWithCommas={formatNumberWithCommas}
                            minPrice={minPrice}
                            setActiveIndex={setActiveIndex}
                            setPackage_service={setPackage_service}
                            setQuantity={setQuantity}
                            setCounts={setCounts}
                            setCountsInit={setCountsInit}
                            setPrice={setPrice}
                        />
                        {/* Đánh giá */}
                        <Comment star={product.star} comments={product.comments} />
                        {/* Ve dich vu nay */}
                        <About_service information={product.information} />
                        {/* Có thể bạn sẽ thích */}
                        <View style={{ marginTop: 18, marginRight: -12 }}>
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
                                    Có thể bạn sẽ thích
                                </Text>
                            </View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    {/* element */}
                                    {listProduct1.map((product) => (
                                        <TouchableWithoutFeedback
                                            key={product.id}
                                            onPress={() =>
                                                handlePressProduct(product.id, product.image, product.name, product.category, product.cityId)
                                            }
                                        >
                                            <View style={{ marginRight: 12 }}>
                                                <FastImage
                                                    style={{
                                                        height: 100,
                                                        width: 130,
                                                        borderRadius: 12,
                                                    }}
                                                    source={{ uri: product.image, priority: FastImage.priority.high }}
                                                    resizeMode={FastImage.resizeMode.cover}
                                                />
                                                <Text
                                                    numberOfLines={2}
                                                    style={{
                                                        color: '#000',
                                                        marginTop: 8,
                                                        maxWidth: 130,
                                                        fontWeight: '700',
                                                    }}
                                                >
                                                    {product.name}
                                                </Text>
                                                <Text style={{ marginTop: 0, color: '#000' }}>
                                                    <IconAntDesign name="star" color="#fe9428" />{' '}
                                                    <Text
                                                        style={{
                                                            color: '#fe9428',
                                                            fontWeight: '600',
                                                        }}
                                                    >
                                                        {product.star}
                                                    </Text>{' '}
                                                    ({product.booked})
                                                </Text>
                                                <Text
                                                    style={{
                                                        marginTop: 6,
                                                        flexDirection: 'row',
                                                    }}
                                                >
                                                    {product.package.length === 0 && (
                                                        <Text style={{ color: '#ccc', fontWeight: '700' }}>Đã hết hàng</Text>
                                                    )}
                                                    {product.package.length > 1 && (
                                                        <>
                                                            <Text style={{ fontWeight: '700', color: '#000', marginRight: 2 }}>Từ </Text>
                                                            <Text style={{ color: '#000' }}>
                                                                đ {formatNumberWithCommas(minPricePackage(product.package))}
                                                            </Text>
                                                        </>
                                                    )}
                                                    {product.package.length === 1 && product.package[0].quantitys.length > 1 && (
                                                        <>
                                                            <Text
                                                                style={{
                                                                    fontWeight: '700',
                                                                    color: '#000',
                                                                    marginRight: 2,
                                                                }}
                                                            >
                                                                Từ{' '}
                                                            </Text>
                                                            <Text style={{ color: '#000' }}>
                                                                đ {formatNumberWithCommas(minPricePackage(product.package))}
                                                            </Text>
                                                        </>
                                                    )}
                                                    {product.package.length === 1 && product.package[0].quantitys.length === 1 && (
                                                        <Text style={{ color: '#000' }}>
                                                            đ {formatNumberWithCommas(minPricePackage(product.package))}
                                                        </Text>
                                                    )}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>
                        {/* Điểm đến theo xu hướng */}
                        <View style={{ marginTop: 18, marginRight: -12 }}>
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
                                    Điểm đến theo xu hướng
                                </Text>
                            </View>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    {/* element */}
                                    {listProduct2.map((product) => (
                                        <TouchableWithoutFeedback
                                            key={product.id}
                                            onPress={() =>
                                                handlePressProduct(product.id, product.image, product.name, product.category, product.cityId)
                                            }
                                        >
                                            <View style={{ marginRight: 12 }}>
                                                <FastImage
                                                    style={{
                                                        height: 100,
                                                        width: 130,
                                                        borderRadius: 12,
                                                    }}
                                                    source={{ uri: product.image, priority: FastImage.priority.high }}
                                                    resizeMode={FastImage.resizeMode.cover}
                                                />
                                                <Text
                                                    numberOfLines={2}
                                                    style={{
                                                        color: '#000',
                                                        marginTop: 8,
                                                        maxWidth: 130,
                                                        fontWeight: '700',
                                                    }}
                                                >
                                                    {product.name}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 11,
                                                        marginTop: 0,
                                                        color: '#ccc',
                                                    }}
                                                >
                                                    {product.city}
                                                </Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    ))}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </ScrollView>

                <Bottom_Action_Bar
                    price={price}
                    formatNumberWithCommas={formatNumberWithCommas}
                    activeIndex={activeIndex}
                    setModalVisible1={setModalVisible1}
                />
            </View>

            <ModalHighlight highlight={product.highlight} modalVisible={modalVisible} setModalVisible={setModalVisible} />

            <ModalOrder
                modalVisible1={modalVisible1}
                package_service={package_service}
                quantity={quantity}
                counts={counts}
                setModalVisible1={setModalVisible1}
                setCounts={setCounts}
                formatNumberWithCommas={formatNumberWithCommas}
                countsInit={countsInit}
                navigation={navigation}
            />
        </>
    );
};

export default Product;
