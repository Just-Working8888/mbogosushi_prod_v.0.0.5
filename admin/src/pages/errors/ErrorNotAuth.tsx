import { Button, Result, Typography } from 'antd';
import { BackBtn, RefreshBtn } from '../../components';
import { Link } from 'react-router-dom';

const { Paragraph, Text } = Typography;

export const ErrorNotAuth = () => {


    return (
        <Result
            status="error"
            title="Oops!"
            subTitle="Sorry, an unexpected error has occurred."
            extra={[<BackBtn type="primary" />, <RefreshBtn />]}
        >
            <div className="desc">
                <Paragraph>
                    <Text
                        strong
                        style={{
                            fontSize: 16,
                        }}
                    >
                        Вы не авторизованы пожайлуста автаризуйтесь
                        <Link to={'/auth/signin'}>   <Button>Войти</Button></Link>
                    </Text>
                </Paragraph>

            </div>
        </Result>
    );
};
