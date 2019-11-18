$(document).ready(function () {
    const MobileNumberRegistryContractAddress = "0x48c168f858C875f02C542e7E7BE3f33A70E7479C";
    const MobileNumberRegistryContractABI = [
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
              "name": "_mobileNumber",
              "type": "string"
            },
            {
              "name": "_lastName",
              "type": "string"
            },
            {
              "name": "_firstName",
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
          "constant": false,
          "inputs": [
            {
              "name": "_mobileNumber",
              "type": "string"
            }
          ],
          "name": "deleteMobileNumber",
          "outputs": [],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [
            {
              "name": "_mobileNumber",
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
            }
          ],
          "payable": false,
          "stateMutability": "view",
          "type": "function"
        }
      ]

    window.ethereum.enable();

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

    $('#linkVerifyMobileNumber').click(function () {
        showView("viewVerifyMobileNumber");
        $('.nav-item').removeClass('active');
        $(this).parent().addClass("active");
        // viewGetDocuments();
    });

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
    }

    function showError(errorMsg) {
        $('#errorBox>p').html("Error: " + errorMsg);
        $('#errorBox').show();
        $('#errorBox>header').click(function () {
            $('#errorBox').hide();
        });
    }

    function uploadMobileNumber() {
        let mobileNumber = $("#idMobileNumber").val();
        let lastName = $('#idLastName').val();
        let firstName = $("#idFirstName").val();

        if(mobileNumber === '' || mobileNumber === null)
            return showError("Mobile Number is required!");

        if(lastName === '' || lastName === null)
            return showError("Lastname is required!");

        if(firstName === '' || firstName === null)
            return showError("Firstname is required!");

        if(typeof web3 === 'undefined')
            return showError("Please install Metamask to access the Ethereum Web3 API from your browser");

        let contract = web3.eth.contract(MobileNumberRegistryContractABI).at(MobileNumberRegistryContractAddress);

        contract.addMobileNumber(mobileNumber, lastName, firstName, function(err, txHash) {
            if(err)
                showError("Smart contract call failed: "  + err);

            showInfo(`Mobile number ${mobileNumber} has been added successfully to the regitry. Transaction hash: ${txHash}`);
        });
    }

    function verifyMobileNumber() {
        let mobileNumber = $("#idMobileNumberVerify").val();

        if(mobileNumber === '' || mobileNumber === null)
            return showError("Mobile Number is required!");

        if(typeof web3 === 'undefined')
            return showError("Please install Metamask to access the Ethereum Web3 API from your browser");

        let contract = web3.eth.contract(MobileNumberRegistryContractABI).at(MobileNumberRegistryContractAddress);

        contract.checkMobileNumber(mobileNumber, function (err, result) {
            if(err)
                showError("Smart contract call failed: " + err);

            showInfo(`The mobile number: ${mobileNumber} is owned by ${result[1]} ${result[1]}.`);

        });
    }

});