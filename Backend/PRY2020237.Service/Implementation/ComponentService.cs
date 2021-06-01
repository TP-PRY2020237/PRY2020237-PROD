using System.Collections.Generic;
using PRY2020237.Entity;
using PRY2020237.Repository;

namespace PRY2020237.Service.implementation
{
    public class ComponentService : IComponentService
    {

        private IComponentRepository componentRepository;
        public ComponentService(IComponentRepository componentRepository)
        {
            this.componentRepository=componentRepository;
        }
        public IEnumerable<Component> GetByPageID(int idPage)
        {
            return componentRepository.GetByPageID(idPage);
        }
        public bool Delete(int id, string tokenLogin)
        {
            return componentRepository.Delete(id, tokenLogin);
        }

        public Component Get(int id, string tokenLogin)
        {
            return componentRepository.Get(id);
        }

        public IEnumerable<Component> GetAll()
        {
           return componentRepository.GetAll();
        }

        public bool Save(Component entity, string tokenLogin)
        {
            return componentRepository.Save(entity, tokenLogin);
        }

        public bool Update(Component entity, string tokenLogin)
        {
            return componentRepository.Update(entity, tokenLogin);
        }
    }
}