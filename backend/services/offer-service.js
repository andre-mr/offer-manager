const offerDb = require("../database/offer-db.js");

async function getAllOfferList() {
  try {
    return await offerDb.getAllOfferList();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getActiveOfferList() {
  try {
    return await offerDb.getActiveOfferList();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getOfferImage(id) {
  try {
    return await offerDb.getOfferImage(id);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addOffer(offer) {
  try {
    return await offerDb.addOffer(offer);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateOffer(offer) {
  try {
    return await offerDb.updateOffer(offer);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteOffer(offer) {
  try {
    return await offerDb.deleteOffer(offer);
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getAllOfferList,
  getActiveOfferList,
  addOffer,
  updateOffer,
  deleteOffer,
  getOfferImage,
};
