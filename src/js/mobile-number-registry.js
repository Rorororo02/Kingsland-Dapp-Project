$(document).ready(function () {
    const DocumentRegistryContractAddress = "";
    const DocumentRegistryContractABI = []

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

    // $('#documentUploadButton').click(uploadDocument);

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

    // function uploadDocument() {
    //     if($("#documentForUpload")[0].files.length == 0)
    //         showError("Please select a file to upload.");

    //     let fileReader = new FileReader();

    //     fileReader.onload = function () {
    //         if(typeof web3 === 'undefined')
    //             return showError("Please install Metamask to access the Ethereum Web3 API from your browser");

    //         let fileBuffer = Buffer.from(fileReader.result);

    //         let contract = web3.eth.contract(DocumentRegistryContractABI).at(DocumentRegistryContractAddress);
    //         IPFS.files.add(fileBuffer, (err, result) => {
    //             if(err)
    //                 return showError(err);
    //             if(result) {
    //                 let ipfsHash = result[0].hash;
    //                 contract.add(ipfsHash, function(err, txHash) {
    //                     if(err)
    //                         showError("Smart contract call failed: "  + err);

    //                     showInfo(`Document ${ipfsHash}<b>successfuly added </b>to the regitry. Transaction hash: ${txHash}`);
    //                 });
    //             }
    //         });
    //     };

    //     fileReader.readAsArrayBuffer($("#documentForUpload")[0].files[0]);
    // }

    // function viewGetDocuments() {
    //     if(typeof web3 === 'undefined')
    //         return showError("Please install Metamask to access the Ethereum Web3 API from your browser");

    //     let contract = web3.eth.contract(DocumentRegistryContractABI).at(DocumentRegistryContractAddress);

    //     contract.getDocumentsCount(function (err, result) {
    //          if(err)
    //             showError("Smart contract call failed: " + err);

    //         let documentCount = result.toNumber();

    //         if(documentCount > 0) {
    //             let html = $('<div>');
    //             for(let i = 0; i < documentCount; i++) {
    //                 contract.getDocument(i, function(err, result) {
    //                     if(err)
    //                         showError("Smart contract call failed: " + err);

    //                     let ipfsHash = result[0];
    //                     let contractPublishDate = result[1];
    //                     let div = $('<div>');
    //                     let url = "https://ipfs.io/ipfs/" + ipfsHash;

    //                     let displayDate = new Date(contractPublishDate *1000).toLocaleString();
    //                     console.log(displayDate);
    //                     div.append(`<p>Document published on ${displayDate}</p>`);
    //                     div.append($(`<img src="${url}">`));

    //                     html.append(div);
    //                 });
    //             }
    //             html.append("</div>");
    //             $("#viewGetDocuments").append(html);
    //         } else {
    //             $("#viewGetDocuments").append('<div> No documents in the registry</div>');
    //         }
    //     });
    // }

});