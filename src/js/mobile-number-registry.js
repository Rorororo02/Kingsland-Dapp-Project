$(document).ready(function () {
    const MobileNumberRegistryContractAddress = "0xD357263aC12A23e441CDDa889e5211084779fCe9";
    const MobileNumberRegistryContractABI =  [
      {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getOwner",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_addr",
            "type": "address"
          }
        ],
        "name": "isAdministrator",
        "outputs": [
          {
            "name": "",
            "type": "bool"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_addr",
            "type": "address"
          }
        ],
        "name": "addAdministrator",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_addr",
            "type": "address"
          }
        ],
        "name": "deleteAdministrator",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_mobileNumberHash",
            "type": "string"
          },
          {
            "name": "_lastName",
            "type": "string"
          },
          {
            "name": "_firstName",
            "type": "string"
          },
          {
            "name": "_photoHash",
            "type": "string"
          }
        ],
        "name": "addMobileNumber",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_mobileNumberHash",
            "type": "string"
          }
        ],
        "name": "checkMobileNumber",
        "outputs": [
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "string"
          },
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      }
    ]

    window.ethereum.enable();

    const IPFS = window.IpfsApi('ipfs.infura.io', '5001', {protocol : 'https'});
    const Buffer = IPFS.Buffer;

    $('#linkHome').click(function () {
        showView("viewHome");
        $('.nav-item').removeClass('active');
        $(this).parent().addClass("active");
    });

    $('#linkRegisterMobileNumber').click(function () {
        showView("viewRegisterMobileNumber")
        $('.nav-item').removeClass('active');
        $(this).parent().addClass("active");
    });

    $('#linkAddAdministrator').click(function () {
        showView("viewAddAdministrator")
        $('.nav-item').removeClass('active');
        $(this).parent().addClass("active");
    });

    $('#linkRemoveAdministrator').click(function () {
        showView("viewRemoveAdministrator")
        $('.nav-item').removeClass('active');
        $(this).parent().addClass("active");
    });

    $('#linkVerifyMobileNumber').click(function () {
        showView("viewVerifyMobileNumber");
        $('.nav-item').removeClass('active');
        $(this).parent().addClass("active");
        $("#queryResult").empty();
    });

    $("#idAddAdministratorButton").click(addAdministrator);
    $("#idRemoveAdministratorButton").click(removeAdministrator);

    $('#idMobileNumberSubmitButton').click(uploadMobileNumber);
    $('#idMobileNumberVerifyButton').click(verifyMobileNumber);

    // Attach AJAX "loading" event listener
    $(document).on({
        ajaxStart: function () {
            $("#loadingBox").show()
        },
        ajaxStop: function () {
            $("#loadingBox").hide()
        }
    });

    function showView(viewName) {
        // Hide all views and show the selected view only
        $('body > section').hide();
        $('#' + viewName).show();
    }

    function showInfo(message) {
        $('#infoBox>p').html(message);
        $('#infoBox').show();
        $('#infoBox>header').click(function () {
            $('#infoBox').hide();
        });
        $('#infoBox').delay(5000).fadeOut(300);
    }

    function showError(errorMsg) {
        $('#errorBox>p').html("Error: " + errorMsg);
        $('#errorBox').show();
        $('#errorBox>header').click(function () {
            $('#errorBox').hide();
        });
        $('#errorBox').delay(5000).fadeOut(300);
    }


    function addAdministrator() {
        let ethAddr = $("#idAddAdminstratorAddress").val();

        if(ethAddr === '' || ethAddr === null)
            return showError("Ethereum address is required!");

        if(!isAddress(ethAddr))
            return showError("Invalid ethereum address!");

        if(typeof web3 === 'undefined')
            return showError("Please install Metamask to access the Ethereum Web3 API from your browser");

        let contract = web3.eth.contract(MobileNumberRegistryContractABI).at(MobileNumberRegistryContractAddress);

        contract.addAdministrator(ethAddr, function(err, txHash) {
            if(err)
                return showError("Only the contract owner can add administrators!");

            showInfo(`Successfully added ${ethAddr} as and Administrator. Transaction hash: ${txHash}`);
            $("#idAddAdminstratorAddress").val("");
        });
    }

    function removeAdministrator() {
        let ethAddr = $("#idRemoveAdminstratorAddress").val();

        if(ethAddr === '' || ethAddr === null)
            return showError("Ethereum address is required!");

        if(!isAddress(ethAddr))
            return showError("Invalid ethereum address!");

        if(typeof web3 === 'undefined')
            return showError("Please install Metamask to access the Ethereum Web3 API from your browser");

        let contract = web3.eth.contract(MobileNumberRegistryContractABI).at(MobileNumberRegistryContractAddress);

        contract.deleteAdministrator(ethAddr, function(err, txHash) {
            if(err)
                return showError("Only the contract owner can remove administrators!");

            showInfo(`Successfully removed ${ethAddr} as an Administrator. Transaction hash: ${txHash}`);
            $("#idRemoveAdminstratorAddress").val("");
        });
    }


    function uploadMobileNumber() {
        if($("#idPhoto")[0].files.length == 0)
            return showError("Please select a file to upload.");

        let mobileNumber = $("#idMobileNumber").val();
        let lastName = $('#idLastName').val();
        let firstName = $("#idFirstName").val();

        if(mobileNumber === '' || mobileNumber === null)
            return showError("Mobile Number is required!");

        if(firstName === '' || firstName === null)
            return showError("Firstname is required!");

        if(lastName === '' || lastName === null)
            return showError("Lastname is required!");

        let mobileHash = CryptoJS.SHA256(mobileNumber).toString();

        let fileReader = new FileReader();

        fileReader.onload = function () {
            if(typeof web3 === 'undefined')
                return showError("Please install Metamask to access the Ethereum Web3 API from your browser");

            let fileBuffer = Buffer.from(fileReader.result);

            let contract = web3.eth.contract(MobileNumberRegistryContractABI).at(MobileNumberRegistryContractAddress);
            IPFS.files.add(fileBuffer, (err, result) => {
                if(err)
                    return showError(err);
                if(result) {
                    let ipfsHash = result[0].hash;
                    contract.addMobileNumber(mobileHash, lastName, firstName, ipfsHash, function(err, txHash) {
                      if(err)
                          return showError("Only administrators can add mobile number registry!");

                      showInfo(`Mobile number ${mobileNumber} has been added successfully to the registry. Transaction hash: ${txHash}`);
                      $("#idMobileNumber").val("");
                      $("#idFirstName").val("");
                      $('#idLastName').val("");
                      $('#idPhoto').val("");

                  });
                }
            });
        };

        fileReader.readAsArrayBuffer($("#idPhoto")[0].files[0]);
    }

    function verifyMobileNumber() {
        $("#queryResult").empty();
        let mobileNumber = $("#idMobileNumberVerify").val();

        if(mobileNumber === '' || mobileNumber === null)
            return showError("Mobile Number is required!");

        if(typeof web3 === 'undefined')
            return showError("Please install Metamask to access the Ethereum Web3 API from your browser");

        let mobileHash = CryptoJS.SHA256(mobileNumber).toString();

        let contract = web3.eth.contract(MobileNumberRegistryContractABI).at(MobileNumberRegistryContractAddress);

        contract.checkMobileNumber(mobileHash, function (err, result) {
            if(err)
                return showError("Failed to read from smart contract. Please try again later.");

            let firstName = result[0];
            let lastName = result[1];
            let photoHash = result[2];

            if(firstName !== "" && lastName !== "" && photoHash !== "") {
                let url = "http://ipfs.io/ipfs/" + photoHash;

                var elem = `<div class="col col-md-4"><img src="${url}"></div>
                            <div class="col col-md-8">
                              <h4> The mobile number ${mobileNumber} belongs to...</h4>
                              <p> Lastname : ${lastName} </p>
                              <p> Firstname : ${firstName} </p>
                            </div>`
                $("#queryResult").append(elem);
                $("#idMobileNumberVerify").val("");
                showInfo("Mobile number found!");
            } else {
              showInfo("Mobile number is not registered yet.");
            }

        });
    }

    // got from stackoverflow
    /**
     * Checks if the given string is an address
     *
     * @method isAddress
     * @param {String} address the given HEX adress
     * @return {Boolean}
    */
    var isAddress = function (address) {
        if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
            // check if it has the basic requirements of an address
            return false;
        } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
            // If it's all small caps or all all caps, return true
            return true;
        } else {
            // Otherwise check each case
            return isChecksumAddress(address);
        }
    };

    /**
     * Checks if the given string is a checksummed address
     *
     * @method isChecksumAddress
     * @param {String} address the given HEX adress
     * @return {Boolean}
    */
    var isChecksumAddress = function (address) {
        // Check each case
        address = address.replace('0x','');
        var addressHash = CryptoJS.SHA3(address.toLowerCase(), { outputLength: 256 });
        for (var i = 0; i < 40; i++ ) {
            // the nth letter should be uppercase if the nth digit of casemap is 1
            if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
                return false;
            }
        }
        return true;
    };

});