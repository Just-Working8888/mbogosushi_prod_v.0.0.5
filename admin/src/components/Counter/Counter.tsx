import React, { useState } from 'react';
import { Button, InputNumber, Space } from 'antd';

interface CounterProps {
  initialCount: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({ initialCount, onChange }) => {
  const [count, setCount] = useState<number>(initialCount);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    onChange(newCount);
  };

  const decrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    onChange(newCount);
  };

  const handleChange = (value: number | null) => {
    if (value !== null) {
      setCount(value);
      onChange(value);
    }
  };

  return (
    <Space direction="vertical" align="center">
      <Space>
        <Button type="primary" onClick={increment}>
          +
        </Button>
        <InputNumber min={0} value={count} onChange={handleChange} />
        <Button onClick={decrement}>
          -
        </Button>
      </Space>
    </Space>
  );
};

export default Counter;
