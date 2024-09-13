//@ts-ignore
import { v4 as uuidv4 } from 'uuid';

export function setSessionKey() {
    const sessionKey = uuidv4();
    const storedSessionKey = localStorage.getItem('session_key');
    if (storedSessionKey) {
        return sessionKey
    }
    localStorage.setItem('session_key', sessionKey)
    return sessionKey
}