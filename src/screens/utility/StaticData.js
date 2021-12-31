import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage';
export const ProductList = [
    { id: '1', value: 'Milo', cost: 21, qty: 20, count: 1, imgUrl: require('../../images/milk_img.jpg') },
    { id: '2', value: 'Milk', cost: 20, qty: 3, count: 1, imgUrl: require('../../images/milo_img.jpg') },
    { id: '3', value: 'Soap', cost: 10, qty: 40, count: 1, imgUrl: require('../../images/milo_img.jpg') },
    { id: '4', value: 'Detergent', cost: 24, qty: 9, count: 1, imgUrl: require('../../images/milo_img.jpg') },
    { id: '6', value: 'Soap', cost: 15, qty: 12, count: 1, imgUrl: require('../../images/milo_img.jpg') },
    { id: '7', value: 'Detergent', cost: 17, qty: 7, count: 1, imgUrl: require('../../images/milo_img.jpg') }
];

export const HomeDashboard = [
    { id: '1', value: 'Sales', imgUrl: require('../../images/sales_add.png') },
    { id: '2', value: 'Purchases', imgUrl: require('../../images/basket_purchase.png') },
    { id: '3', value: 'Expenses', imgUrl: require('../../images/sales_add.png') },
    { id: '4', value: 'Savings', imgUrl: require('../../images/savings.png') },
    { id: '6', value: 'Track Credit', imgUrl: require('../../images/sales_add.png') },
    { id: '7', value: 'Loan', imgUrl: require('../../images/loan.png') }
];
export const InvoiceData = [
    {
        isExpanded: false,
        category_name: 'Todays Date',
        subcategory: [
            { name: 'Tito', amount: '2000', status: 'Paid', action: 'Resend', id: '1' },
            { name: 'Chiko', amount: '3000', status: 'Unpaid', action: 'Resend', id: '2' },
        ],
    },
    {
        isExpanded: false,
        category_name: 'Yesterdays Date',
        subcategory: [
            { name: 'Tilo', amount: '2000', status: 'Paid', action: 'Resend', id: '1' },
            { name: 'Kunle', amount: '3000', status: 'Unpaid', action: 'Resend', id: '2' },
        ],
    }
]
export const CONTENT = [
    {
        isExpanded: false,
        category_name: 'Item 1',
        subcategory: [
            { id: 1, val: 'Sub Cat 1' },
            { id: 3, val: 'Sub Cat 3' },
        ],
    },
    {
        isExpanded: false,
        category_name: 'Item 2',
        subcategory: [
            { id: 4, val: 'Sub Cat 4' },
            { id: 5, val: 'Sub Cat 5' },
        ],
    },
    {
        isExpanded: false,
        category_name: 'Item 3',
        subcategory: [
            { id: 7, val: 'Sub Cat 7' },
            { id: 9, val: 'Sub Cat 9' },
        ],
    },
    {
        isExpanded: false,
        category_name: 'Item 4',
        subcategory: [
            { id: 10, val: 'Sub Cat 10' },
            { id: 12, val: 'Sub Cat 2' },
        ],
    },
    {
        isExpanded: false,
        category_name: 'Item 5',
        subcategory: [
            { id: 13, val: 'Sub Cat 13' },
            { id: 15, val: 'Sub Cat 5' },
        ],
    },
    {
        isExpanded: false,
        category_name: 'Item 6',
        subcategory: [
            { id: 17, val: 'Sub Cat 17' },
            { id: 18, val: 'Sub Cat 8' },
        ],
    },
    {
        isExpanded: false,
        category_name: 'Item 7',
        subcategory: [{ id: 20, val: 'Sub Cat 20' }],
    },
    {
        isExpanded: false,
        category_name: 'Item 8',
        subcategory: [{ id: 22, val: 'Sub Cat 22' }],
    },
    {
        isExpanded: false,
        category_name: 'Item 9',
        subcategory: [
            { id: 26, val: 'Sub Cat 26' },
            { id: 27, val: 'Sub Cat 7' },
        ],
    },
    {
        isExpanded: false,
        category_name: 'Item 10',
        subcategory: [
            { id: 28, val: 'Sub Cat 28' },
            { id: 30, val: 'Sub Cat 0' },
        ],
    },
    {
        isExpanded: false,
        category_name: 'Item 11',
        subcategory: [{ id: 31, val: 'Sub Cat 31' }],
    },
    {
        isExpanded: false,
        category_name: 'Item 12',
        subcategory: [{ id: 34, val: 'Sub Cat 34' }],
    },
    {
        isExpanded: false,
        category_name: 'Item 13',
        subcategory: [
            { id: 38, val: 'Sub Cat 38' },
            { id: 39, val: 'Sub Cat 9' },
        ],
    },
    {
        isExpanded: false,
        category_name: 'Item 14',
        subcategory: [
            { id: 40, val: 'Sub Cat 40' },
            { id: 42, val: 'Sub Cat 2' },
        ],
    },
    {
        isExpanded: false,
        category_name: 'Item 15',
        subcategory: [
            { id: 43, val: 'Sub Cat 43' },
            { id: 44, val: 'Sub Cat 44' },
        ],
    },
];
export const PurchaseHomeDashboard = [ //Basic
    { id: '1', value: 'New Purchase', imgUrl: require('../../images/salesnew_menu.png'), action: 'np' },
    { id: '2', value: 'Purchase History', imgUrl: require('../../images/inventory_menu.png'), action: 'ph' },
    { id: '3', value: 'Record Previous Purchase', imgUrl: require('../../images/salesupdate_menu.png'), action: 'rpp' }
];
export const PurchaseHomeDashboardUserType = [ //profesional
    { id: '2', value: 'Purchase History', imgUrl: require('../../images/inventory_menu.png'), action: 'ph' },
    { id: '3', value: 'Record Previous Purchase', imgUrl: require('../../images/salesupdate_menu.png'), action: 'rpp' },
    { id: '4', value: 'Shopping List', imgUrl: require('../../images/saleshistory_menu.png'), action: 'sl' }
];
export const ExpenseHomeDashboard = [
    { id: '1', value: 'New Expense', imgUrl: require('../../images/salesnew_menu.png'), action: 'ne2' },
    { id: '2', value: 'Expense Type', imgUrl: require('../../images/inventory_menu.png'), action: 'et' },
    { id: '3', value: 'Expense History', imgUrl: require('../../images/inventory_menu.png'), action: 'eh' },
    { id: '4', value: 'Record Previous Expense', imgUrl: require('../../images/salesupdate_menu.png'), action: 'rpe' }

];
export const ExpenseHomeDashboardUserType = [
    { id: '1', value: 'New Expense', imgUrl: require('../../images/salesnew_menu.png'), action: 'ne' },
    { id: '2', value: 'Expense History', imgUrl: require('../../images/inventory_menu.png'), action: 'eh' },
    { id: '3', value: 'Record Previous Expense', imgUrl: require('../../images/salesupdate_menu.png'), action: 'rpe' }
];
export const SalesHomeDashboard = [
    { id: '1', value: 'New Sales', imgUrl: require('../../images/salesnew_menu.png'), action: 'ns' },
    { id: '2', value: 'Invoices', imgUrl: require('../../images/inventory_menu.png'), action: 'si' },
    { id: '3', value: 'Discount', imgUrl: require('../../images/inventory_menu.png'), action: 'di' },
    { id: '4', value: 'Sales Update', imgUrl: require('../../images/salesupdate_menu.png'), action: 'su' },
    { id: '5', value: 'Sales History', imgUrl: require('../../images/saleshistory_menu.png'), action: 'sh' },
    { id: '6', value: 'Track Credit', imgUrl: require('../../images/trackcredit_menu.png'), action: 'tc' },
    { id: '7', value: 'Record Previous Sales', imgUrl: require('../../images/previoussale_menu.png'), action: 'rs' },
];

export const InventoryHomeDashboard = [
    { id: '1', value: 'Finished Goods Inventory', imgUrl: require('../../images/category_menu.png'), action: 'NewProduct' },
    { id: '2', value: 'Products', imgUrl: require('../../images/inventory_menu.png'), action: 'Inventory' },
    { id: '3', value: 'Category', imgUrl: require('../../images/shoppinglist_menu.png'), action: 'Category' },
    { id: '4', value: 'Raw Materials Inventory', imgUrl: require('../../images/stockcount_menu.png'), action: 'StockCount' },
    { id: '5', value: 'Stock Count', imgUrl: require('../../images/shoppinglist_menu.png'), action: 'ShoppingList' },
    { id: '6', value: 'Inventory Reports', imgUrl: require('../../images/reports_menu.png'), action: 'Reports' }
];

export const UserDetails = () => {
    AsyncStorage.getItem('user_id').then(value => {
        return value
    },
    );
};

export const CustomerList = [
    {
        id: "1",
        title: "Beginning Android Programming",
        author: "J.F DiMarzio",
        authorbio: "About DiMarzio",
        publicationdate: "2017 by John Wiley & Sons",
        introduction: "This book is written to help start beginning Android developers ",
        cost: 25
    },
    {
        id: "2",
        title: "ES6 & Beyound",
        author: "Kyle Simpson",
        authorbio: "Kyle Simpson is a thorough pragmatist.",
        publicationdate: "2015-5-5",
        introduction: "This book is about shaking up your sense of understanding by exposing you ",
        cost: 35.99
    },

];
export const ProductData = [
    {
        id: 1,
        productName: 'Close Up'
    },
    {
        id: 2,
        productName: 'Maggi'
    }
];

export const StockData = [
    {
        id: 1,
        productId: 1,
        name: 'Red Close Up'
    },
    {
        id: 2,
        productId: 1,
        name: 'Blue Close Up'
    }
];
export const SalesData = [
    {
        title: "Monday 16th June 2021",
        Total: 20000
    },
    {
        title: "Tuesday 17th June 2021",
        Total: 20000
    },
    {
        title: "Wednesday 18th June 2021",
        Total: 20000
    },
    {
        title: "Thurday 19th June 2021",
        Total: 20000
    }
];
export const SalesDetailsData = [
    {
        title: "Milo",
        Amount: 2000
    },
    {
        title: "Milk",
        Amount: 2000
    },
    {
        title: "Sugar",
        Amount: 2000
    },
    {
        title: "Wine",
        Amount: 2000
    },
];
export const ExpenseData = [
    {
        title: "Today's Date",
        data: ["Titi", "Henry", "Lola"]
    },
    {
        title: "Yesterdays's Date",
        data: ["Kenneth", "Adamu", "Musa"]
    }
];
export const ShoppingProductList = [
    { id: '1', value: 'Milo', isChecked: false },
    { id: '2', value: 'Milk', isChecked: false },
    { id: '3', value: 'Detergent', isChecked: false }
];

export const FloatButtonActions = [
    {
        text: "Shelves",
        icon: <Icon
            name="book"
            size={10}
            color={'#fff'}
        />,
        name: "bt_shelves",
        position: 1
    },
    {
        text: "Stocks",
        icon: <Icon
            name="book"
            size={10}
            color={'#fff'}
        />,
        name: "bt_products",
        position: 2
    }
];
export const FloatButtonActionsSheleve = [
    {
        text: "Create Shelves",
        icon: <Icon
            name="book"
            size={10}
            color={'#fff'}
        />,
        name: "bt_shelves",
        position: 1
    }
];
export const TreeViewdata = [
    {
        name: "Cheese",
        value: "cheese-value"
    },
    {
        name: "Cheese",
        value: "cheese-value",
        items: [
            {
                name: "Spicy",
                value: "spicy-value"
            },
            {
                name: "Cheese",
                value: "cheese-value",
                items: [
                    {
                        name: "Spicy",
                        value: "spicy-value"
                    },
                    {
                        name: "Spicy",
                        value: "spicy-value"
                    }
                ]
            }
        ]
    }
];
