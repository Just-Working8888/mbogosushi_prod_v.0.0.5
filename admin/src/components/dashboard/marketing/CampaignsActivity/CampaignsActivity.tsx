import { Button, CardProps, Popover } from 'antd';
import { QuestionOutlined } from '@ant-design/icons';
import { Card } from '../../../index.ts';


type Props = CardProps;

export const CampaignsActivity = ({ ...others }: Props) => {
  return (
    <Card
      title="Campaign activity"
      extra={
        <Popover content="Check the campaign activity schedule">
          <Button icon={<QuestionOutlined />} type="text" />
        </Popover>
      }
      {...others}
    >
      test
    </Card>
  );
};
