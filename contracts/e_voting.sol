pragma solidity >=0.4.0 <0.6.0;
// pragma experimental ABIEncoderV2;
import "./LSAG.sol";
// import "./LSAG_original.sol";

contract EVoting {

    struct Voter {
        uint weight;
        bool voted;
        uint8 vote;
        address delegate;
    }

    struct Proposal {
        uint voteCount;
    }
    
    struct keyImages {
        uint256 x;
        uint256 y;
    }

    address chairperson;
    mapping(address => Voter) voters;
    Proposal[] proposals;
    uint256[2][] _pub_keys;
    keyImages[] I_array;
    address common;

    /// Create a new ballot with $(_numProposals, Proposals[] prop, uint256[2][] pubkeys) different proposals.
    /// Initializing Public Keys, Proposal length
    constructor(/*uint8 _proposals, address common_address, uint256[2][] memory _pubkeys, uint256 num_members*/) public {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;
        proposals.length = 3;
        // for (uint i = 0; i < num_members; i++) {
        //     pub_keys.push(_pubkeys[i]);
        // }
        _pub_keys =  [[76860218087793983084535703376981386467447611172084071853258931251531655143810,31412445800597707204000296306981535369487689728022294203473644188534598278433],[38383509265263568403091993992632738089196255623116815243548433385026133154873,6177458042690818063654998812321100640246417077410401798821997202074455067658],[109494974759407544115980221650269989415835863198723097195991870480545591748694,88373887815570028484318636992066972615473624433958557212898599653752288516553],[62024398634874066443962845630678733310841268459352721513836874076957014825693,17523914466505763903401497950553046259382636897003925910700830930167415374845],[63717588402740889593319833542751400718873158538928593038126726953424863531161,81834072601552631999151743416373775064561835219024365947336813467257575949287],[94488627319558170444192963521553866738182271320922938361822272954834163056706,75117489132020203438334222530089728350198927250708518444467009567047301998524],[72073121700845816532409909568957092975560328036852544806670390063697244167579,88008882899030566411419232439265353825316367124231879120604152247564011428118],[69302663261811420267463647311565591458354544084275858903094017435028909835870,76244600855121168108544883604098564729610790293645164381848998871531984754082],[21062411477782016300649284598637628528529199124745416083435916321565775381913,89400255616484687868490880757687246913068397762041460105517838105693640679676],[11324961394441086302516068549805884234494603864143349084821232258857030082588,47850239753691939370379379177679604685639311272023121432695464273305267682132]];

        // pub_keys = [[57821270388025671679082986323759317106236019579646704630239591681422142402873, 81852641370837570497548634207073850211297355610253263906104967633874362469602], [25712850812449497645081724081388342780477851750572903542985504942115721367043, 7928418776134213981488203910441805777302498711166840436627074750328926186440]];
        
        common = 0x17458104Da8654E7C067e3410a65080D9dDB14F3;
        
    }
    
    function setCommon(address _common) public {
        require(msg.sender == chairperson, "sender is not the chairperson. cant set the common address");
        common = _common;
    }

    function bytesToUint(bytes memory b) internal returns (uint256){
        uint256 number;
        for(uint i=0;i<b.length;i++){
            number = number + uint8(b[i])*(2**(8*(b.length-(i+1))));
        }
        return number;
    }

    /// Give $(toVoter) the right to vote on this ballot.
    /// May only be called by $(chairperson).
    // function giveRightToVote(address toVoter) public {
    //     if (msg.sender != chairperson || voters[toVoter].voted) return;
    //     voters[toVoter].weight = 1;
    // }

    /// Delegate your vote to the voter $(to).
    // function delegate(address to) public {
    //     Voter storage sender = voters[msg.sender]; // assigns reference
    //     if (sender.voted) return;
    //     while (voters[to].delegate != address(0) && voters[to].delegate != msg.sender)
    //         to = voters[to].delegate;
    //     if (to == msg.sender) return;
    //     sender.voted = true;
    //     sender.delegate = to;
    //     Voter storage delegateTo = voters[to];
    //     if (delegateTo.voted)
    //         proposals[delegateTo.vote].voteCount += sender.weight;
    //     else
    //         delegateTo.weight += sender.weight;
    // }
    
    
    function LSAG_verify(bytes memory message, uint256 c0, uint256[2] memory keyImage, uint256[] memory s, uint256[2][] memory publicKeys) internal returns (bool) {
        bool status = LSAG.verify(message, c0, keyImage, s, publicKeys);
        return status;
        
        if (!status) return false;
        for(uint i=0; i<I_array.length; i++) {
            if (keyImage[0] == I_array[i].x && keyImage[1] == I_array[i].y) return false;
        }
        keyImages memory new_keyimage;
        new_keyimage.x = keyImage[0];
        new_keyimage.y = keyImage[1];
        I_array.push(new_keyimage);
        return true;

    }
    
    /// Give a single vote to proposal $(toProposal).
    function vote(uint message, uint256 c0, uint256[2] memory keyImage, uint256[] memory s, uint256[2][] memory pub_keys) public returns (uint){
        bytes memory message = toBytes(message);
        require(msg.sender == common, "sender is not the common address");

        require(LSAG_verify(message, c0, keyImage, s, pub_keys), "lsag verification didn't work"); 
        require(1==0, "Working till here");
        proposals[bytesToUint(message)-1].voteCount++;
        return proposals[bytesToUint(message)-1].voteCount;
        // Voter storage sender = voters[msg.sender];
        // if (sender.voted || toProposal >= proposals.length) return;
        // sender.voted = true;
        // sender.vote = toProposal;
        // proposals[toProposal].voteCount += sender.weight;
    }

    function winningProposal() public view returns (uint8 _winningProposal) {
        uint256 winningVoteCount = 0;
        for (uint8 prop = 0; prop < proposals.length; prop++)
            if (proposals[prop].voteCount > winningVoteCount) {
                winningVoteCount = proposals[prop].voteCount;
                _winningProposal = prop;
            }
    }


    // function to convert uint to bytes
    function toBytes(uint256 x) public returns (bytes memory b) {
    b = new bytes(32);
    assembly { mstore(add(b, 32), x) }
}

}
