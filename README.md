This project was created to check truffles I believe bug

I created 2 very simple contracts, ERC20 and ERC721

ERC20 does nothing in its constructor it calls mint and creates 100 tokens

ERC721 contract has mint implementation in which it not only mints a token, but also deploys  ERC20 token. This is all what this project does. The problem I found is, when I call
mint for ERC721, truffle get result transaction and fall with error, pls see below test dump


    igor.dulger@i-dulger:~/work/test$ truffle test

    Compiling your contracts...
    ===========================
    > Compiling ./contracts/Migrations.sol
    > Compiling ./contracts/Test20.sol
    > Compiling ./contracts/Test721.sol
    > Compiling openzeppelin-solidity/contracts/drafts/Counters.sol
    > Compiling openzeppelin-solidity/contracts/introspection/ERC165.sol
    > Compiling openzeppelin-solidity/contracts/introspection/IERC165.sol
    > Compiling openzeppelin-solidity/contracts/math/SafeMath.sol
    > Compiling openzeppelin-solidity/contracts/token/ERC20/ERC20.sol
    > Compiling openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol
    > Compiling openzeppelin-solidity/contracts/token/ERC20/IERC20.sol
    > Compiling openzeppelin-solidity/contracts/token/ERC721/ERC721.sol
    > Compiling openzeppelin-solidity/contracts/token/ERC721/ERC721Enumerable.sol
    > Compiling openzeppelin-solidity/contracts/token/ERC721/ERC721Full.sol
    > Compiling openzeppelin-solidity/contracts/token/ERC721/ERC721Metadata.sol
    > Compiling openzeppelin-solidity/contracts/token/ERC721/IERC721.sol
    > Compiling openzeppelin-solidity/contracts/token/ERC721/IERC721Enumerable.sol
    > Compiling openzeppelin-solidity/contracts/token/ERC721/IERC721Metadata.sol
    > Compiling openzeppelin-solidity/contracts/token/ERC721/IERC721Receiver.sol
    > Compiling openzeppelin-solidity/contracts/utils/Address.sol
    > Artifacts written to /tmp/test-119229-8400-ut842g.8hnis
    > Compiled successfully using:
       - solc: 0.5.5+commit.47a71e8f.Emscripten.clang



      Contract: Test
        Test ERC20
          ✓ should be created (158ms)
        Test 721
          ✓ should be created (122ms)
          1) Should mint a new ERC20

        Events emitted during test:
        ---------------------------

        Transfer(from: <indexed> 0x0000000000000000000000000000000000000000 (address), to: <indexed> 0x627306090abaB3A6e1400e9345bC60c78a8BEf57 (address), tokenId: <indexed> 0 (uint256))
          2) "after each" hook: after test


      2 passing (1s)
      2 failing

      1) Contract: Test
           Test 721
             Should mint a new ERC20:
         Error: Returned values aren't valid, did it run Out of Gas?
          at ABICoder.decodeParameters (/usr/lib/node_modules/truffle/build/webpack:/~/web3-eth-abi/src/index.js:226:1)
          at ABICoder.decodeParameter (/usr/lib/node_modules/truffle/build/webpack:/~/web3-eth-abi/src/index.js:213:1)
          at /usr/lib/node_modules/truffle/build/webpack:/~/web3-eth-abi/src/index.js:274:14
          at Array.forEach (<anonymous>)
          at ABICoder.decodeLog (/usr/lib/node_modules/truffle/build/webpack:/~/web3-eth-abi/src/index.js:270:1)
          at /usr/lib/node_modules/truffle/build/webpack:/packages/truffle-contract/lib/utils.js:60:1
          at Array.map (<anonymous>)
          at Function.decodeLogs (/usr/lib/node_modules/truffle/build/webpack:/packages/truffle-contract/lib/utils.js:44:1)
          at Promise.receipt (/usr/lib/node_modules/truffle/build/webpack:/packages/truffle-contract/lib/handlers.js:98:1)
          at Promise.emit (/usr/lib/node_modules/truffle/build/webpack:/~/eventemitter3/index.js:89:1)
          at /usr/lib/node_modules/truffle/build/webpack:/~/web3-eth/~/web3-core-method/src/index.js:353:1
          at processTicksAndRejections (internal/process/next_tick.js:81:5)

      2) Contract: Test
           "after each" hook: after test:
         Uncaught Error: Returned values aren't valid, did it run Out of Gas?
          at ABICoder.decodeParameters (/usr/lib/node_modules/truffle/build/webpack:/~/web3-eth-abi/src/index.js:226:1)
          at ABICoder.decodeParameter (/usr/lib/node_modules/truffle/build/webpack:/~/web3-eth-abi/src/index.js:213:1)
          at /usr/lib/node_modules/truffle/build/webpack:/~/web3-eth-abi/src/index.js:274:14
          at Array.forEach (<anonymous>)
          at ABICoder.decodeLog (/usr/lib/node_modules/truffle/build/webpack:/~/web3-eth-abi/src/index.js:270:1)
          at /usr/lib/node_modules/truffle/build/webpack:/packages/truffle-core/lib/testing/testrunner.js:198:1
          at Array.forEach (<anonymous>)
          at /usr/lib/node_modules/truffle/build/webpack:/packages/truffle-core/lib/testing/testrunner.js:187:1
          at intermediary (/usr/lib/node_modules/truffle/build/webpack:/packages/truffle-core/lib/testing/testrunner.js:254:1)
          at /usr/lib/node_modules/truffle/build/webpack:/packages/truffle-provider/wrapper.js:112:1
          at XMLHttpRequest.request.onreadystatechange (/usr/lib/node_modules/truffle/build/webpack:/~/web3/~/web3-providers-http/src/index.js:96:1)
          at XMLHttpRequestEventTarget.dispatchEvent (/usr/lib/node_modules/truffle/build/webpack:/~/xhr2-cookies/dist/xml-http-request-event-target.js:34:1)
          at XMLHttpRequest._setReadyState (/usr/lib/node_modules/truffle/build/webpack:/~/xhr2-cookies/dist/xml-http-request.js:208:1)
          at XMLHttpRequest._onHttpResponseEnd (/usr/lib/node_modules/truffle/build/webpack:/~/xhr2-cookies/dist/xml-http-request.js:318:1)
          at IncomingMessage.<anonymous> (/usr/lib/node_modules/truffle/build/webpack:/~/xhr2-cookies/dist/xml-http-request.js:289:47)
          at endReadableNT (_stream_readable.js:1132:12)
          at processTicksAndRejections (internal/process/next_tick.js:76:17)

If I rename emit Transfer in ERC20 mint function (in openzeppelin library) to emit Transfer1, I also added Transfer1 to IERC20, my tests work as they suppose to work. I think that truffle have some issues with decoding events with the same name which is very strange, these events has different signatures  
