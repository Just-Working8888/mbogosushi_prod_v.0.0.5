import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type {RootState, AppDispatch} from '.'
import { useState, useEffect } from 'react';

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;



const useDebounce = (value: string, delay: number): [string, React.Dispatch<React.SetStateAction<string>>] => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return [debouncedValue, setDebouncedValue];
};

export default useDebounce;
