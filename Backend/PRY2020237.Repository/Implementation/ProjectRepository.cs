using System.Collections.Generic;
using System.Linq;
using PRY2020237.Repository.Context;
using Microsoft.EntityFrameworkCore;
using PRY2020237.Entity;
using PRY2020237.Repository;

namespace PRY2020237.RepositoRy.implementation
{
    public class ProjectRepository : IProjectRepository
    {
        private ApplicationDbContext context;
        public ProjectRepository(ApplicationDbContext context)
        {
            this.context = context;
        }

        public bool Delete(int id, string tokenLogin)
        {
           var rpta=false;
            
           try
           {
                var usuario = context.User.FirstOrDefault(y => y.tokenLogin == tokenLogin);
                var aux=context.Project.Single(x=>x.Id==id && x.userId == usuario.Id);
             context.Project.Remove(aux);
             context.SaveChanges();   
           }
           catch (System.Exception)
           {
               
               throw;
           }
           return rpta;
        }

        public Project Get(int id, string tokenLogin)
        {
            var result = new Project();
            try
            {
                result = context.Project.Single(x => x.Id == id);
                
            }

            catch (System.Exception)
            {

                throw;
            }
            return result;
        }

        public IEnumerable<Project> GetAll()
        {
            var result = new List<Project>();
            try
            {
                result = context.Project.Include(c => c.user).ToList();

                result.Select(p => new Project
                {
                    Id= p.Id,
                    userId =p.userId,
                    name=p.name,
                    description=p.description,
                    createDate=p.createDate,
                    modifyDate=p.modifyDate,
                    themeNumber=p.themeNumber
                });
              
            }

            catch (System.Exception)
            {

                throw;
            }
            return result;
        }

        public IEnumerable<Project> GetByUserID(/*int idUser,*/ string tokenLogin)
        {
           var result = new List<Project>();
            try
            {
                var usuario = context.User.FirstOrDefault(y => y.tokenLogin == tokenLogin);

                result = context.Project.Where(x => x.userId == usuario.Id).ToList();
                //result = context.Project.Where(x => x.userId == idUser).ToList();
            }
            catch(System.Exception)
            {
                throw;
            }
            return result;
        }

        public bool Save(Project entity, string tokenLogin)
        {
            try
            {
                var usuario = context.User.FirstOrDefault(y => y.tokenLogin == tokenLogin);
                entity.userId = usuario.Id;
                var names = context.Project.Where(x => x.userId == entity.userId && x.name == entity.name); //acá se tiene todos los proyectos ya
                if (names.Any())
                {


                    return false;
                }
                else
                {
                    context.Add(entity);
                    context.SaveChanges();
                    return true;
                }
            }
            catch (System.Exception)
            {

                return false;
            }
            return false;
        }



        public bool Update(Project entity, string tokenLogin)
        {
            try
            {
                var usuario = context.User.FirstOrDefault(y => y.tokenLogin == tokenLogin);
                var proyecto = context.Project.Single(
                     x => x.Id == entity.Id
                 );

                 proyecto.Id=entity.Id;
                 proyecto.name=entity.name;
                 proyecto.description=entity.description;
                 proyecto.createDate=entity.createDate;
                 proyecto.modifyDate=entity.modifyDate;
                 proyecto.userId=usuario.Id;
                 proyecto.themeNumber = entity.themeNumber;

                 context.Update(proyecto);
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