
// mocha & chai assert
var assert = require('chai').assert
  , foo = 'bars'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

describe('string var foo (using assert)', ()=>{
  it('should be type of string', ()=>{
    assert.typeOf(foo, 'string'); // without optional message
    assert.typeOf(foo, 'string', 'foo is a string'); // with optional message
  })
  it('should be correct length', ()=>{
    assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
  })
})

describe('beverages object (using expect)', ()=>{
  it('tea field should be correct length', ()=>{
    assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');
  })
})  


// mocha & chai expect
var expect = require('chai').expect
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
describe('string var foo (using expect)', ()=>{
    it('should be type of string', ()=>{
      expect(foo).to.be.a('string');
    })
    it('should be correct length', ()=>{
      expect(foo).to.have.lengthOf(3);
    })
})


// mocha & chai should
var should = require('chai').should() //actually call the function
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

  describe('string var foo (using should)', ()=>{
    it('should be type of string', ()=>{
      foo.should.be.a('string');
    })
    it('should be correct length', ()=>{
      foo.should.have.lengthOf(3);
    })
    it('should be correct value', ()=>{
      foo.should.equal('bar');
    })

})

describe('beverages object (using should)', ()=>{
  it('tea field should be correct length', ()=>{
    beverages.should.have.property('tea').with.lengthOf(3);
  })
})  


