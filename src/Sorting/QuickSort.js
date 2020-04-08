
function Person(first, last, age, gender, interests) {
  
    // property and method definitions
    this.name = {
      'first': first,
      'last' : last
    };
    this.age = age;
    this.gender = gender;
    //...see link in summary above for full definition
  }

Person.prototype.name = function () {
    return this.firstName + " " + this.lastName
}


export default Person;