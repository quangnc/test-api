import { createReadStream } from 'fs';
import csv from 'csv-parser';
import pkg from 'pg';
const { Client } = pkg;
const IS_PRODUCTION = process.env.NODE_ENV == 'production';

// POSTGRES_URL=postgres://postgres:d@localhost:5432/issq_svr

// Tạo kết nối PostgreSQL
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'issq_svr',
  password: 'postgres',
  port: 5432,
});

// Kết nối với PostgreSQL
client.connect();

// Đọc file CSV và chèn vào DB
const importCSVToDB = (csvFilePath) => {
  const results = [];

  createReadStream(csvFilePath)
    .pipe(csv()) // Đọc file CSV
    .on('data', (row) => {
      results.push(row);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
      // Chèn dữ liệu vào DB
      insertDataIntoDB(results);
    });
};

// Hàm chèn dữ liệu vào DB
const insertDataIntoDB = async (data) => {
  try {
    // Đảm bảo mỗi phần tử dữ liệu có dạng { column1: value1, column2: value2, ... }
    for (const row of data) {
      const query = `
        INSERT INTO news (id, url, created_at, is_active, type, updated_at, count)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
      `;
      const values = [
        row['id'],
        row['url'],
        row['createdAt'],
        true,
        +row['type'],
        row['updatedAt'],
        +row['count'],
      ];
      console.log('values', values);

      await client.query(query, values);
    }

    console.log('Data inserted successfully');
  } catch (err) {
    console.error('Error inserting data into DB:', err);
  } finally {
    // Đóng kết nối sau khi xong
    client.end();
  }
};

// Gọi hàm và truyền đường dẫn file CSV
importCSVToDB(
  '/Users/nguyenchingoc/www/quangnc/issq-be/src/scripts/oc_news.csv',
);
