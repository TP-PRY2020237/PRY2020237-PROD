using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PRY2020237.Entity;
using PRY2020237.Service;

namespace PRY2020237.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ComponentTypeController : ControllerBase
    {
        private IComponentTypeService componentTypeService;

        public ComponentTypeController(IComponentTypeService componentTypeService)
        {
            this.componentTypeService= componentTypeService;
        }

         [HttpGet]
        public ActionResult Get()
        {
            return Ok(
                componentTypeService.GetAll()
            );
        }

        [HttpPost]
        public ActionResult Post([FromBody] ComponentType componentType)
        {
            return Ok(
                componentTypeService.Save(componentType, "")
            );
        }

        [HttpPut]
        public ActionResult Put([FromBody] ComponentType componentType, string tokenLogin)
        {
            return Ok(
                componentTypeService.Update(componentType, tokenLogin)
            );
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id, string tokenLogin)
        {
            return Ok(
                componentTypeService.Delete(id, tokenLogin)
            );
        }

    }
}