using System.Collections.Generic;
using PRY2020237.Entity;

namespace PRY2020237.Repository
{
    public interface IPageViewRepository: IRepository<PageView>
    {
          IEnumerable<PageView> GetByProjectID(int idProject);
          PageView SaveAndReturnObject(PageView entity);
        bool CheckPageView(int idProject, string nName);
    }
}