using PRY2020237.Entity;
using System.Collections.Generic;

namespace PRY2020237.Repository
{
    public interface IComponentRepository: IRepository<Component>
    {
        IEnumerable<Component> GetByPageID(int idPage);
    }
}