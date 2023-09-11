const mysql = require("mysql2");
const fs = require("fs").promises;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "project-d",
  password: ""
});

connection.connect(function (err) {
  if (err) {
    return console.error("Помилка: " + err.message);
  } else {
    console.log("Підключення було успішним");
    Data();
  }
});

function Data() {
  const sqlQuery1 = "SELECT * FROM Address";
  connection.query(sqlQuery1, async function (err, results1, fields1) {
    if (err) {
      console.error("Помилка виконання запиту 1: " + err.message);
    } else {
      console.log("Результати запиту 1:");
      console.log(results1);

      try {
        await fs.writeFile("results1.json", JSON.stringify(results1));
        console.log("Результати запиту 1 записані в файл results1.json");

        const sqlQuery2 = "SELECT * FROM `user`";
        connection.query(sqlQuery2, async function (err, results2, fields2) {
          if (err) {
            console.error("Помилка виконання запиту 2: " + err.message);
          } else {
            console.log("Результати запиту 2:");
            console.log(results2);

            try {
              await fs.writeFile("results2.json", JSON.stringify(results2));
              console.log("Результати запиту 2 записані в файл results2.json");
            } catch (err) {
              console.error("Помилка при записі результатів запиту 2 в файл: " + err.message);
            }
          }
          connection.end(function(err) {
            if (err) {
              return console.log("Ошибка при закрытии соединения: " + err.message);
            }
            console.log("Подключение закрыто");
          });
        });
      } catch (err) {
        console.error("Помилка при записі результатів запиту 1 в файл: " + err.message);
      }
    }
  });
}