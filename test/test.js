var EVoting = artifacts.require("EVoting");
const truffleAssert = require('truffle-assertions');

var contractInstance;
var voteCount;

// function postData(input) {
//     .ajax({
//         type: "POST",
//         url: "/linkable_ring_signature.py",
//         data: { param: input },
//         success: callbackFunc
//     });
// }

// function callbackFunc(response) {
//     // do something with the response
//     console.log(response);
// }

// postData('data to process');


contract("EVoting", async function(accounts){
    before(async () => {
        contractInstance = await EVoting.deployed();
    })
    describe("success states", async () => {
        
        it("should add vote for proposal 1", async () => {
            var message = 1;
            var c0 = '0x41541AFB0800B2275136E073EFE69C4BFCCD2FF179BA64C0DC2AB62C1ED78F2C';
            var keyImage = ['0x77A157DA71D942B634074C7A7679E8AA455FB8150A18287A9F2BB4E6276E7B2B', '0xFA40E7F763B4EF0C900C2D1D13BADFB5C34CE642E30FE6AA482B4B8732A03D5'];
            var s = ['0xB3194008D5AA4B12DD7AB5EC60CC9A2E92CF8FCF31E8E603A6EB09B3E6A58F73', '0xF479804A7A74EB066CA0FD922091011627231C5A92BBD04A34BCEDBB78B214E2'];
            var pub_keys = [['0x1B6FB3E77DF2FA724FB0FD3BB38D1F2F125147BBADD6A0675E1E499E885508CE', '0x80D042C3DB0AC4D63457653EA39BCFF18232233E4AF743315811B9E75BCE6808'],['0xC1E0144F13C215619B4D670481454140C2ECC98B55CA3CC73C7A474BFFF9102E', '0x54068EDE35BC3131C01622CDD654CA1A6B6D61CF18D34FE9E1D173FFA0FEFAEF']];
            receipt = await contractInstance.setCommon(accounts[0], {from:accounts[0]});
            console.log("receipt for setting common address : \n", receipt);
            voteCount = await contractInstance.vote.call((message), '0xB6AC5DE2C57F98D19212EAEFCA1958202DAD986BB8DF19943180AD68823F0949', keyImage, s, pub_keys, {from: accounts[0], gas:80000000000});
            //var tx = contractInstance.addNewItem(name, price, {from: itemSeller});
            // console.log(itemID.toNumber())
            //var res = await contractInstance.getItem.call(itemID.toNumber())
    
            assert.equal(voteCount, 1);
            // assert.equal(price, res["1"].toNumber(), "Price wasn't added properly");
            // assert.equal(itemSeller, res["2"], "Seller wasn't added properly");
            // assert.equal(res["3"].toNumber(), 0, "Status wasn't added properly");
    
        
        });
    })
})
    
    //     it("should add product 2", async () => {
    //         var name = "Prod2";
    //         var price = 100;
    //         var itemSeller = accounts[0];
    
            
    //         itemID = await contractInstance.addNewItem.call(name, price, {from: itemSeller});
    //         var tx = contractInstance.addNewItem(name, price, {from: itemSeller});
    //         // console.log(itemID.toNumber())
    //         var res = await contractInstance.getItem.call(itemID.toNumber())
    
    //         assert.equal(name, res["0"], "Name wasn't added properly");
    //         assert.equal(price, res["1"].toNumber(), "Price wasn't added properly");
    //         assert.equal(itemSeller, res["2"], "Seller wasn't added properly");
    //         assert.equal(res["3"].toNumber(), 0, "Status wasn't added properly");
    
        
    //     });
    
    //     it("should remove product 1", async () => {
    //         itemID = 0;
    //         var tx = await contractInstance.removeItem(itemID);
    //         var removedId = tx.receipt.logs[0].args["0"].toNumber()
    //         assert.equal(removedId, itemID, "Incorrect item removed")
    //         var res = await contractInstance.getItem.call(itemID)
    //         assert.equal(res["3"].toNumber(), 2, "Item hasn't been removed correctly");
    //         // console.log(res);
    //     });
    
    //     it("should buy product 2", async () => {
    //         itemID = 1;
    //         var tx = await contractInstance.buyItem(itemID, {from: accounts[1], value: 100});
    //         var boughtId = tx.receipt.logs[0].args["0"].toNumber()
    //         assert.equal(boughtId, itemID, "Incorrect item bought")
    //         var res = await contractInstance.getItem.call(itemID)
    //         assert.equal(res["3"].toNumber(), 1, "Item hasn't been bought correctly");
    //     });
    // })

    // describe("failure states", async () => {
    //     it("should not remove product 2", async () => {
    //         itemID = 1;
    //         await truffleAssert.reverts(contractInstance.removeItem(itemID), "This item has already been purchased or removed");
    //     });
    // })
    
//});