const { ipcRenderer } = require('electron');
const mongoose = require('mongoose');
const fs = require('fs');

/* CUSTOMER PRICELISTS ALREADY CREATED */
/* SCHEMA */
const customerPricesSchema = new mongoose.Schema(
  {},
  { strict: false, _id: false, versionKey: false }
);
/* MODEL */
const customerPrices = mongoose.model('Customer_Prices', customerPricesSchema);

/* CUSTOMER PRICELISTS ALREADY CREATED */
/* SCHEMA */
const customerPricelistNumberSchema = new mongoose.Schema(
  {},
  { strict: false, _id: false, versionKey: false }
);
/* MODEL */
const customerPricelistNumber = mongoose.model(
  'Customer_Pricelist_Number',
  customerPricelistNumberSchema
);

/* CUSTOMER PRICELISTS ALREADY CREATED */
/* SCHEMA */
const customerNumberNameSchema = new mongoose.Schema(
  {},
  { strict: false, _id: false, versionKey: false }
);
/* MODEL */
const customerNumberName = mongoose.model('Customer_Number_Name', customerNumberNameSchema);

const customerBackUpSchema = new mongoose.Schema(
  {},
  { strict: false, _id: false, versionKey: false }
);
/* MODEL */
const customerBackUp = mongoose.model('Customer_BackUp', customerBackUpSchema);

exports.connectDB = async () => {
  /* REMOVE THIS TEST STRING WHEN UPDATING ACTUAL DATABASE */ // TODO:

  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.61lij.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    )
    .then((res) => {
      ipcRenderer.send('db-connection', 'connected');
    })
    .catch((res) => {
      ipcRenderer.send('db-connection', 'fail');
    });
};

/* EXPORTS */
exports.customerPricesModel = customerPrices;
exports.customerPricelistNumberModel = customerPricelistNumber;
exports.customerNumberNameModel = customerNumberName;
exports.customerBackUpModel = customerBackUp;
