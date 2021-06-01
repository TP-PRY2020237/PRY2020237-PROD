using System.Collections.Generic;

namespace PRY2020237.Service
{
      public interface IService<T>
    {
        bool  Save(T entity, string tokenLogin = "");
        bool  Update(T entity, string tokenLogin = "");

        bool  Delete(int id, string tokenLogin = "");


        IEnumerable<T> GetAll();

        T Get(int id, string tokenLogin = "");
    }
}
