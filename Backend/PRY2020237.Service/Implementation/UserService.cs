using System.Collections.Generic;
using PRY2020237.Entity;
using PRY2020237.Repository;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;
//instalar Microsoft.Extensions.Configuration.Json
namespace PRY2020237.Service.implementation
{
    public class UserService : IUserService
    {

        private IUserRepository userRepository;
        
        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public bool Delete(int id, string tokenLogin)
        {
            return userRepository.Delete(id, tokenLogin);
        }

       
        public bool Save(User entity, string tokenLogin)
        {
            //Acá la encriptación
            var objEncrypt = new Encrypt();

             
            string pass = objEncrypt.EncryptText(entity.password, new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("Values")["Password"]);

            User newUser = new User
            {
                firstName = entity.firstName,
                lastName = entity.lastName,
                email = entity.email,
                token = entity.token,
                password = pass

            };



            return userRepository.Save(newUser, "");
        }

        public bool UpdateTrue(User entity, string tokenLogin)
        {
            return userRepository.UpdateTrue(entity, tokenLogin);
        }
        public bool Update(User entity, string tokenLogin)
        {
            return userRepository.Update(entity, tokenLogin);
        }
        public IEnumerable<User> GetAll()
        {
            return userRepository.GetAll();
        }

        public User Get(int id, string tokenLogin )
        {
            return userRepository.Get(id, tokenLogin);
        }

        public User GetByEmail(string email)
        {
            return userRepository.GetByEmail(email);
        }

        public User Login(string email, string password)
        {
            
            return userRepository.Login(email, password);
        }

        public bool ValidateToken(string token)
        {
            var user = userRepository.GetByTokenValidate(token);
            return user;
        }
        public bool UpdatePassword(User entity)
        {
            var user = userRepository.GetByToken(entity.token);
            //var user2 = userRepository.GetByEmail(entity.email);
            if (user != null /*&& user2.email != null*/)
            {
                var objEncrypt = new Encrypt();
                string pass = objEncrypt.EncryptText(entity.password, new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("Values")["Password"]);
                user.password = pass;
                user.token = "";
                return userRepository.Update(user, "");
            }
            return false;
        }
    }
}