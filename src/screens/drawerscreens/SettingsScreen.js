import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  Keyboard,
  Image,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
// upload

import Icon from 'react-native-vector-icons/Ionicons';
import Upload from 'react-native-vector-icons/Feather';
import {Container} from '../components/container';

const SettingsScreen = ({navigation}) => {
  const menu = [
    {
      settingsName: 'Account Setup',
      icon: <Icon size={24} color="#0491B7" name="settings-outline" />,
      subtitle: 'Set up your account',
      id: 1,
    },
    {
      settingsName: 'Profile Setup',
      icon: <Icon name="md-person-outline" color="#0491B7" size={24} />,
      subtitle: 'Complete your profile',
      id: 2,
    },
    {
      settingsName: 'Upgrade Account',
      icon: <Upload name="upload" size={24} color="#0491B7" />,
      subtitle: 'Upgrade your account',
      id: 3,
    },
  ];
  const [settingsList, setSettingsList] = useState(menu);
  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
  const keyExtractor = (item, index) => index.toString();

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => goToItem(item)}
      activeOpacity={0.8}
      style={{
        marginLeft: 9,
        borderRadius: 6,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        backgroundColor:"white"
      }}>
      <ListItem
        // bottomDivider
        containerStyle={{
          backgroundColor: 'transparent',
        }}>
        <View>{item.icon}</View>

        <ListItem.Content>
          <ListItem.Title>{item.settingsName}</ListItem.Title>
          <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
        </ListItem.Content>

        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  );
  const goToItem = item => {
    switch (item.id) {
      case 1:
        navigation.navigate('BankDetailsListScreen');
        break;
      case 2:
        navigation.navigate('RegistrationCompleteScreen');
        break;
      case 3:
        navigation.navigate('RegistrationCompleteScreen');
        break;
    }
  };

  return (
    <Container>
      <View style={{padding: 16, width: '100%', flex: 1}}>
        <FlatList
          keyExtractor={keyExtractor}
          data={menu}
          renderItem={renderItem}
        />
      </View>
    </Container>
  );
};

export default SettingsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#202020",
  },
  item: {
    paddingLeft: 20,
    paddingTop: 10,
    fontSize: 18,
  },
});
