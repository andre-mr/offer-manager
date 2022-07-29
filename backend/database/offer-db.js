const mysql = require("mysql2/promise.js");

async function getAllOfferList() {
  return sqlSelect(
    `SELECT id, active, store, description, link, content, 
    DATE_FORMAT(CONVERT_TZ(offer.creation, '+00:00', '${process.env.TIME_ZONE}'), '%d/%m/%Y %H:%i') AS creation, 
    DATE_FORMAT(CONVERT_TZ(offer.utilization, '+00:00', '${process.env.TIME_ZONE}'), '%d/%m/%Y %H:%i') AS utilization, 
    uses FROM offer;`
  );
}

async function getActiveOfferList() {
  return sqlSelect(
    `SELECT id, active, store, description, link, content, 
    DATE_FORMAT(CONVERT_TZ(offer.creation, '+00:00', '${process.env.TIME_ZONE}'), '%d/%m/%Y %H:%i') AS creation, 
    DATE_FORMAT(CONVERT_TZ(offer.utilization, '+00:00', '${process.env.TIME_ZONE}'), '%d/%m/%Y %H:%i') AS utilization, 
    uses FROM offer WHERE active=1;`
  );
}

async function addOffer(offer) {
  return await sqlInsert(
    `INSERT INTO offer (active, store, description, link, content, creation, utilization, uses) VALUES (?) `,
    [
      offer.active,
      offer.store,
      offer.description,
      offer.link,
      offer.content,
      offer.creation,
      offer.utilization,
      offer.uses,
    ]
  );
}

async function updateOffer(offer) {
  let sql = `UPDATE offer SET active=?, store=?, description=?, link=?, content=?, creation=?, utilization=?, uses=? WHERE id=? `;
  let values = [
    offer.active,
    offer.store,
    offer.description,
    offer.link,
    offer.content,
    offer.creation,
    offer.utilization,
    offer.uses,
    offer.id,
  ];
  return await sqlUpdateOrDelete(sql, values);
}

async function deleteOffer(offer) {
  let sql = `DELETE FROM offer WHERE id=? `;
  let values = [offer.id];
  return await sqlUpdateOrDelete(sql, values);
}

async function sqlSelect(selectStatement) {
  let queryResult;
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    [queryResult] = await connection.execute(selectStatement);
    connection.end();
  } catch (error) {
    [queryResult] = [];
  }
  return queryResult;
}

async function sqlInsert(insertStatement, values) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  await connection.query(insertStatement, [values], (err) => {
    if (err) throw err;
    connection.end();
    return false;
  }
  );
  connection.end();
  return true;
}

async function sqlUpdateOrDelete(updateStatement, values) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  await connection.query(updateStatement, values, function (err) {
    if (err) {
      connection.end();
      throw err;
    }
  });
  connection.end();
  return true;
}

module.exports = {
  getAllOfferList,
  getActiveOfferList,
  addOffer,
  updateOffer,
  deleteOffer,
};
