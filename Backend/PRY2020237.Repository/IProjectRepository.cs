using System.Collections.Generic;
using PRY2020237.Entity;

namespace PRY2020237.Repository
{
    public interface IProjectRepository: IRepository<Project>
    {
           IEnumerable<Project> GetByUserID(/*int idUser,*/ string tokenLogin);

    }
}