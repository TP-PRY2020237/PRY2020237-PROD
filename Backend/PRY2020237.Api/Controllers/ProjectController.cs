using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
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
    public class ProjectController : ControllerBase
    {
        private IProjectService projectService;

        public ProjectController(IProjectService projectService)
        {
            this.projectService=projectService;
        }

        
        //[AllowAnonymous] para acceder al metodo sin autenticación
         [HttpGet]
        public ActionResult Get()
        {
            return Ok(
                projectService.GetAll()
            );
        }

        [HttpGet("{id}")]
        public ActionResult GetId(int id)
        {
            return Ok(
                projectService.Get(id)
            );

        }

        [HttpPost]
        public ActionResult Post([FromBody] Project project, [FromHeader] string authorization)
        {
            var scheme = "";
            var parameter = "";
            if (AuthenticationHeaderValue.TryParse(authorization, out var headerValue))
            {
                scheme = headerValue.Scheme.ToString();
                parameter = headerValue.Parameter.ToString();


            }

            return Ok(
                projectService.Save(project, parameter)
            );
        }

        [HttpPut]
        public ActionResult Put([FromBody] Project project, [FromHeader] string authorization)
        {
            var scheme = "";
            var parameter = "";
            if (AuthenticationHeaderValue.TryParse(authorization, out var headerValue))
            {
                scheme = headerValue.Scheme.ToString();
                parameter = headerValue.Parameter.ToString();

            }
            return Ok(
                projectService.Update(project, parameter)
            );
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id, [FromHeader] string authorization)
        {

            var scheme = "";
            var parameter = "";
            if (AuthenticationHeaderValue.TryParse(authorization, out var headerValue))
            {
                scheme = headerValue.Scheme.ToString();
                parameter = headerValue.Parameter.ToString();

            }
            return Ok(
                projectService.Delete(id, parameter)
            );
        }

        //[Authorize]
        [HttpGet("user")]
        public ActionResult GetByUserID(/*int idUser,*/ [FromHeader] string authorization )
        {
            var scheme = "";
            var parameter = "";
            if (AuthenticationHeaderValue.TryParse(authorization, out var headerValue))
            {
                scheme = headerValue.Scheme.ToString();
                parameter = headerValue.Parameter.ToString();

            }

            return Ok(
                projectService.GetByUserID(/*idUser,*/ parameter)
            );
        }

    }
}