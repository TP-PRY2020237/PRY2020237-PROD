export default class UserModel {
    id = "";
    firstName = "";
    lastName = "";
    email = "";
    password = "";
    token = "";

    constructor(id,firstName, lastName, email, password, token) 
    {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
      this.token = token;
    }
    getFullName()
    {
      return this.firstName+' '+ this.lastName;
    }
    getFirstName()
    {
      return this.firstName;
    }
    getLastName()
    {
      return this.lastName;
    }
    getEmail()
    {
      return this.email;
    }        
    getPassword()
    {
      return this.password;
    }        
    getToken()
    {
      return this.token;
    }        
}