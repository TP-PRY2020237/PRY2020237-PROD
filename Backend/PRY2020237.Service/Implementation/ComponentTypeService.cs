using System.Collections.Generic;
using PRY2020237.Entity;
using PRY2020237.Repository;

namespace PRY2020237.Service.implementation
{
    public class ComponentTypeService : IComponentTypeService
    {

        private IComponentTypeRepository componentTypeRepository;
        public ComponentTypeService(IComponentTypeRepository componentTypeRepository)
        {
            this.componentTypeRepository=componentTypeRepository;
        }
        
        public bool Delete(int id, string tokenLogin)
        {
            return componentTypeRepository.Delete(id, tokenLogin);
        }

        public ComponentType Get(int id, string tokenLogin)
        {
            return componentTypeRepository.Get(id);
        }

        public IEnumerable<ComponentType> GetAll()
        {
           return componentTypeRepository.GetAll();
        }

        public bool Save(ComponentType entity, string tokenLogin)
        {
            return componentTypeRepository.Save(entity, tokenLogin);
        }

        public bool Update(ComponentType entity, string tokenLogin)
        {
            return componentTypeRepository.Update(entity, tokenLogin);
        }
    }
}