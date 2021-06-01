using System.Collections.Generic;
using PRY2020237.Entity;
using PRY2020237.Repository;

namespace PRY2020237.Service.implementation
{
    public class ProjectService : IProjectService
    {

        private IProjectRepository projectRepository;
        public ProjectService(IProjectRepository projectRepository)
        {
            this.projectRepository=projectRepository;
        }
        
        public bool Delete(int id, string tokenLogin)
        {
            return projectRepository.Delete(id, tokenLogin);
        }

        public Project Get(int id, string tokenLogin)
        {
            return projectRepository.Get(id);
        }

        public IEnumerable<Project> GetAll()
        {
           return projectRepository.GetAll();
        }

        public IEnumerable<Project> GetByUserID(/*int idUser,*/ string tokenLogin)
        {
            return projectRepository.GetByUserID(/*idUser,*/tokenLogin);
        }

        public bool Save(Project entity, string tokenLogin)
        {
            return projectRepository.Save(entity, tokenLogin);
        }

        

        public bool Update(Project entity, string tokenLogin)
        {
            return projectRepository.Update(entity, tokenLogin);
        }
    }
}