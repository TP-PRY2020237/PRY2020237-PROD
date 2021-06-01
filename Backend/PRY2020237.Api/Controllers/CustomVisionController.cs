using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PRY2020237.Entity.Settings;
using PRY2020237.Service;

namespace PRY2020237.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CustomVisionController : Controller
    {
        private readonly ICustomService _customService;

        public CustomVisionController(ICustomService customService)
        {
            _customService = customService;
        }

        [HttpPost("FindComponents")]
        public IActionResult FindComponents([FromBody] UploadFileRequest request)
        {
            try
            {
                var proj = _customService.GetProject();
                var result = _customService.TestIteration(proj.Id, request.FileContent);
                return Ok(result);
            }
            catch (Exception e)
            {
                return Json(new { status = "Error", message = "Error Transforming Image" });
            }
        }

    }
}
