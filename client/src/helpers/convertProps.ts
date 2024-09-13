import { windowState } from "../store/slices/windowSlice";

export function formatParams(params: windowState): string {
    const { menuprops } = params;
    const { category, offset, limit } = menuprops
    const queryParams = [];

    if (category !== 0) {
        queryParams.push(`category=${category}`);
    }
    if (offset > 1) {
        queryParams.push(`offset=${offset}`);
    }
    queryParams.push(`limit=${limit}`);

    return queryParams.join('&');
}