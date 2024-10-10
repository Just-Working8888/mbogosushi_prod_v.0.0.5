// IslandComponent.tsx
import React, { useState } from 'react';
import { Button, Select, Upload, message, Collapse, Space, ColorPicker, Flex } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ColorsForm from '../SettingsForm/ColorsForm';

const { Option } = Select;
const { Panel } = Collapse;

interface IslandComponentProps {
    onColorChange?: (color: string) => void;
    onLogoChange?: (file: File) => void;
}

const IslandComponent: React.FC<IslandComponentProps> = ({ onColorChange, onLogoChange }) => {
    const [bgColor, setBgColor] = useState('#fff');

    const handleColorChange = (color: string) => {
        setBgColor(color);
        if (onColorChange) {
            onColorChange(color);
        }
    };

    const handleLogoChange = (file: any) => {
        const isValidFileType = file.type === 'image/png' || file.type === 'image/jpeg';
        if (!isValidFileType) {
            message.error('Вы можете загрузить только PNG или JPEG!');
            return false;
        }

        if (onLogoChange) {
            onLogoChange(file.originFileObj);
        }
        return true;
    };

    return (
        <div className='sexulauiostrov' style={{ backgroundColor: bgColor }}>
            {/* Основной контент, который будет виден при наведении */}
            <div className="hidden-content">
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Flex>
                        <ColorPicker
                            defaultValue="#1677ff"
                        />
                        <h3>    выберите Основной цвет</h3>
                    </Flex>
                    <Flex>
                        <ColorPicker
                            defaultValue="#1677ff"
                        />
                        <h3>    выберите Основной цвет</h3>
                    </Flex>    <Flex>
                        <ColorPicker
                            defaultValue="#1677ff"
                        />
                        <h3>    выберите Основной цвет</h3>
                    </Flex>
                    <Upload
                        beforeUpload={handleLogoChange}
                        showUploadList={false}
                    >
                        <Button icon={<UploadOutlined />}>Загрузить лого</Button>
                    </Upload>
                    <Collapse defaultActiveKey={['1']}>
                        <Panel header="Шаблоны" key="1">
                            <div className="template-list">
                                <Button type="link">Шаблон 1</Button>
                                <Button type="link">Шаблон 2</Button>
                                <Button type="link">Шаблон 3</Button>
                            </div>
                        </Panel>
                    </Collapse>
                </Space>
                <ColorsForm />
            </div>
        </div>
    );
};

export default IslandComponent;
