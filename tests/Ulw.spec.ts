import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Ulw } from '../wrappers/Ulw';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Ulw', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Ulw');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let ulw: SandboxContract<Ulw>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        ulw = blockchain.openContract(Ulw.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await ulw.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: ulw.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and ulw are ready to use
    });
});
