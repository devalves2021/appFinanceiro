import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import AuthProvider from './src/contexts/auth';
import Routes from './src/routes/index';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor="#131313" borStyle="light-content" />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

