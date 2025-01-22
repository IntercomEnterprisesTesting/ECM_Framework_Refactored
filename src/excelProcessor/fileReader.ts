/* eslint-disable no-param-reassign */
import * as xlsx from 'xlsx';

class FileReader {
    readSheets(filePath: string): { [key: string]: any[] } {
      const workbook = xlsx.readFile(filePath);
      const sheetNames = workbook.SheetNames;
      return sheetNames.reduce((sheets, name) => {
        sheets[name] = xlsx.utils.sheet_to_json(workbook.Sheets[name]);
        return sheets;
      }, {} as { [key: string]: any[] });
    }
  }
