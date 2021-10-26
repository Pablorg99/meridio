import * as path from 'path';
import { Database } from 'sqlite3';

export const teardown = () => {
  const db = new Database(path.join(__dirname, '../../../../tmp/test.sqlite3'));

  db.each("select 'delete from ' || name as query from sqlite_master where type = 'table'", (err, row) =>
    db.run(row.query)
  );

  return true;
};
