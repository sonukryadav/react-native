
## Basic CRUD operation on SQLite

We can use a custom ExecuteSql function which will accept db, query string and optional parameters.

```js
export function ExecuteSql(db, query: string, params: any[] = []) {
  return new Promise((resolve, reject) => {
    db.transaction((txn) => {
      txn.executeSql(
        query,
        params,
        (tx, res) => resolve(res),
        (e) => reject(e)
      );
    });
  });
}
```

### Create Table

```js
  // Create Table
  async CreateTodoTable() {
    let Table = await ExecuteSql(
            db,
            `CREATE TABLE todotable(id INTEGER PRIMARY KEY AUTOINCREMENT, task VARCHAR(20), status INTEGER(1))`,
          );
    console.log(Table);
  }
```

### Delete Table

```js
const deleteTable = async (tblName) => {
  await ExecuteSql(db, `DROP TABLE IF EXISTS ${tblName}`);
};
```

### Insert data into table

```js
ExecuteSql(db, "INSERT INTO todotable (task, status) VALUES (?,?)", [
  "new Task",
  0,
])
  .then(async (res) => {
    dbSuccess(res, `Inserted :${res.insertId}`);
    let data = await ExecuteSql(
      db,
      `SELECT * FROM ${tblName} WHERE id=${res.insertId}`
    );
    setTodos((prev) => [...prev, data.rows.item(0)]);
  })
  .catch((e) => {
    dbError(e);
  });
```

### Update Data

```js
await ExecuteSql(db, `UPDATE ${tblName} SET task= ? WHERE id=?`, [
  todoText,
  id,
]);
```

### Delete Data

```js
await ExecuteSql(db, `DELETE FROM ${tblName} WHERE id=${todo.id}`);
```

[Practice](https://www.sql-practice.com/)


# SQLite Project Part 1

Implementation of:

- Open Database
- Create Table
- Insert data into table
- Select all data from table


