import React, {Component} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCocktail, faChild } from '@fortawesome/free-solid-svg-icons'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';

import Identity from "../components/identity"
import Cocktails from "../components/cocktails"


const Tab = createBottomTabNavigator()
const Stack = createStackNavigator();


const topBarOptionsCocktails = () => {
    return (
        <Stack.Navigator initialRouteName="Cocktails">
            <Stack.Screen
                name="Cocktails"
                component={Cocktails}
                options={{ title: 'Cocktails' }}
            />
        </Stack.Navigator>
    )
}

const topBarOptionsIdentity = () => {
    return (
        <Stack.Navigator initialRouteName="Identity">
            <Stack.Screen
                name="Identity"
                component={Identity}
                options={{ title: 'Identity' }}
            />
        </Stack.Navigator>
    )
}

const bottomBarOptions = (label, icon) => {
    return (
        {
            tabBarLabel: label,
            tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcon icon={icon} size={size} color={color} />
            )
        }
    )
}

export default class TabNavigation extends Component {
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator tabBarOptions={{ labelStyle: { paddingBottom: 4 } }}>
                    <Tab.Screen 
                        name="Identity" 
                        component={topBarOptionsIdentity}
                        options={bottomBarOptions('Identity', faChild)}
                    />

                    <Tab.Screen 
                        name="Cocktails"
                        component={topBarOptionsCocktails}
                        options={bottomBarOptions('Cocktails', faCocktail)}
                    />

                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}
