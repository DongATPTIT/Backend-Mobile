import { Injectable } from "@nestjs/common";
import { createObjectCsvWriter } from "csv-writer";
import * as fs from 'fs';
@Injectable()
export class CSVService {
    async checkIfFileOrDirectoryExists(path: string): Promise<boolean> {
        return await fs.existsSync(path);
    }

    async createFileCSV(
        path: string,
        fields: string[],
        data: any
    ): Promise<void> {
        if (!this.checkIfFileOrDirectoryExists(path)) {
            fs.mkdirSync(path);
        }
        const csvWriters = createObjectCsvWriter({
            path: path,
            header: fields.map(field => ({ id: field, title: field }))
        });
        const formattedData = data.map(record => {
            const obj = {};
            record.forEach(item => {
                const [key, value] = item.split(': ').map(str => str.trim());
                obj[key] = value;
            });
            return obj;
        });
        return await csvWriters.writeRecords(formattedData)
    }

    dataTranformCSV(dataCSV: Object[], optionalFields: string[]) {
        return dataCSV.map((data: Object) => {
            return optionalFields.map(field => `${field}: ${data[field]}`);
        });
    }
}