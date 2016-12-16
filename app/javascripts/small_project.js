var sp;
var addressA;
var addressB;
var addressCB;
var addressContract;

if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}



function setStatus(message) {
	var status = document.getElementById("status");
	status.innerHTML = message;
}



function setAddress() {
  //Fill in the addressfields on the HTML page
  document.getElementById("addressA").innerHTML = addressA;
  document.getElementById("addressB").innerHTML = addressB;
  document.getElementById("addressCoinbase").innerHTML = addressCB;
	document.getElementById("addressContract").innerHTML = addressContract;
}



function refreshBalances() {
  //update Balances on the HTML page
  document.getElementById("balanceA").innerHTML = web3.fromWei(web3.eth.getBalance(addressA), "ether").toFixed(5);
  document.getElementById("balanceB").innerHTML = web3.fromWei(web3.eth.getBalance(addressB), "ether").toFixed(5);
  document.getElementById("balanceCoinbase").innerHTML = web3.fromWei(web3.eth.getBalance(addressCB), "ether").toFixed(5);
  document.getElementById("balanceContract").innerHTML = web3.fromWei(web3.eth.getBalance(addressContract), "ether").toFixed(5);
}



function split() {
  var amount = web3.toWei(parseFloat(document.getElementById("amount").value), "ether");
  setStatus("Initiating transaction... (please wait)");

  web3.eth.sendTransaction({from: addressCB, to: addressContract, value: amount}, function(error, result){
    if(error){
      console.log(error);
      setStatus("Error sending amount; see log.");
    }
    else{
      setStatus("Transaction sent");
      web3.eth.getTransactionReceiptMined(result)
        .then(function(receipt) {
          setStatus("Transaction complete!");
          refreshBalances();
        })
        .catch(function(e) {
          console.log(e);
          setStatus("Error mining transaction; see log.");
        })
    }
  });
}



window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    sp = Splitter.deployed();
    addressCB = web3.eth.coinbase;
    addressContract = sp.address;

    sp.A.call()
    .then(function(value){
      addressA = value;
      return sp.B.call();
    })
    .then(function(value){
      addressB = value;
    })
    .then(function(){
      setAddress();
    })
    .then(function(){
      refreshBalances();
    })
    .catch(function(e){
      console.log(error);
    });
    
  });

  web3.eth.getTransactionReceiptMined = function (txnHash, interval) {
    var transactionReceiptAsync;
    interval |= 500;
    transactionReceiptAsync = function(txnHash, resolve, reject) {
        try {
            var receipt = web3.eth.getTransactionReceipt(txnHash);
            if (receipt == null) {
                setTimeout(function () {
                    transactionReceiptAsync(txnHash, resolve, reject);
                }, interval);
            } else {
                resolve(receipt);
            }
        } catch(e) {
            reject(e);
        }
    };

    return new Promise(function (resolve, reject) {
        transactionReceiptAsync(txnHash, resolve, reject);
    });
  };
}