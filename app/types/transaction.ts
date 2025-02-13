import { Account } from "./account";
import { Category } from "./category";

export enum TransactionType {
  Income = 1,
  Expense,
}

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: Date;
  accountId: string;
  categoryId: string;
  type: TransactionType;
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionCreate {
  id?: string;
  amount: number;
  description: string;
  date: Date;
  accountId: string;
  categoryId: string;
  type: TransactionType;
}

export interface TransactionFull extends Transaction {
  account: Account;
  category: Category;
}

export interface TransactionFullResponse {
  data: TransactionFull[];
  total: number;
}

export interface FilterTransactionsInput {
  startDate?: Date;
  endDate?: Date;
  type?: TransactionType;
  accountId?: string;
  categoryId?: string;
  orderBy?: OrderByItem[];
  limit?: number;
  offset?: number;
}

export interface OrderByItem {
  field: OrderByFields;
  direction: OrderByDirections;
}

export enum OrderByDirections {
  Asc = "asc",
  Desc = "desc",
}

export enum OrderByFields {
  Date = "date",
  Amount = "amount",
}
