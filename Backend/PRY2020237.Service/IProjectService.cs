using System.Collections.Generic;
using PRY2020237.Entity;
namespace PRY2020237.Service
{
     public interface IProjectService : IService<Project>
    {
            IEnumerable<Project> GetByUserID(/*int idUser,*/ string tokenLogin);
    }
}