using System.Collections.Generic;
using PRY2020237.Entity;
using PRY2020237.Repository;
using System.Linq;

namespace PRY2020237.Service.implementation
{
    public class PageViewService : IPageViewService
    {

        private IPageViewRepository pageViewRepository;
        public PageViewService(IPageViewRepository pageViewRepository)
        {
            this.pageViewRepository=pageViewRepository;
        }

        public bool CheckPageView(int idProject, string nName)
        {
            return pageViewRepository.CheckPageView(idProject, nName);
        }

        public bool Delete(int id, string tokenLogin)
        {
            return pageViewRepository.Delete(id, tokenLogin);
        }

        public PageView Get(int id, string tokenLogin)
        {
            return pageViewRepository.Get(id);
        }

        public IEnumerable<PageView> GetAll()
        {
           return pageViewRepository.GetAll();
        }

        public IEnumerable<PageView> GetByProjectID(int idProject)
        {
           return pageViewRepository.GetByProjectID(idProject);
        }

        public bool Save(PageView entity, string tokenLogin)
        {
            return pageViewRepository.Save(entity, tokenLogin);
        }
        public PageView SaveAndReturnObject(PageView entity)
        {
            return pageViewRepository.SaveAndReturnObject(entity);
        }
        public bool Update(PageView entity, string tokenLogin)
        {
            return pageViewRepository.Update(entity, tokenLogin);
        }
        public bool UpdateHTMLRoute(int id,string htmlUrl){
            var entity = pageViewRepository.Get(id);
            entity.htmlUrl = htmlUrl;
            return pageViewRepository.Update(entity, "");
        }
        public bool UpdatePrincipal(int idPageView ,int idProject)
        {
            var allPageView = pageViewRepository.GetByProjectID(idProject).ToList();
            var principalPageView = allPageView.Find(p=>p.Id == idPageView);
            var otherPageView = allPageView.Where(p=>p.Id != idPageView);
            foreach(var item in otherPageView){
                item.isPrincipal=false;
                pageViewRepository.Update(item, "");
            }
            principalPageView.isPrincipal=true;

            return pageViewRepository.Update(principalPageView, "");
            
        }

    }
}