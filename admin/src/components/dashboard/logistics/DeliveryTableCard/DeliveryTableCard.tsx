import { Alert, Button, CardProps, message, Space } from 'antd';
import { ReactNode, useState } from 'react';
import { Card, VisitForm } from '../../../index.ts';
import DynamicTable from '../../../TestTable/TestTable.tsx';
import ExportExcel from '../../../ImportTable/ImportTable.tsx';


type Props = {
  data?: any;
  loading?: boolean;
  error?: ReactNode;
} & CardProps;

export const DeliveryTableCard = ({
  data,
  loading,
  error,
  ...others
}: Props) => {

  const [selectedItems, setSelectItems] = useState([])
  const [state, setState] = useState(false)
  return (
    <Card
      title="Столы"
      extra={<Space>   <Button
        type="primary"
        onClick={() => {
          setState(true);
        }}
      >
        Создать запись
      </Button><Button disabled={selectedItems.length > 0 ? false : true} danger onClick={() => message.success('элемент удален')}>удалить</Button><ExportExcel data={selectedItems} /></Space>}
      {...others}
    >
      {error ? (
        <Alert
          message="Error"
          description={error.toString()}
          type="error"
          showIcon
        />
      ) : (
        <DynamicTable
          data={
            data
          }
          setState={setSelectItems}
          state={selectedItems}
        />
      )}
      <VisitForm
        visible={state}
        onCancel={() => {
          setState(false);
        }}
      />
    </Card>
  );
};
