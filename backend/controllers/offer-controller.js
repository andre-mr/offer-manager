// import transactionsService from '../services/transactions-service.js';
const offerService = require("../services/offer-service.js");

async function getAllOfferList(req, res) {
  let result = await offerService.getAllOfferList();
  if (result) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.write(JSON.stringify(result));
    res.send();
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.write("Erro na consulta.");
    res.send();
  }
}

async function getActiveOfferList(req, res) {
  let result = await offerService.getActiveOfferList();
  if (result) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.write(JSON.stringify(result));
    res.send();
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.write("Erro na consulta.");
    res.send();
  }
}

async function addOffer(req, res) {
  let result = await offerService.addOffer(req.body);
  if (result) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.write(JSON.stringify(result));
    res.send();
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.write("Erro na consulta.");
    res.send();
  }
}

async function updateOffer(req, res) {
  let result = await offerService.updateOffer(req.body);
  if (result) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.write(JSON.stringify(result));
    res.send();
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.write("Erro na consulta.");
    res.send();
  }
}

async function deleteOffer(req, res) {
  let result = await offerService.deleteOffer(req.body);
  if (result) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.write(JSON.stringify(result));
    res.send();
  } else {
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.write("Erro na consulta.");
    res.send();
  }
}

// export default {
//   getAllOfferList, getActiveOfferList, addOffer, updateOffer, deleteOffer
// }
module.exports = {
  getAllOfferList,
  getActiveOfferList,
  addOffer,
  updateOffer,
  deleteOffer,
};
