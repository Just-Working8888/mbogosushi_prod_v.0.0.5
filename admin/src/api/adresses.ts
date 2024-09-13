import axios, { CancelToken } from "axios";

const getAdresses = (query: string, sourceToken?: CancelToken) => {
    const apiKey = '3ccce139-b395-41a9-8adf-d57b6b23f0dd';
    const viewpoint1 = [69.205, 44.537]; // Верхний левый угол для всего Кыргызстана
    const viewpoint2 = [80.275, 39.197];
    const url = `https://catalog.api.2gis.ru/3.0/suggests?key=${apiKey}&q=${encodeURIComponent(query)}&viewpoint1=${viewpoint1[0]},${viewpoint1[1]}&viewpoint2=${viewpoint2[0]},${viewpoint2[1]}&locale=ru_KG&type=adm_div.region,adm_div.district_area,adm_div.city,adm_div.settlement,adm_div.district,adm_div.living_area,adm_div.division,adm_div.place,street,branch,building,road,attraction,crossroad,route,route_type,station,station.metro,user_queries,attribute,rubric,meta_rubric,org,special,coordinates,kilometer_road_sign&fields=items.point,items.full_name,items.id`;
    return axios.post<any>(url, { "personal_records": [{ "type": "history", "count": 1, "last_used": 1718123900299, "record": { "id": "70000001088142936", "type": "branch" } }, { "type": "history", "count": 2, "last_used": 1718123909179, "record": { "id": "70030076147439881", "type": "street" } }, { "type": "history", "count": 1, "last_used": 1718186217979, "record": { "id": "15763260120760360", "type": "adm_div.living_area" } }, { "type": "history", "count": 1, "last_used": 1718192218943, "record": { "id": "15763384674812283", "type": "station.stop" } }, { "type": "history", "count": 1, "last_used": 1718193039402, "record": { "id": "15763384674812041", "type": "station.stop" } }, { "type": "history", "count": 2, "last_used": 1718193481236, "record": { "id": "70030076155904949", "type": "station.stop" } }, { "type": "history", "count": 2, "last_used": 1718193719626, "record": { "id": "70000001066015479", "type": "branch" } }, { "type": "history", "count": 4, "last_used": 1718203342723, "record": { "id": "70030076149688704", "type": "building" } }, { "type": "history", "count": 3, "last_used": 1718206673916, "record": { "id": "70030076150233463", "type": "building" } }, { "type": "history", "count": 3, "last_used": 1718206695659, "record": { "id": "70030076145268496", "type": "adm_div.city" } }, { "type": "history", "count": 1, "last_used": 1718206712500, "record": { "id": "15763221466054725", "type": "adm_div.city" } }, { "type": "history", "count": 1, "last_used": 1718206735404, "record": { "id": "15763285890564133", "type": "adm_div.place" } }, { "type": "history", "count": 1, "last_used": 1718207252722, "record": { "id": "15763337430174283", "type": "street" } }, { "type": "history", "count": 1, "last_used": 1718207269838, "record": { "id": "15763234351134294", "type": "building" } }] }, { cancelToken: sourceToken })
};
const getAdressesById = (itemId: number, sourceToken?: CancelToken) => {
    const apiKey = '3ccce139-b395-41a9-8adf-d57b6b23f0dd';
    const url = `https://catalog.api.2gis.ru/3.0/items/byid?id=${itemId}&key=${apiKey}&fields=items.point`;
    return axios.get<any>(url, { cancelToken: sourceToken })
};
const endpoints = {
    getAdresses,
    getAdressesById
};
export default endpoints;
