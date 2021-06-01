using System.Collections.Generic;
using System.Linq;
using PRY2020237.Repository.Context;
using Microsoft.EntityFrameworkCore;
using PRY2020237.Entity;
using PRY2020237.Repository;

namespace PRY2020237.RepositoRy.implementation
{
    public class ComponentRepository : IComponentRepository
    {
        private ApplicationDbContext context;
        public ComponentRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public IEnumerable<Component> GetByPageID(int idPage)
        {
            var result = new List<Component>();
            try
            {
                result = context.Component.Where(x => x.pageViewId == idPage).ToList();
            }
            catch (System.Exception)
            {
                throw;
            }
            return result;
        }

        public bool Delete(int id, string tokenLogin)
        {
            try
            {
                var componente = context.Component.Single(x => x.Id == id);
                context.Remove(componente);
                context.SaveChanges();
            }
            catch (System.Exception)
            {
                return false;
            }
            return true;
        }

        public Component Get(int id, string tokenLogin)
        {
           var result = new Component();
            try
            {
                result = context.Component.Single(x => x.Id == id);
                
            }

            catch (System.Exception)
            {

                throw;
            }
            return result;
        }

        public IEnumerable<Component> GetAll()
        {
             var result = new List<Component>();
            try
            {
                result = context.Component.Include(c => c.pageView).ToList();

                result.Select(p => new Component
                {
                    Id= p.Id,
                    pageViewId =p.pageViewId,
                    componentTypeId=p.componentTypeId,
                    attributesJson =p.attributesJson
                    
                });
              
            }

            catch (System.Exception)
            {

                throw;
            }
            return result;
        }

        public bool Save(Component entity, string tokenLogin)
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

        public bool Update(Component entity, string tokenLogin)
        {
            try
            {
                 var componente = context.Component.Single(
                     x => x.Id == entity.Id
                 );

                 componente.Id=entity.Id;
                 componente.attributesJson=entity.attributesJson;
                 componente.pageViewId=entity.pageViewId;
                 componente.componentTypeId=entity.componentTypeId;

                 context.Update(componente);
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