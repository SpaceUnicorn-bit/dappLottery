import Web3 from 'web3';
import { Lottery } from '../../types/Lottery';
export declare class LotteryWrapper {
    web3: Web3;
    contract: Lottery;
    address: string;
    constructor(web3: any);
    get isDeployed(): boolean;
    getPlayers(fromAddress: string): Promise<string[]>;
    getHouseFee(fromAddress: string): Promise<string>;
    currentState(fromAddress: string): Promise<string>;
    betCount(fromAddress: string): Promise<string>;
    betSize(fromAddress: string): Promise<string>;
    getAdmin(fromAddress: string): Promise<string>;
    createBet(count: number, size: number, fromAddress: string): Promise<import("web3-core").TransactionReceipt>;
    bet(fromAddress: string, betSize: number): Promise<import("web3-core").TransactionReceipt>;
    cancel(fromAddress: string): Promise<import("web3-core").TransactionReceipt>;
    deploy(fromAddress: string): Promise<undefined>;
    useDeployed(contractAddress: string): void;
}
