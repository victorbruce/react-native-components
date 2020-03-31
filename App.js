import React from "react";
import { Block, Text } from "expo-ui-kit";
import { NavigationContainer } from "@react-navigation/native";

import Drawer from './Drawer';

export default function App() {
  return (
    <NavigationContainer>
     <Drawer />
    </NavigationContainer>
  );
}

