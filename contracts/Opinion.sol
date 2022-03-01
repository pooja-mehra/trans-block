pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;
import './Base.sol';
import './Category.sol';

contract Opinion is Base, Category{

    mapping(uint8 => address)votedTopic;
    mapping(address => uint8)votedAddress;
    event alreadyVoted(string votedMsg);
    bool isVoted = true;

    function checkVote(uint8 topicId) public view returns(bool) {
        if(votedTopic[topicId] == msg.sender && votedAddress[msg.sender] > 0){
            return isVoted;
        }
    }

    function setVote(uint8 topicId, bool vote) public {
        if(vote == true){
            upVoteByTopic[topicId]++;
        }
        if(vote == false){
            downVoteByTopic[topicId]++;
        }
        votedAddress[msg.sender]++;
        votedTopic[topicId] = msg.sender;
    }

    function getVote(uint8 topicId) public view  returns(uint8, uint8) {
        return ( upVoteByTopic[topicId], downVoteByTopic[topicId]);
    }

}