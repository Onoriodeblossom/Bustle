import React, { useEffect, useState } from 'react';
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
  Alert
} from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

const SettingsScreen = ({ navigation }) => {
  const menu = [{ settingsName: 'Account Setup', avatar_url: require('../../images/bank_setup.png'), subtitle: 'Set up your account', id: 1 },
  { settingsName: 'Profile Setup', avatar_url: require('../../images/account_setup.png'), subtitle: 'Complete your profile', id: 2 },
  { settingsName: 'Upgrade Account', avatar_url: require('../../images/upgrade_account.png'), subtitle: 'Upgrade your account', id: 3 }
  ]
  const [settingsList, setSettingsList] = useState(menu);
  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8'
        }}
      />
    );
  };
  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => goToItem(item)} activeOpacity={0.8}>
      <ListItem bottomDivider>
        <Avatar source={item.avatar_url} />

        <ListItem.Content>
          <ListItem.Title>{item.settingsName}</ListItem.Title>
          <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
        </ListItem.Content>

        <ListItem.Chevron />

      </ListItem>
    </TouchableOpacity>
  )
  const goToItem = (item) => {
    switch (item.id) {
      case 1:
        navigation.navigate('BankDetailsListScreen')
        break;
      case 2:
        navigation.navigate('RegistrationCompleteScreen')
        break;
      case 3:
        navigation.navigate('RegistrationCompleteScreen')
        break;
    }

  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <FlatList
          keyExtractor={keyExtractor}
          data={menu}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020"
  },
  item: {
    paddingLeft: 20,
    paddingTop: 10,
    fontSize: 18
  },
});