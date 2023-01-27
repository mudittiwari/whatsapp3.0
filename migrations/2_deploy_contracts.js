const whatsapp3=artifacts.require("whatsapp3");
module.exports = function(deployer) {
  // deployer.deploy(SocialNetwork);
  deployer.deploy(whatsapp3);
};