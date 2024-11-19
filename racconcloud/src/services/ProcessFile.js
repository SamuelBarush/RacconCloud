import Papa from 'papaparse';
import * as XLSX from 'xlsx';

/**
 * Lee un archivo CSV o Excel y lo convierte en un JSON.
 * @param {File} file - El archivo a procesar.
 * @returns {Promise<Object[]>} - Promesa que resuelve a un array de objetos JSON.
 */
export async function processFile(file) {
  const fileType = file.name.split('.').pop().toLowerCase();

  if (fileType === 'csv') {
    return await parseCSV(file);
  } else if (['xls', 'xlsx'].includes(fileType)) {
    return await parseExcel(file);
  } else {
    throw new Error('Formato de archivo no compatible. Use CSV o Excel.');
  }
}

// Función para procesar archivos CSV
function parseCSV(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error) => reject(error),
    });
  });
}

// Función para procesar archivos Excel
function parseExcel(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[firstSheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const keys = jsonData.shift(); // Usar la primera fila como encabezados
        const formattedData = jsonData.map((row) =>
          keys.reduce((obj, key, index) => {
            obj[key] = row[index];
            return obj;
          }, {})
        );
        resolve(formattedData);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
}
