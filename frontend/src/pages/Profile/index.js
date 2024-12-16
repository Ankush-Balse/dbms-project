import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.svg';

export default function Profile() {
    const [flights, setFlights] = useState([]);

    const airlineId = localStorage.getItem('airlineId');

    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: airlineId,
            }
        }).then(response => {
            setFlights(response.data);
        })
    }, [airlineId]);

    async function handleDeleteFlight(id) {
        try {
            await api.delete(`flights/${id}`, {
                headers: {
                    Authorization: airlineId,
                }
            });

            setFlights(flights.filter(flight => flight.id !== id));
        } catch (err) {
            alert('Error deleting flight, please try again.');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="flights-container">
            <header>
                <img src={logo} alt="SomeName" />
                
                <Link className="button" to="/flights/new">Register a new flight</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={24} color="#ffffff" />
                </button>
            </header>

            <h1>Available Flights</h1>

            <ul>
                {flights.map(flight => (
                    <li key={flight.id}>
                        <strong>DESTINATION:</strong>
                        <p>{flight.destiny}</p>

                        <strong>DATE/TIME:</strong>
                        <p>{flight.data} - {flight.hour}</p>

                        <strong>PRICE:</strong>
                        <p>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(flight.value)}</p>

                        <button onClick={() => handleDeleteFlight(flight.id)} type="button">
                            <FiTrash2 size={20} color="#17333C" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
