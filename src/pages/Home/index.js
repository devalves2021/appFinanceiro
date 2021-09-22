import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, Alert, TouchableOpacity, Platform } from 'react-native';
import Header from '../../components/Header';
import { AuthContext } from '../../contexts/auth';
import { Background, Container, Nome, Saldo, Title, List, Area } from './styles';
import HistoricoList from '../../components/HistoricoList';
import firebase from '../../services/firebaseConnection';
import { format, isPast } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from '../../components/DatePicker';

export default function Home() {
    const { user } = useContext(AuthContext);
    const [saldo, setSaldo] = useState(0);
    const [historico, setHistorico] = useState([]);
    const uid = user && user.uid;

    const [newDate, setNewDate] = useState(new Date());
    const [show, setShow] = useState(false);

    useEffect(() => {
        async function loadList() {

            await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
                setSaldo(snapshot.val().saldo);
            });

            await firebase.database().ref('historico')
                .child(uid)
                .limitToLast(10).on('value', (snapshot) => {
                    setHistorico([]);

                    snapshot.forEach((childItem) => {
                        let list = {
                            key: childItem.key,
                            tipo: childItem.val().tipo,
                            valor: childItem.val().valor,
                            date: childItem.val().date,
                        };

                        setHistorico(oldArray => [...oldArray, list].reverse());
                    })
                })
        }

        loadList();

    }, []);

    async function handleDeleteSucess(data) {
        await firebase.database().ref('historico')
            .child(uid).child(data.key).remove()
            .then(async () => {
                let saldoAtual = saldo;
                data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor);

                await firebase.database().ref('users').child(uid)
                    .child('saldo').set(saldoAtual);
            })
            .catch((error) => {
                console.log(error);
            })
    }


    function handleDelete(data) {
        if (isPast(new Date(data.date))) {
            alert('Você não pode excluir um registro antigo!');
            return;
        }

        Alert.alert(
            'Cuidado Atenção',
            `Você deseja excluir esta ${data.tipo} - Valor ${data.valor}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Excluir',
                    onPress: () => handleDeleteSucess(data)
                }
            ]
        )


    }


    function handleShowPicker() {
        setShow(true);
    }
    function handleClose() {
        setShow(false);
    }

    const onChange = (date) => {
        setNewDate(date);
        console.log(date);
    }

    return (
        <Background>
            <Header />
            <Container>
                <Nome>{user && user.nome}</Nome>
                <Saldo>R$ {saldo.toFixed(2)}</Saldo>
            </Container>
            <Area>
                <Title>Ultimas movimentações</Title>
            </Area>
            <List
                showsVerticalScrollIndicator={false}
                data={historico}
                KeyExtractor={item => item.key}
                renderItem={({ item }) => (<HistoricoList data={item} deleteItem={handleDelete} />)}
            />
        </Background>
    );
}