import React, { useEffect, useRef, useState } from 'react';
import { load } from '@2gis/mapgl';
import { Directions } from '@2gis/mapgl-directions';
import icon from '../../assets/icon.svg';
import { gisapikey } from '../../service/2gisapikey';

const mockCourierData = [
    { latitude: 42.8746, longitude: 74.5698 }, // Начальная точка
    { latitude: 42.8755, longitude: 74.5705 }, // Точка промежуточная
    { latitude: 42.8770, longitude: 74.5720 }, // Точка промежуточная
    { latitude: 42.8800, longitude: 74.5750 }, // Точка промежуточная
    { latitude: 42.8830, longitude: 74.5790 }, // Конечная точка
];

const Map: React.FC = () => {
    const [map, setMap] = useState<any | null>(null);
    console.log(map);
    
    const markerRef = useRef<any | null>(null);
    const directionsRef = useRef<any | null>(null);

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

    const moveCourier = (path: Array<{ latitude: number; longitude: number }>, index: number = 0) => {
        if (index >= path.length - 1) return;

        const startCoords = [path[index].latitude, path[index].longitude] as [number, number];
        const endCoords = [path[index + 1].latitude, path[index + 1].longitude] as [number, number];

        animateMarker(startCoords, endCoords, 9000); // Анимация на 2 секунды

        setTimeout(() => {
            moveCourier(path, index + 1); // Переход к следующей точке
        }, 2000); // Время, соответствующее продолжительности анимации
    };

    useEffect(() => {
        let mapInstance: any;
        let directionsInstance: any;

        load().then((mapglAPI) => {
            const center = [74.5698, 42.8746]; // Координаты центра Бишкека
            const options = {
                center,
                zoom: 13,
                key: gisapikey,
            };
            mapInstance = new mapglAPI.Map('map-container', options);

            // Инициализация маркера курьера
            const initialCoords = mockCourierData[0];
            markerRef.current = new mapglAPI.Marker(mapInstance, {
                coordinates: [initialCoords.longitude, initialCoords.latitude],
                icon,
                label: {
                    text: `Курьер: Nurbolot \n`,
                    color: '#000',
                    fontSize: 12,
                    offset: [0, -30],
                },
            });

            // Инициализация Directions
            // Инициализация маршрута с Directions API
            directionsInstance = new Directions(mapInstance, {
                directionsApiKey: 'fd0b168d-047a-4bbc-8ccf-5c0f6144a84b', // Ваш Directions API ключ
            });

            // Построение маршрута между точками A и B
            directionsInstance.carRoute({
                points: [
                    [initialCoords.longitude, initialCoords.latitude],                    // [mockCourierData[1].longitude, mockCourierData[1].latitude],
                    // [mockCourierData[2].longitude, mockCourierData[2].latitude],
                    // [mockCourierData[3].longitude, mockCourierData[3].latitude],
                    [mockCourierData[4].longitude, mockCourierData[4].latitude],
                ],
            })
            setMap(mapInstance);

            // Запуск перемещения курьера по маршруту
            moveCourier(mockCourierData);
        });

        return () => {
            if (mapInstance) {
                mapInstance.destroy();
            }
            if (markerRef.current) {
                markerRef.current.destroy();
            }
            if (directionsRef.current) {
                directionsRef.current.destroy();
            }
        };
    }, []);

    return (
        <div id="map-container" style={{ width: '100%', height: '500px' }} />
    );
};

export default Map;
