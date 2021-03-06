import BlockChain from "./src/blockchain";
import Transaction from "./src/transaction";
import { createWallet, validateWallet } from "./src/wallet";

/*
 * Init Blockchain
 */
const SIMPLE_BLOCKCHAIN = new BlockChain();

/*
 * Setup wallets
 *
 * Create your wallet and Alice's wallet
 */
const myWallet = createWallet();
const aliceWallet = createWallet();

// Looking at the output, I did get the public key from the private key.
console.log(
  "is the myWallet from privateKey equals to publicKey?",
  validateWallet(myWallet.privateKey, myWallet.publicKey)
);

/*
 * Transactions
 *
 * Initiate a transaction and transfer 60 from your own account to Alice's account.
 */
const tx1 = new Transaction(myWallet.publicKey, aliceWallet.publicKey, 60);

// Sign with private key
tx1.signTransaction(myWallet.keyPair);

// Submit a transaction
SIMPLE_BLOCKCHAIN.addTransaction(tx1);

console.log("starting the miner of block 1...");
SIMPLE_BLOCKCHAIN.minePendingTransactions(myWallet.publicKey);

// Add more transactions and blocks so we can have a sample blockchain with 3 blocks of height
const tx2 = new Transaction(myWallet.publicKey, aliceWallet.publicKey, 80);
tx2.signTransaction(myWallet.keyPair);
SIMPLE_BLOCKCHAIN.addTransaction(tx2);
console.log("starting the miner of block 2...");
SIMPLE_BLOCKCHAIN.minePendingTransactions(myWallet.publicKey);

const tx3 = new Transaction(myWallet.publicKey, aliceWallet.publicKey, 100);
tx3.signTransaction(myWallet.keyPair);
SIMPLE_BLOCKCHAIN.addTransaction(tx3);
console.log("starting the miner of block 3...");
SIMPLE_BLOCKCHAIN.minePendingTransactions(myWallet.publicKey);

// If the transfer is successful, the balance of Alice's account will be 60.
console.log(
  "Balance of Alice's account is: ",
  SIMPLE_BLOCKCHAIN.getBalanceOfAddress(aliceWallet.publicKey)
);

/*
 * Blockchain validation test
 */
console.log("is the chain valid? " + SIMPLE_BLOCKCHAIN.isChainValid());

// We manually altered data in the blockchain
SIMPLE_BLOCKCHAIN.chain[1].transactions[0].amount = 200;

console.log("is the chain still valid? " + SIMPLE_BLOCKCHAIN.isChainValid());

// We print the whole blockchain
console.log(JSON.stringify(SIMPLE_BLOCKCHAIN, null, 4));

// m???i node l?? c??c ng?????i tham gia v??o network
// k???t n???i v???i nhau qu??? p2p protocol => k c?? central hub
// ?????ng thu???n ????? c?? th??? th??m th??ng tin m???i v??o blockchain hay k
// m???i node gi??? 1 b???n sao to??n b??? blockchain =>

/* blockchian is decentralized :  kh??ng ai ho???c nh??m n??o c?? to??n quy???n v???i to??n m???ng, 
p2p network: cho phesp t???t c??? ng?????i tham gia v??o m???ng gi??? b???n sao ch??p c??c giao d???ch 
1 ng?????i c?? th??? emit v?? receive messages , can vote a new transation to blockchain
 immutable : it is hard to change information off block




*/
