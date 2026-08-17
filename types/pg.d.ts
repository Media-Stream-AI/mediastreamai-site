declare module "pg" {
  export interface PoolConfig {
    connectionString?: string;
    ssl?: boolean | { rejectUnauthorized?: boolean };
  }

  export interface QueryResult<T = any> {
    rows: T[];
    rowCount: number;
  }

  export class Pool {
    constructor(config?: PoolConfig);
    query<T = any>(text: string, values?: any[]): Promise<QueryResult<T>>;
    end(): Promise<void>;
  }
}
