const offerService = require("../services/offer-service.js");

async function getAllOfferList(req, res) {
  let result = await offerService.getAllOfferList();
  sendResponse(result, res);
}

async function getActiveOfferList(req, res) {
  let result = await offerService.getActiveOfferList();
  sendResponse(result, res);
}

async function addOffer(req, res) {
  let result = await offerService.addOffer(req.body);
  sendResponse(result, res);
}

async function updateOffer(req, res) {
  let result = await offerService.updateOffer(req.body);
  sendResponse(result, res);
}

async function deleteOffer(req, res) {
  let result = await offerService.deleteOffer(req.body);
  sendResponse(result, res);
}

function sendResponse(result, res) {
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

module.exports = {
  getAllOfferList,
  getActiveOfferList,
  addOffer,
  updateOffer,
  deleteOffer,
};
