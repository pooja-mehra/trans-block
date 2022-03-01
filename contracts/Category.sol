// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract Category{

    struct Topic{
        uint8 topicId;
        string topicName;
    }

    
    Topic[] public topics; 
    uint8 index = 0;
    mapping(uint8 => uint8) upVoteByTopic;
    mapping(uint8 => uint8) downVoteByTopic;
    
    
    function setTopics(string memory topicName) public {
        index = uint8(topics.length);
        topics.push(Topic(index, topicName));
    } 

    function getTopics() public view returns(Topic [] memory) {
        return topics;
    }

}