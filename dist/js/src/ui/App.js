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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
require("./App.css");
const react_1 = __importStar(require("react"));
const web3_1 = __importDefault(require("web3"));
require("react-toastify/dist/ReactToastify.css");
const web3_2 = require("@polyjuice-provider/web3");
const config_1 = require("../config");
async function createWeb3() {
    // Modern dapp browsers...
    if (window.ethereum) {
        const godwokenRpcUrl = config_1.CONFIG.WEB3_PROVIDER_URL;
        const providerConfig = {
            rollupTypeHash: config_1.CONFIG.ROLLUP_TYPE_HASH,
            ethAccountLockCodeHash: config_1.CONFIG.ETH_ACCOUNT_LOCK_CODE_HASH,
            web3Url: godwokenRpcUrl
        };
        const provider = new web3_2.PolyjuiceHttpProvider(godwokenRpcUrl, providerConfig);
        const web3 = new web3_1.default(provider || web3_1.default.givenProvider);
        try {
            // Request account access if needed
            await window.ethereum.enable();
        }
        catch (error) {
            // User denied account access...
        }
        return web3;
    }
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    return null;
}
function App() {
    const [web3, setWeb3] = (0, react_1.useState)(null);
    const [contract, setContract] = (0, react_1.useState)();
    const [accounts, setAccounts] = (0, react_1.useState)();
    const [balance, setBalance] = (0, react_1.useState)();
    const [existingContractIdInputValue, setExistingContractIdInputValue] = (0, react_1.useState)();
    const [storedValue, setStoredValue] = (0, react_1.useState)();
    const [transactionInProgress, setTransactionInProgress] = (0, react_1.useState)(false);
    const toastId = react_1.default.useRef();
    const [newStoredNumberInputValue, setNewStoredNumberInputValue] = (0, react_1.useState)();
    const account = accounts?.[0];
    return (react_1.default.createElement("div", { className: "App" }));
}
exports.App = App;
exports.default = App;
//# sourceMappingURL=App.js.map