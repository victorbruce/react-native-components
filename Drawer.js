import React from "react";
import { Block, Text, Button } from "expo-ui-kit";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

// import the screens
import Dashboard from "./screens/Dashboard";
import Messages from "./screens/Messages";
import Contact from "./screens/Contact";

// create stacks for each screen
// add header button to show the drawer

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Screens = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        headerTitle: null,
        headerLeft: () => (
          <Button
            primary
            padding
            marginHorizontal
            onPress={() => navigation.openDrawer()}
          >
            <Text white small>
              Menu
            </Text>
          </Button>
        )
      }}
    >
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="Contact" component={Contact} />
    </Stack.Navigator>
  );
};

// build custom drawer menu
const DrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}
      <DrawerItem
        label="Dashboard"
        onPress={() => props.navigation.navigate("Dashboard")}
      />
      <DrawerItem
        label="Messages"
        onPress={() => props.navigation.navigate("Messages")}
      />
      <DrawerItem
        label="Contact"
        onPress={() => props.navigation.navigate("Contact")}
      />
    </DrawerContentScrollView>
  );
};

export default () => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="Screens" component={Screens} />
    </Drawer.Navigator>
  );
};
