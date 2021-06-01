using System.Collections.Generic;
using PRY2020237.Entity;

namespace PRY2020237.Service
{
     public interface IPageViewService : IService<PageView>
    {
        IEnumerable<PageView> GetByProjectID(int idProject);
        PageView SaveAndReturnObject(PageView entity);

        bool CheckPageView(int idProject, string nName);
        bool UpdatePrincipal(int idPageView ,int idProject);
        bool UpdateHTMLRoute(int id,string htmlUrl);
    }
}