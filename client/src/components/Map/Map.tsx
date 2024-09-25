/// <reference types="@types/google.maps" />

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { setAdressTitle } from '../../store/slices/adressesSlice';
import { createDelivary } from '../../store/reducers/delivaryReduser';

// Типы для состояния и координат
interface PointState {
    adressPoint: [number, number];
}

const MapTest: React.FC = () => {
    const points = useAppSelector((state: { point: PointState }) => state.point);
    const [map, setMap] = useState<any | null>(null);
    const markerRef = React.useRef<any | null>(null);
    const dispatch = useAppDispatch();
    
    // Функция для обратного геокодирования
    const reverseGeocode = async (lngLat: [number, number]) => {
        const [longitude, latitude] = lngLat;
        const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Замените на ваш API-ключ Google Maps
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const address = data.results[0].formatted_address;
                console.log('Address:', address);
                dispatch(setAdressTitle(address));
                return address;
            } else {
                console.log('Address not found');
                return 'Address not found';
            }
        } catch (error) {
            console.error('Error during reverse geocoding:', error);
            return 'Error during reverse geocoding';
        }
    };

    useEffect(() => {
        const initMap = () => {
            const mapOptions = {
                center: { lat: 42.878941, lng: 74.593379 }, // Координаты центра карты
                zoom: 13,
            };

            const mapInstance = new google.maps.Map(document.getElementById('map-container') as HTMLElement, mapOptions);

            mapInstance.addListener('click', async (event: any) => {
                const lngLat: [number, number] = [event.latLng.lng(), event.latLng.lat()];
                const address = await reverseGeocode(lngLat);
                
                dispatch(setAdressTitle(address));
                dispatch(createDelivary({
                    data: {
                        lon: `${lngLat[0]}`,
                        lat: `${lngLat[1]}`
                    }
                }));

                // Удалить предыдущий маркер, если он существует
                if (markerRef.current) {
                    markerRef.current.setMap(null);
                }

                // Добавить новый маркер
                const newMarker = new google.maps.Marker({
                    position: { lat: lngLat[1], lng: lngLat[0] },
                    map: mapInstance,
                });

                markerRef.current = newMarker;

                mapInstance.setCenter({ lat: lngLat[1], lng: lngLat[0] });
                mapInstance.setZoom(17);
            });

            setMap(mapInstance);
        };

        if (!map) {
            initMap();
        }

        return () => {
            if (map && markerRef.current) {
                markerRef.current.setMap(null);
            }
        };
    }, [map, points]);

    useEffect(() => {
        if (map && points && points.adressPoint) {
            const [lon, lat] = points.adressPoint;
            map.setCenter({ lat, lng: lon });
            map.setZoom(17);

            // Удалить предыдущий маркер, если он существует
            if (markerRef.current) {
                markerRef.current.setMap(null);
            }

            // Добавить новый маркер на новые координаты
            const newMarker = new google.maps.Marker({
                position: { lat, lng: lon },
                map,
            });

            markerRef.current = newMarker;
        }
    }, [map, points]);

    return (
        <div>
            <div id="map-container" style={{ height: '500px', width: '100%' }}></div>
        </div>
    );
}

export default MapTest;
