using PRY2020237.Entity;
using System;
using System.Web.Mvc;

namespace PRY2020237.Repository
{
    public interface IUserRepository : IRepository<User>
    {
        bool UpdateTrue(User entity, string tokenLogin = "");
        User Login(string email, string password);
        User GetByEmail(string email);
        bool GetByTokenValidate(string token);
        User GetByToken(string token);
    }
}