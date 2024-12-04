import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Product from './src/Product/Product';
import Pay from './src/Pay';
import City from './src/City/City';
import Fun_experience from './src/Fun_experience/Fun_experience';
import Home from './src/Home/Home';
import Cart from './src/Cart/Cart';
import Notify from './src/Notify';
import Login from './src/Login';
import Sign from './src/Sign';
import Feature_Activity from './src/Feature_Activity/Feature_Activity';
import Recent_View from './src/Recent_View';
import Pay_status from './src/Pay_status';
import Order_Confirm from './src/Order_Confirm';
import Search from './src/Search/Search';
import Have_fun from './src/Have_fun';
import Where_go from './src/Where_go/Where_go';
import Map from './src/Map';
import MyList from './src/MyList';
import Skeleton from './src/Skeleton';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    animation: 'slide_from_right', // Chuyển cảnh từ phải sang trái
                    gestureEnabled: true, // Kích hoạt cử chỉ vuốt
                }}
            >
                {/* <Stack.Screen name="Skeleton" component={Skeleton} options={{ headerShown: false }} /> */}
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="City" component={City} options={{ headerShown: false }} />
                <Stack.Screen
                    name="Product"
                    component={Product}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Cart"
                    component={Cart}
                    options={{
                        headerShown: true,
                        headerTitle: 'Giỏ hàng',
                    }}
                />
                <Stack.Screen
                    name="Notify"
                    component={Notify}
                    options={{
                        headerShown: true,
                        headerTitle: 'Thông báo',
                    }}
                />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Sign" component={Sign} options={{ headerShown: false }} />
                <Stack.Screen name="Feature_Activity" component={Feature_Activity} options={{ headerShown: false }} />
                <Stack.Screen
                    name="Recent_View"
                    component={Recent_View}
                    options={{
                        headerShown: true,
                        headerTitle: 'Xem gần đây',
                    }}
                />
                <Stack.Screen
                    name="Pay"
                    component={Pay}
                    options={() => ({
                        headerShown: true,
                        headerTitle: 'Hoàn tất đơn hàng',
                    })}
                />
                <Stack.Screen
                    name="Pay_status"
                    component={Pay_status}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Order_Confirm"
                    component={Order_Confirm}
                    options={{
                        headerShown: true,
                        headerTitle: 'Xác nhận đơn hàng',
                    }}
                />
                <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
                <Stack.Screen
                    name="Have_fun"
                    component={Have_fun}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen name="Where_go" component={Where_go} options={{ headerShown: false }} />
                <Stack.Screen name="Fun_experience" component={Fun_experience} options={{ headerShown: false }} />
                <Stack.Screen name="Map" component={Map} options={{ headerShown: true, title: 'Vị trí' }} />
                <Stack.Screen name="MyList" component={MyList} options={{ headerShown: true, title: '' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
