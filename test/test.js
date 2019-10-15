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
            var keyImage = ['0xD8FDDC626BB529C6C6CEB75802D19CD35730262AF50DB73BCA66F78EF8BBBEAE', '0x2F94D4F960D49EF829598E2D24417AA51F2543A4DD8A8BE17370C1C7A4CE7DA5'];
            var s = ['0xA0D282A0F578BDADC738872FA11F27EC33619D79C92FEDDF2214BD7EB3367A7D', '0xAB154449D5F4A1EA821BC8B22E5F098E9A58578A8ACF49DA9812B58E76F9E5B9', '0xF5619A2DABDECA8B1F4C899374A690C954478EB5317212C7662CBC32F8C556ED', '0xA85D7AD78E2CE275D19201EB55FE361843D93B45574DA3F8FDC7B8AEED7AF169'];
            var pub_keys = [['0xED892629518E597E97118FFB7485BB330A1FBECDAFDDE8F99359FD8BA5F30C0E', '0x20878CA9F945BA3A7ACB2CD1C7432D5D34023E3AE4ADA480E2464DFEF5BEC6A'],['0x1A2614B6AC88513162FBB07D7D13181163402B04C718AF6214F085AFE1423C1E', '0xD76073D05DF7CCE4402A1CF9130FBEE1522D92E95116EEE1714D09558FCB4E98'],['0x932D0294D728ECB87D0936ACF3B09DBE09340C3C1403E5B17888B094450B893B', '0xF1B5CB74F89606122305010AE4C98098B7F4901BB6ADC1484AD2FDAD2A1E627D'],['0xFFDEA02CE11511312DD7EFAD6AC3F761733D0DA281666B6004AADAEF973899C1', '0x97F4C7EC7FBF8D89D10E1080CF6D50599DC95C5E718148D751D34C4DF33D33F7']];
            receipt = await contractInstance.setCommon(accounts[0], {from:accounts[0]});
            console.log("receipt for setting common address : \n", receipt);
            voteCount = await contractInstance.vote.call((message), '0x308868B1359F860171DDA961095506BC2A7FFE1F1BA9ED9F2BB556F5CB582018', keyImage, s, pub_keys, {from: accounts[0], gas:80000000000});
    
            assert.equal(voteCount, 1);
    
        
        });
    })
})
    