import Web3 from 'web3';
import * as ProfileJSON from '../../contracts/Lottery.json';
import { Lottery } from '../../types/Lottery';
import { values } from '../../values';

const DEFAULT_SEND_OPTIONS = {
    gas: 6000000
}

export class LotteryWrapper {
    web3: Web3;

    contract: Lottery;

    address: string;

    constructor(web3: any){
        this.web3 = web3;
        this.address = values.DEPLOYED_CONTRACT_ADDRESS;
        this.contract = new web3.eth.Contract(ProfileJSON.abi as any) as any;
        this.contract.options.address = values.DEPLOYED_CONTRACT_ADDRESS;
    }

    get isDeployed() {
        return Boolean(this.address);
    }

    async getPlayers(fromAddress: string) {
        const players = await this.contract.methods.getPlayers().call({from: fromAddress});
        return players;
    }

    async getHouseFee(fromAddress: string) {
        const houseFee = await this.contract.methods.houseFee().call({from: fromAddress});
        return houseFee;
    }

    

    
    async currentState(fromAddress: string) {
        const currentState = await this.contract.methods.currentState().call({from: fromAddress});
        return currentState;
    }

    
    async betCount(fromAddress: string) {
        const betCount = await this.contract.methods.betCount().call({from: fromAddress});
        return betCount;
    }

    async betSize(fromAddress: string) {
        const betSize = await this.contract.methods.betSize().call({from: fromAddress});
        return betSize;
    }

    async getAdmin(fromAddress: string) {
        const admin = await this.contract.methods.admin().call({from: fromAddress});
        return admin;
    }

    async createBet(count: number, size: number, fromAddress: string) {
        const tx = await this.contract.methods.createBet(count, size).send({
            ...DEFAULT_SEND_OPTIONS,
            from: fromAddress
        });
        return tx;
    }

    async bet( fromAddress: string, betSize:number) {
        const tx = await this.contract.methods.bet().send({
            ...DEFAULT_SEND_OPTIONS,
            from: fromAddress,
            value: betSize
        });
        return tx;
    }

    async cancel( fromAddress: string) {
        const tx = await this.contract.methods.cancel().send({
            ...DEFAULT_SEND_OPTIONS,
            from: fromAddress
        });
        return tx;
    }

    async deploy(fromAddress: string) {
        const tx = this.contract.deploy({
            data: ProfileJSON.bytecode,
            arguments: [2]
        }).send({
            ...DEFAULT_SEND_OPTIONS,
            from: fromAddress
        });

        let transactionHash;
        tx.on('transactionHash', (hash: string) => {
            transactionHash = hash;
        });

        const contract = await tx;

        console.log(contract)
        this.useDeployed(contract.options.address);

        return transactionHash;
    }

    useDeployed(contractAddress: string) {
        this.address = contractAddress;
        this.contract.options.address = contractAddress;
    }
}