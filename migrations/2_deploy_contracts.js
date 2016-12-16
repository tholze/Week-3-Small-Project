module.exports = function(deployer) {
  //deployer.deploy(ConvertLib);
  //deployer.autolink();
  deployer.deploy(Splitter, "0xdfa828d521daafb54aefec680d159bb85ec4612c", "0xc31725874c49d026d0ea965b0db2945cc41e11ce");
};
