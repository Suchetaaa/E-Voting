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
            var c0 = 10252198629870239947652931930426534351477048182077741320309900091507895345343;
            var keyImage = ['0x278fb27d06bbb2adfd876e2e3184f3c65eb55c23c58e3f4e645647a8c51fcba6', '0x757dab84c2595312ba3b5004689ae64db50b3a6dd6ad1b680ffab4c43e32c983'];
            var s = ['0xc99bf913ea2e110e408a733c66aadd32e62b59b8b275ec113401c11d2018a50b', '0x604c1ab1fe152108d32b8d3832d309a8a607e0b8e0429680e6055ed3b768610f', '0x90bf93d34419b1db6a8afbb4cd301990971fc633231c58d28333027ddf5f372e', '0x3c1bd1f69b60d6fc819b6aa5597aa85ff67927e4a2407ee8d52bffebf39cbd76', '0x16ddb43c2be6bcbf3b19ccc23d1b90300c7961fd1065bfdd8f271aa2359bf1d1', '0x798b6fa9156a5d2e405cda87419969192ba56899b7a90d3fe5584932877e589d', '0xf75006b2d5b3848a3db415143cabf979b87bd5789d45f9a2d1fea582622f2d65', '0x249d6a4bb93a52e819f46d3e837f6fd44cb5e3db9f0c933c45356f95a99d344d', '0xad65a56f8467deae2caaf14a0a7adda1b9755b28592d51f446b6c5046c996c9d', '0xae65a98c4839d50f19a22beff10e7482cf1b60542e2eecb6569de5d834f2063b']
//[91190462932018558120629083241542643882159240682631753133824258713543117415691, 43556498084990321200298779495020214958715306770012155504027362095974956163343, 65471538237796562356647522983903970955116437941109653583553064824841546184494, 27187924899241601813938300368410115736026759436980227265221164420866202451318, 10342599806710454170092993656588321621362115307647025141354441995485175345617, 54976217072910222647394510131265749703801200768375285142934500048096842373277, 111862667597103023608691989942749866360616396225029842347089631718377140464997, 16561391164783323157851578678699591637230113048214181815971479906139005334605, 78429716153092954578776283758974907361899268960233727621916242695584147401885, 78882057384162385213282393644452869203143831500285861875904976068020289013307];
            var pub_keys = [['0xa9ed5780be853a5682cc61389142df496809b747e423e472f1a61a47c9bfe182', '0x4572d073b7955b7c847949c20ed2000450c8f52ad9b83a3ce24dd409cbc01d21'], ['0x54dc4bde844f233ad9b5fb43e71e8bcfd4c21d175d3b670991c30faba893dc39', '0xda8513dacf59a9384c47c1e9e934cb118e5a3ef4c58f7891ed068d8a4a14c0a'], ['0xf213f5a27836ab995d5d5183f0d771efc9383b3d0cf574f93b77eb4000de6856', '0xc361d91274ebf0a258f3baf6ce87f3c32d6a9ba4808c856ba105e89063ab19c9'], ['0x892090c9177551b29be614e60d8d4a54a805f3f850a5e13d5d44719873691add', '0x26be2f213b9b0cb84b13fdfa9d28b042f60ded4150c82d9806d192887d2303fd'], ['0x8cdee0841aaa3dbf14530817a3e2e7c209c28e58894f884846f3c656b1369099', '0xb4ec71964b78059552b51eb4578b3a5d02edccdb43eab21f1d3ade827659c3e7'], ['0xd0e6aaf83cb6f7570a8b0d28ad0f33f08d0c5b5bcf02ceb4e60444ad9ebbc042', '0xa612fdff207927dea42b83a60eccefcd08db09f69861d09aa93c44b426e827bc'], ['0x9f57f0f71ec5ab1dc86bba409164816d8312db8f7ad15870666be1f3f57b9d9b', '0xc2934331a462c24b0d706ecdb774eff221bbf570dcef39e7f98da2e7c4c1d916'], ['0x9937ead84c1bed46defcd039152635f32ea92c728fd7e4f242d749148fe9c65e', '0xa890ea307c37f1db4d21a1b19584eac4c82bd9f7ec87fd7e42570d3b739395a2'], ['0x2e90e70604590f72fa855a80336779aef09dc09fd4accad48a1bf5ba58de4599', '0xc5a6c0640e92c37033b64d2e0d2dde60567b90921dbdae2efb0f20ec6a4360fc'], ['0x1909b3749b0799f3dadb9b0daff18b49a5a163fe026981c37f64f448226b601c', '0x69ca46a41007cd4cdc5e84dc42971b97dc8cf653e1a6b670c5733f038ea93b54']]//[[76860218087793983084535703376981386467447611172084071853258931251531655143810,31412445800597707204000296306981535369487689728022294203473644188534598278433],[38383509265263568403091993992632738089196255623116815243548433385026133154873,6177458042690818063654998812321100640246417077410401798821997202074455067658],[109494974759407544115980221650269989415835863198723097195991870480545591748694,88373887815570028484318636992066972615473624433958557212898599653752288516553],[62024398634874066443962845630678733310841268459352721513836874076957014825693,17523914466505763903401497950553046259382636897003925910700830930167415374845],[63717588402740889593319833542751400718873158538928593038126726953424863531161,81834072601552631999151743416373775064561835219024365947336813467257575949287],[94488627319558170444192963521553866738182271320922938361822272954834163056706,75117489132020203438334222530089728350198927250708518444467009567047301998524],[72073121700845816532409909568957092975560328036852544806670390063697244167579,88008882899030566411419232439265353825316367124231879120604152247564011428118],[69302663261811420267463647311565591458354544084275858903094017435028909835870,76244600855121168108544883604098564729610790293645164381848998871531984754082],[21062411477782016300649284598637628528529199124745416083435916321565775381913,89400255616484687868490880757687246913068397762041460105517838105693640679676],[11324961394441086302516068549805884234494603864143349084821232258857030082588,47850239753691939370379379177679604685639311272023121432695464273305267682132]];
    
            receipt = await contractInstance.setCommon(accounts[0], {from:accounts[0]});
            console.log("receipt for setting common address : \n", receipt);
            voteCount = await contractInstance.vote.call((message), '0x16aa89ee28eb2cc154d4353c5d8a4e18126c23814a0df840a1564982c226a0bf', keyImage, s, pub_keys, {from: accounts[0], gas:80000000000});
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