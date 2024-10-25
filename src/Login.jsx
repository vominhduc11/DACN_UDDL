import {
    Image,
    ImageBackground,
    Modal,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import React, { useEffect, useState } from 'react';

const Login = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [CategoryLogin, setCategoryLogin] = useState('Chọn hình thức');

    useEffect(() => {
        // Khóa hướng dọc khi component được mount
        Orientation.lockToPortrait();

        // Khi component bị unmount, trả về chế độ mặc định
        return () => {
            Orientation.unlockAllOrientations();
        };
    }, []);

    function handleChooseform(value) {
        setModalVisible(false);
        setCategoryLogin(value);
    }
    return (
        <>
            <StatusBar hidden></StatusBar>

            <ImageBackground
                style={styles.backgroundImage}
                source={{
                    uri: 'https://cdn.photoroom.com/v2/image-cache?path=gs://background-7ef44.appspot.com/backgrounds_v3/white/Photoroom_white_background_extremely_fine_texture_only_white_co_d6a2d66a-dfe4-41fc-80fd-ec55764101bb.jpg',
                }}>
                <View style={styles.wrap}>
                    {/* logo */}
                    <View style={styles.wrapLogo}>
                        <Image
                            style={styles.logo}
                            source={{
                                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Zt6ClEfRlo4BMdsAgsXqgOVyyllMuoCbnV-oDOoSXILvqbRNZ0htKDeSbtcrQQ-3l0U',
                            }}
                        />
                    </View>
                    {/* Email */}
                    <TextInput
                        style={styles.inputEmail}
                        placeholder="Nhập Email ..."
                        keyboardType="email-address" // Đặt kiểu bàn phím email
                        autoCapitalize="none" // Tắt viết hoa tự động cho email
                    />
                    {/* Password */}
                    <TextInput
                        style={styles.inputPassword}
                        placeholder="Nhập Password ..."
                        secureTextEntry={true}
                    />
                    {/* Role */}
                    {/* <TouchableOpacity
                        activeOpacity={0.8}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 12,
                            marginTop: 12,
                        }}
                        onPress={() => setModalVisible(true)}>
                        <View style={{ padding: 12 }}>
                            <Text style={{ color: '#000' }}>
                                {CategoryLogin}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <Modal
                        animationType="fade"
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}>
                        <ImageBackground
                            style={{ flex: 1 }}
                            source={{
                                uri: 'https://png.pngtree.com/background/20220714/original/pngtree-simple-technology-wind-particle-line-technology-cool-creative-background-picture-image_1620969.jpg',
                            }}>
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>
                                        Chọn hình thức đăng nhập
                                    </Text>
                                    <TouchableOpacity
                                        activeOpacity={0.6}
                                        onPress={() =>
                                            handleChooseform('Khách hàng')
                                        }>
                                        <View
                                            style={{
                                                paddingVertical: 12,
                                                paddingHorizontal: 20,
                                                backgroundColor: '#EEEEEE',
                                                borderColor: '#BBBBBB',
                                                borderWidth: 1,
                                                borderRadius: 12,
                                            }}>
                                            <Text>Khách hàng</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={0.6}
                                        style={{ marginTop: 8 }}
                                        onPress={() =>
                                            handleChooseform('Tài xế')
                                        }>
                                        <View
                                            style={{
                                                paddingVertical: 12,
                                                paddingHorizontal: 20,
                                                backgroundColor: '#EEEEEE',
                                                borderColor: '#BBBBBB',
                                                borderWidth: 1,
                                                borderRadius: 12,
                                            }}>
                                            <Text>Tài xế</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        activeOpacity={0.6}
                                        style={{ marginTop: 8 }}
                                        onPress={() =>
                                            handleChooseform('Quản trị')
                                        }>
                                        <View
                                            style={{
                                                paddingVertical: 12,
                                                paddingHorizontal: 20,
                                                backgroundColor: '#EEEEEE',
                                                borderColor: '#BBBBBB',
                                                borderWidth: 1,
                                                borderRadius: 12,
                                            }}>
                                            <Text>Quản trị</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>
                    </Modal> */}
                    {/* Button Login */}
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.btnLogin}>
                        <Text style={styles.textBtnLogin}>Đăng nhập</Text>
                    </TouchableOpacity>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            marginTop: 14,
                        }}>
                        <Text
                            style={{
                                color: '#000',
                                marginRight: 6,
                                textDecorationLine: 'underline',
                            }}>
                            Quên mật khẩu ?
                        </Text>
                        <Text
                            style={{ color: '#00c0a7' }}
                            onPress={() => navigation.navigate('Sign')}>
                            Đăng ký
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        </>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    wrap: {
        width: 250,
    },

    wrapLogo: {
        alignItems: 'center',
        marginBottom: 24,
    },

    logo: { width: 85, height: 85 },

    inputEmail: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    inputPassword: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginTop: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    btnLogin: {
        backgroundColor: '#00c0a7',
        padding: 12,
        borderRadius: 10,
        marginTop: 30,
    },
    textBtnLogin: {
        color: '#fff',
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền tối mờ phía sau modal
    },
    modalView: {
        width: '80%', // Chiều rộng modal chiếm 80% chiều rộng màn hình
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '800',
    },
});

export default Login;
