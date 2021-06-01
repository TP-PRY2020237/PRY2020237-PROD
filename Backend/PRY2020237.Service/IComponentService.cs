using PRY2020237.Entity;
using System.Collections.Generic;

namespace PRY2020237.Service
{
     public interface IComponentService : IService<Component>
    {
        IEnumerable<Component> GetByPageID(int idPage);
    }
}