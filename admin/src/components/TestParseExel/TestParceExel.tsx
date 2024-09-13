import React, { useState } from 'react';
import * as XLSX from 'xlsx';

interface ExcelData {
    [key: string]: string | number;
}

const TestParceExel: React.FC = () => {
    const [data, setData] = useState<ExcelData[]>([]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const binaryStr = e.target?.result;
                if (binaryStr) {
                    const workbook = XLSX.read(binaryStr, { type: 'binary' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json<ExcelData>(worksheet);
                    setData(jsonData);
                }
            };
            reader.readAsBinaryString(file);
        }
    };

    return (
        <div>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
            <div>
                <h3>Uploaded Data</h3>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        </div>
    );
};

export default TestParceExel;
