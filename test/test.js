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
            var c0 = 75709550412646944909465389482196253775860330403934016087681168052954207036913;
            var keyImage = ['0x52BAB057EB42515A263EC0093DB08D7D49003ACAFD49BEF03B770C6E9049591C','0xD9772DB1AEF70D66267B4128FC98ED1037F991F5C841BC5EC07BA57B86E5AD4E'];
            var s = ['0x22D05491D70DF9C2F8BC608CC9E2A61745281BF31750315D680C643B5B0DC5E8','0x6417AC28EA669E60A61C5D0D63F8DC306E95474121842D80BFA3CBBC7EC46394','0xB2C7950E99D5F462D69A82F2B22FD69DEE1B96CE64B3883DAE515928F8F04D72']
//[91190462932018558120629083241542643882159240682631753133824258713543117415691, 43556498084990321200298779495020214958715306770012155504027362095974956163343, 65471538237796562356647522983903970955116437941109653583553064824841546184494, 27187924899241601813938300368410115736026759436980227265221164420866202451318, 10342599806710454170092993656588321621362115307647025141354441995485175345617, 54976217072910222647394510131265749703801200768375285142934500048096842373277, 111862667597103023608691989942749866360616396225029842347089631718377140464997, 16561391164783323157851578678699591637230113048214181815971479906139005334605, 78429716153092954578776283758974907361899268960233727621916242695584147401885, 78882057384162385213282393644452869203143831500285861875904976068020289013307];
            var pub_keys = [['0x83EB61E15D6EF01AF6466728287AFC81BA25829874A4F7B5E6E0858051531B64','0xFA26BD8BA7BE8B6D2DBB89A8DCA841A24A722722A7B473D397C571CD47EFAEE2'],['0xB0F557855061AC6DEF1764C095E53D90C711B4417A2A095334CB0B17F23609AF','0xDB8D38E097B24F678DABB19724E5966C62A93D4D3725AC5A8E13090176696AA9'],['0xF4341E8EFA565C5579D8ABCCABBEFAC4EA920F372519C316BBC3CF262A48D836','0xD12A81E86AEE13A07FF0527A15F6DF0B5AFD56DC42EDC11642585A72F6D635']]
            receipt = await contractInstance.setCommon(accounts[0], {from:accounts[0]});
            console.log("receipt for setting common address : \n", receipt);
            voteCount = await contractInstance.vote.call((message), '0xA7621644904E485DE977C65FF912DA460C8A474480FE33F3F46DB863B05B25F1', keyImage, s, pub_keys, {from: accounts[0], gas:80000000000});
            //var tx = contractInstance.addNewItem(name, price, {from: itemSeller});
            // console.log(itemID.toNumber())
            //var res = await contractInstance.getItem.call(itemID.toNumber())
    
            assert.equal(voteCount == 1);
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