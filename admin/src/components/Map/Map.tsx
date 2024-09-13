import React, { useEffect, useRef, useState } from 'react';
import { load } from '@2gis/mapgl';
import icon from '../../assets/icon.svg';
import io from 'socket.io-client';
import { gisapikey } from '../../service/2gisapikey';

const socket = io('http://192.168.1.112:3000/', {
  transports: ['websocket'],
  path: '/location',
});

const Map: React.FC = () => {
    const [map, setMap] = useState<any | null>(null);
    console.log(map);
    
    const markerRef = useRef<any | null>(null);
    const positionRef = useRef<{ latitude: number, longitude: number } | null>(null);

    const animateMarker = (startCoords: [number, number], endCoords: [number, number], duration: number) => {
        const startTime = performance.now();

        const step = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);

            const lat = startCoords[0] + (endCoords[0] - startCoords[0]) * progress;
            const lng = startCoords[1] + (endCoords[1] - startCoords[1]) * progress;

            if (markerRef.current) {
                markerRef.current.setCoordinates([lng, lat]);
            }

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    useEffect(() => {
        let mapInstance: any;

        load().then((mapglAPI) => {
            const center = [74.5698, 42.8746]; // Координаты центра Бишкека
            const options = {
                center: center,
                zoom: 13,
                key: gisapikey
            };
            mapInstance = new mapglAPI.Map('map-container', options);

            socket.on('connect', () => {
                console.log('Connected to WebSocket server');
            });

            socket.on('receiveLocation', (data) => {
                console.log('Received data:', data);
                const { latitude, longitude, username } = data;

                if (mapInstance) {
                    const currentCoords: any = positionRef.current
                        ? [positionRef.current.latitude, positionRef.current.longitude]
                        : [latitude, longitude];

                    positionRef.current = { latitude, longitude };

                    if (markerRef.current) {
                        animateMarker(currentCoords, [latitude, longitude], 1000);
                    } else {
                        const newMarker = new mapglAPI.Marker(mapInstance, {
                            coordinates: [longitude, latitude],
                            icon,
                            label: {
                                text: `Курьер: ${username} \n`,
                                color: '#000', // цвет текста
                                fontSize: 12, // размер шрифта
                                offset: [0, -30], // смещение текста
                            },
                        });
                        markerRef.current = newMarker;
                    }

                    mapInstance.setCenter([longitude, latitude]);
                    mapInstance.setZoom(17);
                }
            });

            socket.on('disconnect', () => {
                console.log('Disconnected from WebSocket server');
            });

            setMap(mapInstance);
        });

        return () => {
            if (mapInstance) {
                mapInstance.destroy();
            }
            if (markerRef.current) {
                markerRef.current.destroy();
            }
            socket.disconnect();
        };
    }, []);

    return (
        <div id="map-container" style={{ width: '100%', height: '500px' }} />
    );
};

export default Map;
