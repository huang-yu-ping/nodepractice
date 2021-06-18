const name = {
    surname: 'huang',
    sayName() {
      console.log(this.surname)
    }
  }
  const age = {
    age: 100
  }
  //multi
  module.exports = {
    name,
    age
  }