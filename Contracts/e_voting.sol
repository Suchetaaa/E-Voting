pragma solidity >=0.5.0 <0.6.0;
pragma experimental ABIEncoderV2;
import "./LSAG.sol";

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
    uint256[2][] pub_keys;
    keyImages[] I_array;
    address common;

    /// Create a new ballot with $(_numProposals, Proposals[] prop, uint256[] pubkeys) different proposals.
    /// Initializing Public Keys, Proposal length
    constructor() public {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;
        proposals.length = 10;
        // for (uint i = 0; i < num_members; i++) {
        //     pub_keys.push(_pubkeys[i]);
        // }
        // pub_keys = _pubkeys;
        pub_keys = [[57821270388025671679082986323759317106236019579646704630239591681422142402873, 81852641370837570497548634207073850211297355610253263906104967633874362469602], [25712850812449497645081724081388342780477851750572903542985504942115721367043, 7928418776134213981488203910441805777302498711166840436627074750328926186440]];
        
        common = 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c;
        
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
    function vote(bytes memory message, uint256 c0, uint256[2] memory keyImage, uint256[] memory s, uint256[2][] memory pub_keys) public {
        require(msg.sender == common);
        require(LSAG_verify(message, c0, keyImage, s, pub_keys)); 
        proposals[bytesToUint(message)-1].voteCount++;
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
}
