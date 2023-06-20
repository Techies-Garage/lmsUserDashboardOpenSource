const EventEmitter = require('events');
const WalletEvents = new EventEmitter();
const WalletRepository = require('../../modules/wallet/repository') // database

// set defualt user permissions from the database
WalletEvents.on('createWallet', async (data) => {
  try {
    await WalletRepository.createWallet(data.id, 0, "NGN")
  } catch (error) {
    callback(error);
  }
});

module.exports = WalletEvents
