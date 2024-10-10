import React from 'react';
import * as XLSX from 'xlsx';
//@ts-ignore
import { saveAs } from 'file-saver';
import { Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';


const ExportExcel: React.FC<any> = ({ data }) => {
    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
        saveAs(blob, 'data.xlsx');
    };

    return (
        <div>
            <Button type='primary' icon={<UploadOutlined />} onClick={exportToExcel}>экспорт в exel</Button>
        </div>
    );
};

export default ExportExcel;
