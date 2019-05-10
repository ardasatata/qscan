import {createStackNavigator,createAppContainer,createBottomTabNavigator} from 'react-navigation';
import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';

import {qscan} from './views/qscan'
import {productDetail} from './views/productDetail'
import {searchProduct} from './views/searchProduct'



const MainStack = createStackNavigator({
    Main: {
        screen: qscan,
        navigationOptions : {
            title: 'Qscan',
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,

            }
        }
    },
    Detail: {
        screen: productDetail,
        navigationOptions : {
            title: 'Product Info',
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
                backgroundColor: '#fcc230',
            },
            headerTitleStyle: {
                color: 'black'
            },
            headerBackTitleStyle: {
                color: 'black',
            },
        }
    },
});

const SearchStack = createStackNavigator({
    Search: {
        screen: searchProduct,
        navigationOptions : {
            title: 'Search Product',
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
            }
        }
    },
});

const BottomTabNavigator = createBottomTabNavigator({
    Scan: {
        screen: MainStack,
        navigationOptions : {
            tabBarIcon: <Icon name="qrcode" size={28} />,
        },
    },
    Search: {
        screen: SearchStack,
        navigationOptions : {
            tabBarIcon: <Icon name="search" size={24} />,
        }
    },
}, {
    tabBarOptions : {
        activeTintColor: '#fcae0f',
        labelStyle: {
            fontSize: 12,
        },
        style: {
            backgroundColor: '#ffffff',
        },
    }

});

const Router = createAppContainer(BottomTabNavigator);

export default Router;