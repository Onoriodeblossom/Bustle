import React from 'react';

// Import Navigators from React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  Text
} from 'react-native';
// Import Screens
import AddProductVariationScreen from './drawerscreens/AddProductVariationScreen';
import MyBasketScreen from './drawerscreens/MyBasketScreen';
import HomeScreen from './drawerscreens/HomeScreen';
import InventoryScreen from './drawerscreens/InventoryScreen';
import SalesScreen from './drawerscreens/SalesScreen';
import ExpenseListScreen from './drawerscreens/ExpenseListScreen';
import AddExpenseScreen from './drawerscreens/AddExpenseScreen';
import AddExpenseType2Screen from './drawerscreens/AddExpenseType2Screen';
import ExpenseType2ListScreen from './drawerscreens/ExpenseType2ListScreen';
import AddExpenseTypeScreen from './drawerscreens/AddExpenseTypeScreen';
import ExpenseTypeListScreen from './drawerscreens/ExpenseTypeListScreen';
import ExpenseHomeScreen from './drawerscreens/ExpenseHomeScreen';
import SettingsScreen from './drawerscreens/SettingsScreen';
import UpdateSalesDetailsScreen from './drawerscreens/UpdateSalesDetailsScreen';
import AddShoppingListScreen from './drawerscreens/AddShoppingListScreen';
import CustomSidebarMenu from './components/CustomSidebarMenu';
import NavigationDrawerHeader from './components/NavigationDrawerHeader';
import ShoppingCartScreen from './drawerscreens/ShoppingCartScreen';
import AddSalesScreen from './drawerscreens/AddSalesScreen';
import AddSalesUserType1 from './drawerscreens/AddSalesUserType1';
import AddSalesUserType2 from './drawerscreens/AddSalesUserType2';
import InventoryHomeScreen from './drawerscreens/InventoryHomeScreen';
import ProductVariationListScreen from './drawerscreens/ProductVariationListScreen';
import ProductListScreen from './drawerscreens/ProductListScreen';
import CategoryListScreen from './drawerscreens/CategoryListScreen';
import AddCategoryScreen from './drawerscreens/AddCategoryScreen';
import AddProductScreen from './drawerscreens/AddProductScreen';
import SalesHomeScreen from './drawerscreens/SalesHomeScreen';
import PurchaseHomeScreen from './drawerscreens/PurchaseHomeScreen';
import StocksListScreen from './drawerscreens/StocksListScreen';
import ViewStocksDetailsScreen from './drawerscreens/ViewStocksDetailsScreen';
import ShoppingListScreen from './drawerscreens/ShoppingListScreen';
import DiscountListScreen from './drawerscreens/DiscountListScreen';
import AddDiscountScreen from './drawerscreens/AddDiscountScreen';
import SalesDetailsScreen from './drawerscreens/SalesDetailsScreen';
import TrackCreditScreen from './drawerscreens/TrackCreditScreen';
import UpdateCreditScreen from './drawerscreens/UpdateCreditScreen';
import SalesHistoryScreen from './drawerscreens/SalesHistoryScreen';
import InvoiceScreen from './drawerscreens/InvoiceScreen';
import BankDetailsListScreen from './drawerscreens/BankDetailsListScreen';
import AddBankDetailsScreen from './drawerscreens/AddBankDetailsScreen';
import SalesUpdateScreen from './drawerscreens/SalesUpdateScreen';
import AddSalesDetailsScreen from './drawerscreens/AddSalesDetailsScreen';
import SalesInvoiceScreen from './drawerscreens/SalesInvoiceScreen';
import AddPreviousSaleScreen from './drawerscreens/AddPreviousSaleScreen';
import AddPurchaseScreen from './drawerscreens/AddPurchaseScreen';
import PurchaseHistoryScreen from './drawerscreens/PurchaseHistoryScreen';
import AddPreviousPurchaseScreen from './drawerscreens/AddPreviousPurchaseScreen';
import PurchaseScreen from './drawerscreens/PurchaseScreen';
import ShoppingListHomeScreen from './drawerscreens/ShoppingListHomeScreen';
import ShoppingListInventoryScreen from './drawerscreens/ShoppingListInventoryScreen';
import UpdateShoppingListScreen from './drawerscreens/UpdateShoppingListScreen';
import DraftShoppingListScreen from './drawerscreens/DraftShoppingListScreen';
import ExpenseHistoryScreen from './drawerscreens/ExpenseHistoryScreen';
import AddPreviousExpenseScreen from './drawerscreens/AddPreviousExpenseScreen';
import RegistrationCompleteScreen from './drawerscreens/RegistrationCompleteScreen';
import Cart from './components/Cart';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createMaterialBottomTabNavigator();


// const InventoryInnerScreenStack = ({ navigation }) => {
//   return (
//     <Stack.Navigator initialRouteName="InventoryScreen">
//       <Stack.Screen
//         name="Products"
//         component={InventoryScreen}
//       />
//       <Stack.Screen
//         name="AddStockScreen"
//         component={AddStockScreen}

//       />
//     </Stack.Navigator>
//   );
// };

const MyExpenseInnerScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="ExpenseHomeScreen">
      <Stack.Screen
        name="ExpenseHomeScreen"
        component={ExpenseHomeScreen}
        options={{
          title: 'Expense Manager',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="ExpenseListScreen"
        component={ExpenseListScreen}
        options={{
          title: 'Expense',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="ExpenseType2ListScreen"
        component={ExpenseType2ListScreen}
        options={{
          title: 'Expense',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="AddExpenseScreen"
        component={AddExpenseScreen}
        options={{
          title: 'Add Expense',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}

      />
      <Stack.Screen
        name="AddExpenseType2Screen"
        component={AddExpenseType2Screen}
        options={{
          title: 'Add Expense',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}

      />

      <Stack.Screen
        name="ExpenseTypeListScreen"
        component={ExpenseTypeListScreen}
        options={{
          title: 'Expense Type',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="AddExpenseTypeScreen"
        component={AddExpenseTypeScreen}
        options={{
          title: 'Add Expense Type',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}

      />

      <Stack.Screen
        name="ExpenseHistoryScreen"
        component={ExpenseHistoryScreen}
        options={{
          title: 'Expense History',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}

      />
      <Stack.Screen
        name="AddPreviousExpenseScreen"
        component={AddPreviousExpenseScreen}
        options={{
          title: 'Previous Expense',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}

      />
    </Stack.Navigator>
  );
};

const MyPurchaseInnerScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="PurchaseHomeScreen">
      <Stack.Screen
        name="PurchaseHomeScreen"
        component={PurchaseHomeScreen}
        options={{
          title: 'Purchase Manager',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="PurchaseScreen"
        component={PurchaseScreen}
        options={{
          title: 'Purchase',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="AddPurchaseScreen"
        component={AddPurchaseScreen}
        options={{
          title: 'New Purchase',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="PurchaseHistoryScreen"
        component={PurchaseHistoryScreen}
        options={{
          title: 'Purchase History',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="AddPreviousPurchaseScreen"
        component={AddPreviousPurchaseScreen}
        options={{
          title: 'Add Previous Purchase',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="ShoppingListHomeScreen"
        component={ShoppingListHomeScreen}
        options={{
          title: 'Shopping List Home',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="ShoppingListInventoryScreen"
        component={ShoppingListInventoryScreen}
        options={{
          title: 'Shopping List',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="UpdateShoppingListScreen"
        component={UpdateShoppingListScreen}
        options={{
          title: 'Update Shopping List',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="DraftShoppingListScreen"
        component={DraftShoppingListScreen}
        options={{
          title: 'Draft Shopping List',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
    </Stack.Navigator>
  );
}

const MySalesInnerScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="SalesHomeScreen">
      <Stack.Screen
        name="SalesHomeScreen"
        component={SalesHomeScreen}
        options={{
          title: 'Sales Manager',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="SalesScreen"
        component={SalesScreen}
      />
      <Stack.Screen
        name="TrackCreditScreen"
        component={TrackCreditScreen}
        options={{
          title: 'Track Credit',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="AddSalesScreen"
        component={AddSalesScreen}
        options={{
          title: 'New Sales',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="AddSalesUserType2"
        component={AddSalesUserType2}
        options={{
          title: 'New Sales',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="AddSalesUserType1"
        component={AddSalesUserType1}
        options={{
          title: 'New Sales',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="DiscountListScreen"
        component={DiscountListScreen}
        options={{
          title: 'Discount',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="AddDiscountScreen"
        component={AddDiscountScreen}
        options={{
          title: 'Create Discount',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="UpdateCreditScreen"
        component={UpdateCreditScreen}
        options={{
          title: 'Update Credit Details',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="InvoiceScreen"
        component={InvoiceScreen}
        options={{
          title: 'Invoice',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="UpdateSalesDetailsScreen"
        component={UpdateSalesDetailsScreen}
        options={{
          title: 'Sales Status Update',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="SalesHistoryScreen"
        component={SalesHistoryScreen}
        options={{
          title: 'Sales History',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="AddBankDetailsScreen"
        component={AddBankDetailsScreen}
      />
      <Stack.Screen
        name="BankDetailsListScreen"
        component={BankDetailsListScreen}
      />
      <Stack.Screen
        name="SalesUpdateScreen"
        component={SalesUpdateScreen}
        options={{
          title: 'Sales Update',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="SalesInvoiceScreen"
        component={SalesInvoiceScreen}
        options={{
          title: 'Sales Invoice',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="AddSalesDetailsScreen"
        component={AddSalesDetailsScreen}
        options={{
          title: 'Proceed',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="AddPreviousSaleScreen"
        component={AddPreviousSaleScreen}
        options={{
          title: 'Previous Sales',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />


    </Stack.Navigator>
  );
};

const InventoryInnerScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="InventoryHomeScreen">
      <Stack.Screen
        name="InventoryHomeScreen"
        component={InventoryHomeScreen}
        options={{
          title: 'Inventory Manager',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="ProductListScreen"
        component={ProductListScreen}
        options={{
          title: 'Products',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="AddProductScreen"
        component={AddProductScreen}
        options={{
          title: 'Add Products',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="AddProductVariationScreen"
        component={AddProductVariationScreen}
        options={{
          title: 'Add Stocks',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="ProductVariationListScreen"
        component={ProductVariationListScreen}
        options={{
          title: 'Stocks',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="ShoppingListScreen"
        component={ShoppingListScreen}
        options={{
          title: 'Stocks',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />

      <Stack.Screen
        name="AddCategoryScreen"
        component={AddCategoryScreen}
        options={{
          title: 'Add Category',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="CategoryListScreen"
        component={CategoryListScreen}
        options={{
          title: 'Category',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="InventoryScreen"
        component={InventoryScreen}
        options={{
          title: 'Inventory',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />

      <Stack.Screen
        name="StocksListScreen"
        component={StocksListScreen}
        options={{
          title: 'Stock Listings',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="ViewStocksDetailsScreen"
        component={ViewStocksDetailsScreen}
        options={{
          title: 'Stock Listings',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />

    </Stack.Navigator>
  );
};


const MyShopingBasketInnerScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="MyBasketScreen">
      <Stack.Screen
        name="My Shopping List"
        component={MyBasketScreen}
      />
      <Stack.Screen
        name="AddShoppingListScreen"
        component={AddShoppingListScreen}

      />
    </Stack.Navigator>
  );
};

const homeScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Home', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),

          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const inventoryScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="InventoryScreen">
      <Stack.Screen
        name="InventoryScreen"
        component={InventoryInnerScreenStack}
        options={{
          title: 'Inventory Manager', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),

          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};


const salesScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="SalesScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),

        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SalesScreen"
        component={MySalesInnerScreenStack}
        options={{
          title: 'Sales Manager', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};
const purchaseScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="PurchaseScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),

        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="PurchaseScreen"
        component={MyPurchaseInnerScreenStack}
        options={{
          title: 'Purchase Manager', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const expenseScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="ExpenseScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),

        headerStyle: {
          backgroundColor: '#307ecc', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="ExpenseHomeScreen"
        component={MyExpenseInnerScreenStack}
        options={{
          title: 'Expense Manager', //Set Header Title
        }}
      />
      <Stack.Screen
        name="RegistrationCompleteScreen"
        component={RegistrationCompleteScreen}
        options={{
          title: 'Registration',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
    </Stack.Navigator>
  );
};

const settingInnerScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="SettingsScreen">
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="BankDetailsListScreen"
        component={BankDetailsListScreen}
        options={{
          title: 'Account Setting',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="AddBankDetailsScreen"
        component={AddBankDetailsScreen}
        options={{
          title: 'Add Account',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen
        name="RegistrationCompleteScreen"
        component={RegistrationCompleteScreen}
        options={{
          title: 'Registration',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
    </Stack.Navigator>
  );
};

const settingScreenStack = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="SettingsScreen">

      <Stack.Screen
        name="SettingsScreen"
        component={settingInnerScreenStack}
        options={{
          title: 'Settings Manager', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),

          headerStyle: {
            backgroundColor: '#307ecc', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = props => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#cee1f2',
        color: '#cee1f2',
        itemStyle: { marginVertical: 5, color: 'white' },
        labelStyle: {
          color: '#d8d8d8',
        },
      }}
      screenOptions={{ headerShown: false }}
      drawerContent={CustomSidebarMenu}>
      <Drawer.Screen
        name="homeScreenStack"
        options={{
          drawerLabel: 'Home Screen',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="home"
              size={size}
              color={focused ? '#fff' : '#ccc'}
            />
          )
        }}
        component={homeScreenStack}
      />
      <Drawer.Screen
        name="inventoryScreenStack"
        options={{
          drawerLabel: 'Inventory Manager',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="book"
              size={size}
              color={focused ? '#fff' : '#ccc'}
            />
          )
        }}
        component={inventoryScreenStack}
      />
      <Drawer.Screen
        name="salesScreenStack"
        options={{
          drawerLabel: 'Sales Manager',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="book"
              size={size}
              color={focused ? '#fff' : '#ccc'}
            />
          )
        }}
        component={salesScreenStack}
      />
      <Drawer.Screen
        name="purchaseScreenStack"
        options={{
          drawerLabel: 'Purchase Manager',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="book"
              size={size}
              color={focused ? '#fff' : '#ccc'}
            />
          )
        }}
        component={purchaseScreenStack}
      />
      <Drawer.Screen
        name="expenseScreenStack"
        options={{
          drawerLabel: 'Expense Manager',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="book"
              size={size}
              color={focused ? '#fff' : '#ccc'}
            />
          )
        }}
        component={expenseScreenStack}
      />
      {/*
      <Drawer.Screen
        name="MyExpenseInnerScreenStack"
        options={{
          drawerLabel: 'Purchase History',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="book"
              size={size}
              color={focused ? '#fff' : '#ccc'}
            />
          )
        }}
        component={expenseScreenStack}
      />
      <Drawer.Screen
        name="MyExpenseInnerScreenStack"
        options={{
          drawerLabel: 'Shopping List',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="book"
              size={size}
              color={focused ? '#fff' : '#ccc'}
            />
          )
        }}
        component={expenseScreenStack}
      />
      <Drawer.Screen
        name="MyExpenseInnerScreenStack"
        options={{
          drawerLabel: 'Track Credit',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="book"
              size={size}
              color={focused ? '#fff' : '#ccc'}
            />
          )
        }}
        component={expenseScreenStack}
      />
      <Drawer.Screen
        name="MyExpenseInnerScreenStack"
        options={{
          drawerLabel: 'Customer Management',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="book"
              size={size}
              color={focused ? '#fff' : '#ccc'}
            />
          )
        }}
        component={expenseScreenStack}
      /> */}
      <Drawer.Screen
        name="MyExpenseInnerScreenStack"
        options={{
          drawerLabel: 'Report',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="book"
              size={size}
              color={focused ? '#fff' : '#ccc'}
            />
          )
        }}
        component={expenseScreenStack}
      />
      <Drawer.Screen
        name="settingScreenStack"
        options={{
          drawerLabel: 'Setting Screen',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="cog"
              size={size}
              color={focused ? '#fff' : '#ccc'}
            />
          )
        }}
        component={settingScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;
