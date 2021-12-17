const SHA256 = require("crypto-js/sha256");
import Elliptic from "elliptic";

const ec = new Elliptic.ec("secp256k1");
/*
mỗi transaction phần nhỏ trong lưu trữ ở block
thể hiện sự giao dịch của tiền
khi mã sự thay đổi nhỏ ở giao dịch, tạo hash mới

để them gia vào blockchain
có public key suy ra từ privatekey với thuật toán
privatekey secret
public key can shared
neu ma co privatekey co the gui giao dich = ten cua ban

mining: 

quy trình trong đó các giao dịch giữa người dùng được xác minh và thêm vào sổ cái công khai của blockchain
liên quan đến Proof of Work: băm tiêu đề khối lặp đi lặp lại cho đến khi tạo ra một hàm băm khối hợp lệ. Phần thưởng tối thiểu đầu tiên để tạo ra một băm khối hợp lệ
thợ mỏ đang được trả tiền cho công việc của họ với tư cách là kiểm toán viên 
new coins are generated

khi block mine:
number of nodes have to agree that this block is correct
call consensus 
don't trust on single node rely part of whole network
dong thuan moi dua block vao chain
*/
export default class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }

  // Calculate the hash in order to do the signature. You need to do this because the hash value will be signed instead of the original information directly.
  calculateHash() {
    return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
  }

  // Incoming key
  signTransaction(signingKey) {
    // Verify if the source account is the person's address, or more specifically, verify whether the source address is the public key corresponding to the private key.
    if (signingKey.getPublic("hex") !== this.fromAddress) {
      throw new Error("You cannot sign transactions for other wallets!");
    }
    const txHash = this.calculateHash();
    // Sign the transaction hash with the private key.
    const sign = signingKey.sign(txHash, "base64");
    // Convert the signature to the DER format.
    this.signature = sign.toDER("hex");
    console.log("signature: " + this.signature);
  }

  isValid() {
    // The miner fee transaction fromAddress is empty, verification cannot be completed.
    if (this.fromAddress === null) return true;
    // Determine if the signature exists
    if (!this.signature || this.signature.length === 0) {
      throw new Error("No signature in this transaction");
    }
    // Transcode fromAddress to get the public key (this process is reversible, as it is just a format conversion process.)
    const publicKey = ec.keyFromPublic(this.fromAddress, "hex");
    // Use the public key to verify if the signature is correct, or more specifically if the transaction was actually initiated from fromAddress.
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}
