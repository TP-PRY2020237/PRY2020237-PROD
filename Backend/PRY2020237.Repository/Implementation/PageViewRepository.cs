using System.Collections.Generic;
using System.Linq;
using PRY2020237.Repository.Context;
using Microsoft.EntityFrameworkCore;
using PRY2020237.Entity;
using PRY2020237.Repository;

namespace PRY2020237.RepositoRy.implementation
{
    public class PageViewRepository : IPageViewRepository
    {
        private ApplicationDbContext context;
        public PageViewRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public bool Delete(int id, string tokenLogin)
        {
            try
            {
                var pageview = context.PageView.Single(x => x.Id == id);
                context.Remove(pageview);
                context.SaveChanges();
            }
            catch (System.Exception)
            {
                return false;
            }
            return true;
        }

        public PageView Get(int id, string tokenLogin)
        {
            var result = new PageView();
            try
            {
                result = context.PageView.Single(x => x.Id == id);
                
            }

            catch (System.Exception)
            {

                throw;
            }
            return result;
        }

        public IEnumerable<PageView> GetAll()
        {
             var result = new List<PageView>();
            try
            {
                result = context.PageView.Include(c => c.project).ToList();

                result.Select(p => new PageView
                {
                    Id= p.Id,
                    projectId =p.projectId,
                    name=p.name,
                     description=p.description,
                    createDate=p.createDate,
                    modifyDate=p.modifyDate,
                    imgUrl=p.imgUrl,
                    componentDetectedJson=p.componentDetectedJson,
                    htmlUrl=p.htmlUrl,
                    isPrincipal = p.isPrincipal
                });
              
            }

            catch (System.Exception)
            {

                throw;
            }
            return result;
        }

        public IEnumerable<PageView> GetByProjectID(int idProject)
        {
            var result = new List<PageView>();
            try
            {
                result = context.PageView.Where(x => x.projectId == idProject).ToList();
            }
            catch(System.Exception)
            {
                throw;
            }
            return result;
        }
        public PageView SaveAndReturnObject(PageView entity)
        {
            
                try
                {
                    context.Add(entity);
                    context.SaveChanges();
                }
                catch (System.Exception)
                {

                    return null;

                }

                return entity;

            

        }

        public bool CheckPageView(int idProject, string nName)
        {
            var names = context.PageView.Where(x => x.projectId == idProject && x.name == nName);

            if (names.Any())
            {

                return false;
            }
            else
            {

                return true;

            }
        }

        public bool Save(PageView entity, string tokenLogin)
        {
             try
            {
                context.Add(entity);
                context.SaveChanges();
            }
            catch (System.Exception)
            {

                return false;
            }
            return true;
        }

        public bool Update(PageView entity, string tokenLogin)
        {
            
            try
            {
                 var pageview = context.PageView.Single(
                     x => x.Id == entity.Id
                 );

                 pageview.Id=entity.Id;
                 pageview.name=entity.name;
                 pageview.description=entity.description;
                 pageview.createDate=entity.createDate;
                 pageview.modifyDate=entity.modifyDate;
                 pageview.imgUrl=entity.imgUrl;
                 pageview.componentDetectedJson=entity.componentDetectedJson;
                 pageview.htmlUrl=entity.htmlUrl;
                 pageview.projectId=entity.projectId;
                 pageview.isPrincipal=entity.isPrincipal;
                 pageview.jsonTree = entity.jsonTree;

                 context.Update(pageview);
                 context.SaveChanges();
            }
            catch (System.Exception)
            {
                
                return false;
            }
            return true;
        }

        
    }



}