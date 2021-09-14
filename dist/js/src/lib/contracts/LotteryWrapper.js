"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LotteryWrapper = void 0;
const ProfileJSON = __importStar(require("../../contracts/Lottery.json"));
const values_1 = require("../../values");
const DEFAULT_SEND_OPTIONS = {
    gas: 6000000
};
class LotteryWrapper {
    web3;
    contract;
    address;
    constructor(web3) {
        this.web3 = web3;
        this.address = values_1.values.DEPLOYED_CONTRACT_ADDRESS;
        this.contract = new web3.eth.Contract(ProfileJSON.abi);
        this.contract.options.address = values_1.values.DEPLOYED_CONTRACT_ADDRESS;
    }
    get isDeployed() {
        return Boolean(this.address);
    }
    async getPlayers(fromAddress) {
        const players = await this.contract.methods.getPlayers().call({ from: fromAddress });
        return players;
    }
    async getHouseFee(fromAddress) {
        const houseFee = await this.contract.methods.houseFee().call({ from: fromAddress });
        return houseFee;
    }
    async currentState(fromAddress) {
        const currentState = await this.contract.methods.currentState().call({ from: fromAddress });
        return currentState;
    }
    async betCount(fromAddress) {
        const betCount = await this.contract.methods.betCount().call({ from: fromAddress });
        return betCount;
    }
    async betSize(fromAddress) {
        const betSize = await this.contract.methods.betSize().call({ from: fromAddress });
        return betSize;
    }
    async getAdmin(fromAddress) {
        const admin = await this.contract.methods.admin().call({ from: fromAddress });
        return admin;
    }
    async createBet(count, size, fromAddress) {
        const tx = await this.contract.methods.createBet(count, size).send({
            ...DEFAULT_SEND_OPTIONS,
            from: fromAddress
        });
        return tx;
    }
    async bet(fromAddress, betSize) {
        const tx = await this.contract.methods.bet().send({
            ...DEFAULT_SEND_OPTIONS,
            from: fromAddress,
            value: betSize
        });
        return tx;
    }
    async cancel(fromAddress) {
        const tx = await this.contract.methods.cancel().send({
            ...DEFAULT_SEND_OPTIONS,
            from: fromAddress
        });
        return tx;
    }
    async deploy(fromAddress) {
        const tx = this.contract.deploy({
            data: ProfileJSON.bytecode,
            arguments: [2]
        }).send({
            ...DEFAULT_SEND_OPTIONS,
            from: fromAddress
        });
        let transactionHash;
        tx.on('transactionHash', (hash) => {
            transactionHash = hash;
        });
        const contract = await tx;
        console.log(contract);
        this.useDeployed(contract.options.address);
        return transactionHash;
    }
    useDeployed(contractAddress) {
        this.address = contractAddress;
        this.contract.options.address = contractAddress;
    }
}
exports.LotteryWrapper = LotteryWrapper;
//# sourceMappingURL=LotteryWrapper.js.map