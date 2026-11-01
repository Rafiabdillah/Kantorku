import { DatabaseSync } from 'node:sqlite';
import { D4_SQL_CONSTANTS } from './constants';

export function createD4Database(): DatabaseSync {
  const db = new DatabaseSync(':memory:');
  db.exec(`CREATE TABLE sales (sale_id INTEGER PRIMARY KEY, sale_date TEXT NOT NULL, product TEXT NOT NULL, amount INTEGER NOT NULL, region TEXT NOT NULL);`);
  db.exec(`CREATE TABLE products (product_id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE);`);
  const insert = db.prepare('INSERT INTO sales (sale_date, product, amount, region) VALUES (?, ?, ?, ?)');
  const insertProduct = db.prepare('INSERT INTO products (name) VALUES (?)');
  D4_SQL_CONSTANTS.sales.forEach((sale) => insert.run(sale.saleDate, sale.product, sale.amount, sale.region));
  D4_SQL_CONSTANTS.products.forEach((product) => insertProduct.run(product));
  return db;
}

export function executeSqlAnswer(sql: string) {
  const db = createD4Database();
  try {
    return db.prepare(sql).all();
  } finally {
    db.close();
  }
}
