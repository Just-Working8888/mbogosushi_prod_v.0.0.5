import { Avatar, Table, TableProps, Typography } from 'antd';


const COLUMNS = [
  {
    title: 'Товар',
    dataIndex: 'iiko_image',
    key: 'c_name',
    render: (iiko_image: string) => (
      <Avatar size={64} shape="square"  src={iiko_image}/>
    ),
  },
  {
    title: '',
    dataIndex: 'product_title',
    key: 'product_title',
  
  },
  {
    title: 'Количество',
    dataIndex: 'total_quantity',
    key: 'c_name',
  
  },
  {
    title: 'Процент',
    dataIndex: 'percentage',
    key: 'client_amount',
    render: (percentage: any) => <Typography.Text>{parseFloat(percentage.toFixed(2))}%</Typography.Text>,
  },
];

type Props = {
  data: any[];
} & TableProps<any>;

export const ClientsTable = ({ data, ...others }: Props) => (
  <Table
    dataSource={data}
    columns={COLUMNS}
    key="client_table"
    size="middle"
    className="overflow-scroll"
    {...others}
  />
);
