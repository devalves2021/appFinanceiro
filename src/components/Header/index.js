import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Container, ButtonMenu } from './styles';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


export default function Header() {
    const navigation = useNavigation();

    return (
        <Container>
            <ButtonMenu onPress={() => navigation.toggleDrawer()}>
                <Icon name="menu" color="#fff" size={30} />
            </ButtonMenu>
        </Container>
    );
}