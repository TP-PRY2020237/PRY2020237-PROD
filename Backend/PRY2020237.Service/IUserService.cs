using PRY2020237.Entity;

namespace PRY2020237.Service
{
    public interface IUserService : IService<User>
    {
        bool UpdateTrue(User entity, string tokenLogin = "");
        User Login(string email, string password);
        User GetByEmail(string email);

        bool ValidateToken(string token);
        bool UpdatePassword(User entity);
    }
}
