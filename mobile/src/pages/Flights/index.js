import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import logo from '../../assets/logo.png';

import styles from './styles';

export default function Flights() {
    const [flights, setFlights] = useState([]);
    const [total, setTotal] = useState(0);
    const navigation = useNavigation();

    function navigateToDetail() {
        navigation.navigate('Detail');
    }

    async function loadFlights() {
        const response = await api.get('flights');

        setFlights(response.data);
        setTotal(response.headers['x-total-count']);
    }


    useEffect(() => {
        loadFlights();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} voos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos voos abaixo e boa viagem.</Text>

            <FlatList
                style={styles.flightList}
                data={flights}
                keyExtractor={flight => String(flight.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item: flight }) => (
                    <View style={styles.flight}>
                        <Text style={styles.flightProperty}>AIRLINE:</Text>
                        <Text style={styles.flightValue}>{flight.name}</Text>

                        <Text style={styles.flightProperty}>DESTINO:</Text>
                        <Text style={styles.flightValue}>{flight.destiny}</Text>

                        <Text style={styles.flightProperty}>DATA/HORA:</Text>
                        <Text style={styles.flightValue}>{flight.data} - {flight.hour}</Text>

                        <Text style={styles.flightProperty}>PREÇO:</Text>
                        <Text style={styles.flightValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(flight.value)}</Text>

                        <TouchableOpacity style={styles.detailsButton} onPress={navigateToDetail}>
                            <Text style={styles.detailsButtonText}>Entrar em contato</Text>
                            <Feather name="arrow-right" size={16} color='#17333C' />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}