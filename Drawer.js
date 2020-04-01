import React, { useState } from "react";
import { StyleSheet, Image } from "react-native";
import { Block, Text, Button } from "expo-ui-kit";
import { Feather, AntDesign } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem
} from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

// import the screens
import Dashboard from "./screens/Dashboard";
import Messages from "./screens/Messages";
import Contact from "./screens/Contact";
import Animated from "react-native-reanimated";

// create stacks for each screen
// add header button to show the drawer

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const Screens = ({ navigation, style }) => {
  return (
    <Animated.View style={[styles.stack, style]}>
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTitle: null,
          headerLeft: () => (
            <Button
              transparent
              padding
              marginHorizontal
              onPress={() => navigation.openDrawer()}
            >
              <Feather name="menu" size={16} />
            </Button>
          )
        }}
      >
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Messages" component={Messages} />
        <Stack.Screen name="Contact" component={Contact} />
      </Stack.Navigator>
    </Animated.View>
  );
};

// build custom drawer menu
// style the drawer

const DrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <Block>
        {/* add avatar */}
        <Block flex={0.4} margin={20} bottom>
          <Image
            source={require("./assets/logo.png")}
            style={{ width: 60, height: 60 }}
            resizeMode="center"
          />
          <Text title>Expenze</Text>
          <Text size={9}>contact@expenze.com</Text>
        </Block>
        {/* add icons to items */}
        <DrawerItem
          label="Dashboard"
          labelStyle={{ marginLeft: -16 }}
          onPress={() => props.navigation.navigate("Dashboard")}
          icon={() => <AntDesign name="dashboard" size={16} />}
        />
        <DrawerItem
          label="Messages"
          labelStyle={{ marginLeft: -16 }}
          onPress={() => props.navigation.navigate("Messages")}
          icon={() => <AntDesign name="message1" size={16} />}
        />
        <DrawerItem
          label="Contact"
          labelStyle={{ marginLeft: -16 }}
          onPress={() => props.navigation.navigate("Contact")}
          icon={() => <AntDesign name="phone" size={16} />}
        />
      </Block>
    </DrawerContentScrollView>
  );
};

export default () => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  // create animation for screen scaling
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8]
  });

  const screenStyles = { transform: [{ scale }] };

  return (
    <Drawer.Navigator
      // the drawer screen should be animated slide
      drawerType="slide"
      overlayColor="transparent"
      initialRouteName="Dashboard"
      drawerContentOptions={{
        activeBackgroundColor: "transparent",
        activeTintColor: "green",
        inactiveTintColor: "green"
      }}
      // set the scene background to transparent
      sceneContainerStyle={{ backgroundColor: "transparent" }}
    
      drawerContent={props => {
        setProgress(props.progress);
        return <DrawerContent {...props} />;
      }}
    >
      <Drawer.Screen name="Screens">
        {props => <Screens {...props} style={screenStyles} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  stack: {
    flex: 1
  }
});
