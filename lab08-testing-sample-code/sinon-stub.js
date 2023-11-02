var sinon = require('sinon');

function rollDice() {
    return -1 * Math.floor(Math.random() * 6) + 1;
}
describe("When rollDice gets called", function() {
    
    it("Math#random should be called with no arguments", function() {
        sinon.stub(Math, "random");
        rollDice();
        console.log(Math.random.calledWith());
    });
    after(function(){
        //http.get.restore(); // fail
        Math.random.restore(); // pass
        /*to restore the original method that was stubbed 
        inside one of the it blocks, so that if
        another describe block makes use of http.get,
        we won't see the stub, but
        the original method.*/
    });
})
