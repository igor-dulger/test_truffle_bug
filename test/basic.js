const Test20 = artifacts.require("./Test20.sol");
const Test721 = artifacts.require("./Test721.sol");

// const totalSupply100 = web3.utils.toWei("100", 'ether');
const totalSupply100 = web3.utils.toWei('100', 'ether');

contract('Test', accounts => {

  describe("Test ERC20", async () => {
    it("should be created", async () => {
      let instance = await Test20.new("Car20", "CAR20", accounts[0]);
      // console.log(instance);
      assert.equal("Car20", await instance.name.call());
      assert.equal("CAR20", await instance.symbol.call());
      let totalSupply = await instance.totalSupply.call();
      assert.equal(totalSupply100, totalSupply.toString());
      assert.equal(totalSupply100, (await instance.balanceOf.call(accounts[0])).toString());
    });
  });

  describe("Test 721", async () => {
    it("should be created", async () => {
      let car721 = await Test721.new("Car", "CAR");
      assert.equal("Car", await car721.name.call());
      assert.equal("CAR", await car721.symbol.call());
    });

    it("Should mint a new ERC20", async () => {
      let car721 = await Test721.new("Car", "CAR");
      let tx = await car721.mint("Audi", "AUD", {
        from: accounts[0]
      });

      assert.equal(1, await car721.totalSupply.call());
      assert.equal(1, await car721.balanceOf.call(accounts[0]));
      assert.equal(accounts[0], await car721.ownerOf.call(0));
    });
  });
});