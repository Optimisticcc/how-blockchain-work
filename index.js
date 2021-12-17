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

// mỗi node là các người tham gia vào network
// kết nối với nhau quả p2p protocol => k có central hub
// đồng thuận để có thể thêm thông tin mới vào blockchain hay k
// mỗi node giữ 1 bản sao toàn bộ blockchain =>

/* blockchian is decentralized :  không ai hoặc nhóm nào có toàn quyền với toàn mạng, 
p2p network: cho phesp tất cả người tham gia vào mạng giữ bản sao chép các giao dịch 
1 người có thể emit và receive messages , can vote a new transation to blockchain
 immutable : it is hard to change information off block




*/
