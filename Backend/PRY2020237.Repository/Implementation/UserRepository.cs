using System.Collections.Generic;
using System.Linq;
using PRY2020237.Repository.Context;
using PRY2020237.Entity;
using PRY2020237.Repository;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Web.Mvc;
//INSTALAR Microsoft.IdentityModel.Tokens 6.9.0
//INSTALAR Microsoft.IdentityModel.Tokens.Jwt 6.9.0
//INSTALAR Microsoft.AspNetCore.Authentication.JwtBearer 3.1.1
//INSTALAR Microsoft.AspNet.MVC
namespace PRY2020237.RepositoRy.implementation
{
    public class UserRepository : IUserRepository
    {
        private ApplicationDbContext context;
        private readonly IConfiguration config; //Para leer la config
        public UserRepository(ApplicationDbContext context, IConfiguration config)
        {
            this.context = context;
            this.config = config;
        }
        #region CRUD
        public bool Delete(int id, string tokenLogin)
        {
            try
            {
                var usuario = context.User.Single(x => x.Id == id);
                context.Remove(usuario);
                context.SaveChanges();
            }
            catch (System.Exception)
            {
                return false;
            }
            return true;
        }
       
        public bool Save(User entity, string tokenLogin)
        {
            try
            {
                var existUser = context.User.Where(x => x.email == entity.email);
                
                if (existUser.Any())
                {
                    return false;
                }
                else
                {

                    context.Add(entity);
                    context.SaveChanges();
                }
                
                
            }
            catch (System.Exception)
            {

                return false;
            }
            return true;
        }

        public bool UpdateTrue(User entity, string tokenLogin)//api para el update profile, verifica token
        {
            try
            {
                var us = context.User.FirstOrDefault(v => v.tokenLogin == tokenLogin );
                var usuario = context.User.Single(x => x.Id == us.Id);

                usuario.firstName = entity.firstName; //bien
                usuario.lastName = entity.lastName; //bien

                context.Update(usuario);
                context.SaveChanges();

            }
            catch (System.Exception)
            {

                return false;
            }
            return true;
        }
        public bool Update(User entity, string tokenLogin) //Este no verifica token, el otro si deberá
        {
            try
            {


                //var us = context.User.FirstOrDefault(x => x.tokenLogin == tokenLogin);

                var usuario = context.User.Single(
                    x => x.Id == entity.Id);
                
                
                    usuario.Id = entity.Id;
                    usuario.firstName = entity.firstName;
                    usuario.lastName = entity.lastName;
                    usuario.email = entity.email;
                    usuario.password = entity.password;
                    usuario.token = entity.token;
                    usuario.tokenLogin = tokenLogin;
                    context.Update(usuario);
                    context.SaveChanges();
                

            }
            catch (System.Exception)
            {

                return false;
            }
            return true;
        }
        public IEnumerable<User> GetAll()
        {
            var result = new List<User>();
            try
            {
                result = context.User.ToList();
            }

            catch (System.Exception)
            {

                throw;
            }
            return result;
        }
        #endregion CRUD
        
        #region Own Methods
        public User Get(int id, string tokenLogin)
        {
            var result = new User();
            try
            {
                var usuario = context.User.FirstOrDefault(x => x.tokenLogin == tokenLogin);
                result = context.User.Single(x => x.Id == usuario.Id);
                var objEncrypt = new Encrypt();
                string pass = objEncrypt.DecryptText(result.password, new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("Values")["Password"]);
                result.password = pass;
            }

            catch (System.Exception)
            {

                throw;
            }
            return result;
        }
        public User GetByEmail(string email)
        {
            var result = new User();
            try
            {
                result = context.User.Where(x => x.email == email).FirstOrDefault();
            }

            catch (System.Exception)
            {
                throw;
            }
            return result;
        }
        public User Login(string email, string password)
        {
            User usuarioPath = context.User.Where(x => x.email == email).FirstOrDefault();

            if (usuarioPath == null)
            {
                return null;

            }

            var objEncrypt = new Encrypt();
            string pass = objEncrypt.EncryptText(password, new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("Values")["Password"]);

            //usuarioPath.password = pass;

            
            if (usuarioPath.password == pass)
            {

                //ReturnTokenViewModel returnDataToken = new ReturnTokenViewModel();



                var secretKey = config.GetValue<string>("SecretKey");

                var key = Encoding.ASCII.GetBytes(secretKey);

                var claims = new ClaimsIdentity();
                claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, email));

                var tokenDecriptor = new SecurityTokenDescriptor
                {
                    Subject = claims,
                    Expires = DateTime.UtcNow.AddHours(4),
                    //Expires = DateTime.UtcNow.AddMinutes(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var tokenHandler = new JwtSecurityTokenHandler();
                var createdToken = tokenHandler.CreateToken(tokenDecriptor);

                string beare_token = tokenHandler.WriteToken(createdToken);

                usuarioPath.tokenLogin = beare_token;

                return usuarioPath; //EL FRONT DEBE REGRESAR ID Y TOKEN
                /*return Ok(
                    userService.Login(userModel.email, userModel.password) //En UserRepository se debe implementar lo del token de creación y return :D!
                );*/
            }
            else
            {
                return null;
            }
        }
        public bool GetByTokenValidate(string token)
        {
            //var result = new User();
            try
            {
                var result = context.User.Where(x => x.token == token);
                if (result.Any())
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }

            catch (System.Exception)
            {

                return false;
            }
            return false;
        }
        public User GetByToken(string token)
        {
            var result = new User();
            try
            {
                result = context.User.Single(x => x.token == token);
            }

            catch (System.Exception)
            {

                throw;
            }
            return result;
        }

        #endregion Own Methods
    }



}