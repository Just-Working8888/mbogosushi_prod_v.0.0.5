// src/SearchComponent.tsx
import React, { useState, useEffect } from 'react';
import axios, { CancelTokenSource } from 'axios';
import { Input, Spin, Typography, Layout, Button } from 'antd';
import useDebounce, { useAppDispatch } from '../../store/hook';
import { fetchAdressesById } from '../../store/reducers/adressesReduser';
import { setAdressTitle } from '../../store/slices/adressesSlice';


const { Content } = Layout;
const { Text } = Typography;

const apiKey = '106f5dbb-6d37-473d-8978-22c83f9c5c01';
const viewpoint1 = [74.4677, 42.882]; // Верхний левый угол для города Бишкек
const viewpoint2 = [74.6177, 42.832]; // Нижний правый угол для города Бишкек

type SuggestResponse = {
    meta: {
        api_version: string;
        code: number;
        issue_date: string;
    };
    result: {
        items: {
            address_name: string;
            building_name?: string;
            full_name: string;
            id: string;
            name: string;
            point?: {
                lat: number;
                lon: number;
            };
            purpose_name?: string;
            type: string;
            address_comment?: string;
        }[];
        total: number;
    };
};

const fetchAddresses = async (query: string, cancelToken: CancelTokenSource): Promise<SuggestResponse> => {
    const url = `https://catalog.api.2gis.ru/3.0/suggests?key=${apiKey}&q=${encodeURIComponent(query)}&viewpoint1=${viewpoint1[0]},${viewpoint1[1]}&viewpoint2=${viewpoint2[0]},${viewpoint2[1]}&locale=ru_KG&type=street,branch,building,road,attraction,crossroad,station,station.metro,user_queries&fields=items.point,items.full_name,items.id`;
    const { data } = await axios.get<SuggestResponse>(url, { cancelToken: cancelToken.token });
    return data;
};

const SearchComponent: React.FC = () => {
    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebounce(query, 30);
    const [data, setData] = useState<SuggestResponse | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selected, setSelected] = useState<string | null>(null);
    console.log(setSelected);
    

    useEffect(() => {
        if (debouncedQuery.length > 2) {
            const cancelToken = axios.CancelToken.source();
            setIsLoading(true);
            setError(null);

            fetchAddresses(debouncedQuery, cancelToken)
                .then(response => {
                    setData(response);
                    setIsLoading(false);
                })
                .catch(error => {
                    if (axios.isCancel(error)) return;
                    setError('Ошибка загрузки данных');
                    setIsLoading(false);
                });

            return () => cancelToken.cancel();
        }
    }, [debouncedQuery, query]);

    const dispatch = useAppDispatch()
    function onClick(value: string, title: string) {

        setData(null)
        dispatch(fetchAdressesById({ itemId: +value }))
        dispatch(setAdressTitle(title))
        setQuery(title)

    }
    return (
        <Layout >
            <br />
            <p>Введите адрес</p>
            <br />
            <Content>
                <Input
                    placeholder="Поиск по местам в Бишкеке"

                    value={query}

                    onChange={(e) => setQuery(e.target.value)}

                />
                {isLoading && <Spin />}
                {error && <Text type="danger">{error}</Text>}
                {data &&


                    data?.result?.items.map((item) => (
                        <Button onClick={() => onClick(item.id, item?.full_name ? item?.full_name : item?.building_name ? item?.building_name : item?.address_name ? item?.address_name : item?.name ? item?.name : '')} style={{ width: '100%' }} key={item.id} value={item.id}>
                            {item?.full_name ? item?.full_name : item?.building_name ? item?.building_name : item?.address_name ? item?.address_name : item?.name ? item?.name : ''}
                            {/* <Tag>({item.point?.lat}, {item.point?.lon})</Tag> */}
                        </Button>
                    ))


                }
                {selected && <Text>Вы выбрали: {selected}</Text>}
            </Content>
        </Layout>
    );
};

export default SearchComponent;
