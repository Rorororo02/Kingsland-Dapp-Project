pragma solidity ^0.5.8;


contract MobileNumberRegistry {

    struct MobileNumberData {
        string lastName;
        string firstName;
        string photoHash;
    }

    address private contractOwner;
    mapping (string => MobileNumberData) registry;
    mapping (address => bool) administrators;

    constructor() public {
        contractOwner = msg.sender;
        administrators[msg.sender] = true;
    }

    event AddAdministratorEvent(address addr, string message);
    event DeleteAdministratorEvent(address addr, string message);
    event AddMobileNumberDataEvent(string mobileNumberHash, string photoHash, string lastName, string firstName, string message);

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

    function isAdministrator(address _addr) public view returns(bool) {
        return administrators[_addr];
    }

    function addAdministrator(address _addr) public onlyOwner {
        administrators[_addr] = true;
        emit AddAdministratorEvent(_addr, "Administrator added");
    }

    function deleteAdministrator(address _addr) public onlyOwner {
        administrators[_addr] = false;
        emit DeleteAdministratorEvent(_addr, "Administrator removed");
    }

    function addMobileNumber(string memory _mobileNumberHash,
                                string memory _lastName,
                                string memory _firstName,
                                string memory _photoHash) public onlyAdministrator {

        registry[_mobileNumberHash] = MobileNumberData({
            lastName : _lastName,
            firstName : _firstName,
            photoHash : _photoHash
        });

        emit AddMobileNumberDataEvent(_mobileNumberHash, _photoHash, _lastName, _firstName, "New mobile number data added");


    }

    function checkMobileNumber(string memory _mobileNumberHash) public view
                        returns(string memory, string memory, string memory) {

        MobileNumberData memory md = registry[_mobileNumberHash];

        return(md.firstName, md.lastName, md.photoHash);
    }
}