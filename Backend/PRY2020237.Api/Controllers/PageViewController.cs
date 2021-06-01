using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using PRY2020237.Entity;
using PRY2020237.Service;
using PRY2020237.Api.Models;

namespace PRY2020237.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PageViewController : ControllerBase
    {
        private IPageViewService pageViewService;

        public PageViewController(IPageViewService pageViewService)
        {
            this.pageViewService=pageViewService;
        }

         [HttpGet]
        public ActionResult Get()
        {
            return Ok(
                pageViewService.GetAll()
            );
        }
        [HttpGet("{id}")]
        public ActionResult GetById(int id)
        {
            return Ok(
                pageViewService.Get(id)
            );
        }

        [HttpPost("check")]
        public ActionResult CheckPage([FromBody] CheckViewModel checkVm)
        {
            return Ok(
                pageViewService.CheckPageView(checkVm.idProject, checkVm.nName)
            );
        }


        [HttpPost]
        public ActionResult Post([FromBody] PageView pageView)
        {
            return Ok(
                pageViewService.SaveAndReturnObject(pageView)
            );
        }

        [HttpPut]
        public ActionResult Put([FromBody] PageView pageView)
        {
            return Ok(
                pageViewService.Update(pageView)
            );
        }

        [HttpPut("UpdateHTMLRoute")]
                        public ActionResult Put([FromBody] UpdateHTMLDTO data)
                        {
                            return Ok(
                                pageViewService.UpdateHTMLRoute(data.id, data.htmlUrl)
                            );
                        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id, string tokenLogin)
        {
            return Ok(
                pageViewService.Delete(id, tokenLogin)
            );
        }
         [HttpGet("project/{idProject}")]
        public ActionResult GetByProjectID(int idProject)
        {
            return Ok(
                pageViewService.GetByProjectID(idProject)
            );
        }
        [HttpPost("updatePrincipal")]
        public ActionResult UpdatePrincipal([FromBody]UpdatePrincipalDTO dto)
        {
            return Ok(
                pageViewService.UpdatePrincipal(dto.idPageView,dto.idProject)
            );
        }

    }
}