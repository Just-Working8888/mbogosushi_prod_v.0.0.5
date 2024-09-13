import React, { useState } from 'react';
import { Card as AntdCard, CardProps, Descriptions, Modal } from 'antd';


type Props = {
  billing: any;
} & CardProps;

export const ProjectsCard: React.FC<Props> = (props) => {
  const { billing, ...cardProps } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (

    <>
      <AntdCard onClick={showModal} style={{ width: 'calc(33% - 16px)' }} bordered hoverable={true} {...cardProps}>
        <Descriptions column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
          {
            Object.entries(billing).slice(0, 5).map(([key, value]) => (
              <Descriptions.Item key={key} label={key}>
                {value ? value : '' as any}
              </Descriptions.Item>
            ))
          }
        </Descriptions>
      </AntdCard>
      <Modal width={1000} title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Descriptions column={{ xxl: 2, xl: 2, lg: 1, md: 1, sm: 1, xs: 1 }}>
          {
            Object.entries(billing).map(([key, value]) => (
              <Descriptions.Item key={key} label={key}>
                {value ? value : '' as any}
              </Descriptions.Item>
            ))
          }
        </Descriptions>
      </Modal></>
  );
};




