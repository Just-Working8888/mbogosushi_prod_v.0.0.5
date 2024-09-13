import { getCookie } from "../../helpers/cookies";
import { FC, ReactElement } from "react";

interface ProtectedProps {
    children: ReactElement;
    fallback: ReactElement;
}

const Protected: FC<ProtectedProps> = ({ children, fallback }) => {
    const accessToken = getCookie('access_token');

    if (!accessToken) {
        return fallback
    }

    return <>{children}</>;
};

export default Protected;
