import { View, ScrollView, Text } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';

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
import Hightlight from './Component/Hightlight';
import CanLike from './Component/CanLike';
import Destination from './Component/Destination';
import Title from './Component/Title';
import ModalAddCart from './Modal/ModalAddCart';

import Config from '../.env/Config';

const Product = ({ navigation, route }) => {
    const [product, setProduct] = useState({});
    const [opacity, setOpacity] = useState(0);
    const [opacityImage, setOpacityImage] = useState(1);
    const [backgroundBtn, setBackgroundBtn] = useState('#fff');
    const [colorBtn, setColorBtn] = useState('#ccc');
    const [bottom, setBottom] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [quantity, setQuantity] = useState([]);
    const [counts, setCounts] = useState([]);
    const [countsInit, setCountsInit] = useState([]);
    const [price, setPrice] = useState(undefined);
    const [package_service, setPackage_service] = useState({});

    // Nhận dữ liệu từ các navigation khác chuyển qua
    const { id, category, cityId, cityName } = route.params;

    const headerRef = useRef();
    const BottomRef = useRef();

    // Hàm format giá tiền
    const formatNumberWithCommas = useCallback((number) => {
        return numeral(number).format('0,0');
    }, []);

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
    const minPricePackage = useCallback((data) => {
        const pricelist = data.map((ele) => minPrice(ele.quantitys));
        return Math.min(...pricelist);
    }, []);

    //Thực hiện khi nhấn vào sản phẩm
    const handlePressProduct = useCallback(async (...param) => {
        const [id, image, name, star, category, cityId, city, packages] = param;
        //Chuyển sang trang sản phẩm
        navigation.push('Product', {
            id: id,
            category: category,
            cityId: cityId,
            cityName: city,
        });

        //Lưu sản phẩm vào AsyncStorage
        const arr = (await AsyncStorage.getItem('product')) ? JSON.parse(await AsyncStorage.getItem('product')) : [];

        if (!arr.some((item) => item.id === id)) {
            if (arr.length === 10) {
                arr.pop();
            }
            arr.unshift({ id: id, image: image, name: name, star: star, category: category, cityId: cityId, city: city, package: packages });
            await AsyncStorage.setItem('product', JSON.stringify(arr));
        } else {
            // Tách phần tử có id bằng 2 và các phần tử còn lại
            const elementToMove = arr.filter((item) => item.id === id);
            const remainingElements = arr.filter((item) => item.id !== id);

            // Nối phần tử đã lọc lên đầu mảng
            const newArray = elementToMove.concat(remainingElements);
            await AsyncStorage.setItem('product', JSON.stringify(newArray));
        }
    }, []);

    // Sử lý lấy tọa độ của thẻ cả 2 thẻ đều nằm trong thẻ con
    const getCoordinatesBtnAddCart = async () => {
        const coordinates = await BottomRef.current.getCoordinates();
        return coordinates;
    };
    const getCoordinatesBtnCart = async () => {
        const coordinates = await headerRef.current.getCoordinates();
        return coordinates;
    };
    const showCartAnimate = () => {
        BottomRef.current.showCartAnimate();
    };
    const setUnviewedCartCount = (value) => {
        BottomRef.current.setUnviewedCartCount(value);
    };
    const setUnviewedCartCount_Header = (value) => {
        headerRef.current.setUnviewedCartCount(value);
    };
    // Gọi api sản phẩm
    useEffect(() => {
        async function fetchData() {
            const idUser = JSON.parse(await AsyncStorage.getItem('idUser'));
            try {
                const res = await axios.get(`${Config.API_URL}/api/getProduct/${id}/${idUser}`);
                setProduct(res.data);
                headerRef.current.setLiked(res.data.isLike);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <View style={{ flex: 1, position: 'relative' }}>
                <Header
                    opacity={opacity}
                    backgroundBtn={backgroundBtn}
                    colorBtn={colorBtn}
                    idProduct={product.id}
                    navigation={navigation}
                    ref={headerRef}
                />

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
                        <Title
                            name={product.name}
                            star={product.star}
                            notify={product.notify}
                            place={product.place}
                            evaluate={product.evaluate}
                            booked={product.booked}
                            address={product.address}
                            navigation={navigation}
                        />
                        {/* Các điểm nổi bật */}
                        <Hightlight highlight={product.highlight} setModalVisible={setModalVisible} />
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
                        <CanLike
                            category={category}
                            cityId={cityId}
                            formatNumberWithCommas={formatNumberWithCommas}
                            minPricePackage={minPricePackage}
                            minPrice={minPrice}
                            handlePressProduct={handlePressProduct}
                        />
                        {/* Điểm đến theo xu hướng */}
                        <Destination handlePressProduct={handlePressProduct} cityId={cityId} />
                    </View>
                </ScrollView>

                <Bottom_Action_Bar
                    price={price}
                    formatNumberWithCommas={formatNumberWithCommas}
                    activeIndex={activeIndex}
                    setModalVisible1={setModalVisible1}
                    setModalVisible2={setModalVisible2}
                    getCoordinatesBtnAddCart={getCoordinatesBtnAddCart}
                    getCoordinatesBtnCart={getCoordinatesBtnCart}
                    setUnviewedCartCount_Header={setUnviewedCartCount_Header}
                    ref={BottomRef}
                />
            </View>

            <ModalHighlight highlight={product.highlight} modalVisible={modalVisible} setModalVisible={setModalVisible} />

            <ModalOrder
                product={product}
                cityId={cityId}
                cityName={cityName}
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

            <ModalAddCart
                product={product}
                cityId={cityId}
                cityName={cityName}
                modalVisible2={modalVisible2}
                package_service={package_service}
                quantity={quantity}
                counts={counts}
                setModalVisible2={setModalVisible2}
                showCartAnimate={showCartAnimate}
                setUnviewedCartCount={setUnviewedCartCount}
                setCounts={setCounts}
                formatNumberWithCommas={formatNumberWithCommas}
                countsInit={countsInit}
            />
        </>
    );
};

export default Product;
