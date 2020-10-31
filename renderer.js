const { remote, ipcRenderer } = require('electron');
const {
  connectDB,
  customerPricesModel,
  customerPricelistNumberModel,
  customerNumberNameModel,
  customerBackUpModel,
} = require('./database.js');

const fs = require('fs');

/* DATA TO BE UPLOADED */
/* CUSTOMER PRICES */
let customerPricesJson = JSON.parse(fs.readFileSync('./customerPrices.json'));

/* CUSTOMER DATABASE */
let customerPricelistNumberJson = JSON.parse(
  fs.readFileSync('./customerPricelistNumber.json')
);

/* CUSTOMER NAME NUMBER */
let customerNumberNameJson = JSON.parse(fs.readFileSync('./customerNumberName.json'));

/* CUSTOMER BACKUP */
let customerBackUpJson = JSON.parse(fs.readFileSync('./customerBackUp.json'));

/* DOM ELEMENTS */
let postBtn = document.getElementById('submit'),
  updateBtn = document.getElementById('update'),
  connectState = document.getElementById('connect-state');

connectDB();

ipcRenderer.on('db-status', (e, message) => {
  if (message === 'connected') {
    connectState.style.animation = 'con-success 2s ease-in-out infinite';
  } else if (message === 'fail') {
    connectState.style.animation = 'con-fail 2s ease-in-out infinite';
  }
});

postBtn.addEventListener('click', async () => {
  postBtn.style.backgroundColor = 'green';
  await customerPricesModel.create(customerPricesJson, (res) => {
    alert('Customer Prices Created');
  });

  await customerPricelistNumberModel.create(customerPricelistNumberJson, (res) => {
    alert('Customer Pricelist Number  Created');
  });

  await customerNumberNameModel.create(customerNumberNameJson, (res) => {
    alert('Customer NameNumber Created');
  });

  await customerBackUpModel.create(customerBackUpJson, (res) => {
    alert('Customer Backup Created');
  });
});

async function getData() {
  try {
    let customerBackUpObj = await customerBackUpModel.findById('customerBackUp').exec();
    let customerBackUp = JSON.stringify(customerBackUpObj._doc);
    fs.writeFileSync('./downloaded/customerBackUp.json', customerBackUp);
  } catch (err) {
    console.log(err);
  }

  try {
    let customerNumberNameObj = await customerNumberNameModel
      .findById('customerNumberName')
      .exec();
    let customerNumberName = JSON.stringify(customerNumberNameObj._doc);
    fs.writeFileSync('./downloaded/customerNumberName.json', customerNumberName);
  } catch (err) {
    console.log(err);
  }
  try {
    let customerPricelistNumberObj = await customerPricelistNumberModel
      .findById('customerPricelistNumber')
      .exec();
    let customerPricelistNumber = JSON.stringify(customerPricelistNumberObj._doc);
    fs.writeFileSync('./downloaded/customerPricelistNumber.json', customerPricelistNumber);
  } catch (err) {
    console.log(err);
  }
  try {
    let customerPricesObj = await customerPricesModel.findById('customerPrices').exec();
    let customerPrices = JSON.stringify(customerPricesObj._doc);
    fs.writeFileSync('./downloaded/customerPrices.json', customerPrices);
  } catch (err) {
    console.log(err);
  }
  alert('All databases downloaded');
}

updateBtn.addEventListener('click', () => {
  getData();
});

// let document = query._doc;
// delete document['_id'];
// fs.writeFile('test.json', JSON.stringify(document), (err) => {
//   console.log(err);
// });

// updateBtn.addEventListener('click', async () => {
//   updateBtn.style.backgroundColor = 'green';

//   await customerPricelistNumber.replaceOne(replace, (res) => {
//     let notification = new remote.Notification({
//       body: 'Pricelist Replaced',
//     });
//     notification.show();
//   });
// });
