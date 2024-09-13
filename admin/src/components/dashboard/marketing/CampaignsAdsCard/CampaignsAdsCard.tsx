import {
  Alert,
  Button,
  CardProps,
  message,
  Space,
  Spin
} from 'antd';
import { Card, ReviewForm } from '../../../index.ts';
import { ReactNode, useState } from 'react';
import * as _ from 'lodash';
import DynamicTable from '../../../TestTable/TestTable.tsx';
import ExportExcel from '../../../ImportTable/ImportTable.tsx';
import { api } from '../../../../api/index.ts';


type Props = {
  data?: any[];
  loading?: boolean;
  error?: ReactNode;
  title?: string
  getRewue: Function
} & CardProps;

export const CampaignsAdsCard = ({ getRewue, loading, error, data, title, ...others }: Props) => {

  const [selectedItems, setSelectItems] = useState([])
  const [visible, setVisible] = useState(false);

  function handleDelete() {

    selectedItems.forEach((item: any) => {
      try {
        api.deleteReviewsById(item.id).then(() => {
          message.success('выбранные элементы удалены')
        }).then(() => {
          getRewue()
        })



      } catch (error) {
        message.error('Ошибка при удалении ')
      }
    })
  }
  return error ? (
    <Alert
      message="Error"
      description={error.toString()}
      type="error"
      showIcon
    />
  ) : (
    <>

      <Card
        title={title ? title : 'title'}
        extra={<Space>  <Button
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
        >
          Создать отзыв
        </Button><Button disabled={selectedItems.length > 0 ? false : true} danger onClick={handleDelete}>удалить</Button><ExportExcel data={selectedItems} /></Space >}

        {...others}
      >
        {loading ? <Spin /> : <DynamicTable setState={setSelectItems} state={selectedItems} data={data ? data : []} />}

      </Card >
      <ReviewForm
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      /></>
  );
};
