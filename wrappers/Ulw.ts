import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type UlwConfig = {};

export function ulwConfigToCell(config: UlwConfig): Cell {
    return beginCell().endCell();
}

export class Ulw implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Ulw(address);
    }

    static createFromConfig(config: UlwConfig, code: Cell, workchain = 0) {
        const data = ulwConfigToCell(config);
        const init = { code, data };
        return new Ulw(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
