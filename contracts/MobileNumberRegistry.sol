pragma solidity ^0.5.8;


contract MobileNumberRegistry {

    struct MobileNumberData {
        string photoHash;
        string lastName;
        string firstName;
    }

    address private contractOwner;
    mapping (string => MobileNumberData) registry;
    mapping (address => bool) administrators;

    constructor() public {
        contractOwner = msg.sender;
        administrators[msg.sender] = true;
    }

    modifier onlyOwner() {
        require(contractOwner == msg.sender, "Only the contract owner is allowed to do this!");
        _;
    }

    modifier onlyAdministrator() {
        require(isAdministrator(msg.sender), "Only administrators are allowed to to this!");
        _;
    }

    function getOwner() public view returns(address) {
        return contractOwner;
    }

    function addAdministrator(address _addr) public onlyOwner {
        administrators[_addr] = true;
    }

    function deleteAdministrator(address _addr) public onlyOwner {
        administrators[_addr] = false;
    }

    function isAdministrator(address _addr) public view returns(bool) {
        return administrators[_addr];
    }

    function addMobileNumber(string memory _mobileNumber,
                                string memory _photoHash,
                                string memory _lastName,
                                string memory _firstName) public onlyAdministrator {

        registry[_mobileNumber] = MobileNumberData({
            photoHash : _photoHash,
            lastName : _lastName,
            firstName : _firstName
        });

    }

    function deleteMobileNumber(string memory _mobileNumber) public onlyAdministrator {
        registry[_mobileNumber] = MobileNumberData({
            photoHash : "",
            lastName : "",
            firstName : ""
        });
    }

    function checkMobileNumber(string memory _mobileNumber) public view
                        returns(string memory, string memory, string memory) {

        MobileNumberData memory md = registry[_mobileNumber];

        return(md.photoHash, md.lastName, md.firstName);
    }
}