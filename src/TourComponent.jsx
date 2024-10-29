import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const TourComponent = () => {
  const apiData = {
    ngay: [{ten: 'Tour Ngày'}, {ten: 'Tour 2N1Đ'}],
    tour: [
      {ten: 'Tour Ghép'},
      {ten: 'Tour Riêng'},
      {ten: 'Tour ghép bằng xe sang (D-Car)'},
    ],
    gio: [{ten: '1 giờ'}, {ten: '3 giờ'}, {ten: '2 giờ'}],
  };
  // State quản lý active cho mỗi nhóm (dùng object để lưu trạng thái cho nhiều nhóm)
  const [activeGroups, setActiveGroups] = useState({
    ngay: 'Tour 2N1Đ',
    tour: 'Tour Ghép',
  });

  // Hàm xử lý onPress cho các thẻ trong nhóm
  const handlePress = (groupName, itemName) => {
    setActiveGroups(prevState => ({
      ...prevState,
      [groupName]: itemName, // Cập nhật trạng thái active của nhóm đó
    }));
  };

  return (
    <View>
      {Object.keys(apiData).map((groupName, groupIndex) => (
        <View key={groupIndex}>
          <Text>{groupName}</Text>
          <View>
            {apiData[groupName].map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                onPress={() => handlePress(groupName, item.ten)}>
                <Text
                  style={[
                    styles.text,
                    activeGroups[groupName] === item.ten && styles.activeText,
                  ]}>
                  {item.ten}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

// Style cho các thẻ text
const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    padding: 10,
    color: 'black',
  },
  activeText: {
    color: 'blue', // Màu sắc khi thẻ được active
    fontWeight: 'bold',
  },
});

export default TourComponent;
