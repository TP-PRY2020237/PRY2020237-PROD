using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PRY2020237.Entity;
using PRY2020237.Entity.Settings;
using PRY2020237.Service;

namespace PRY2020237.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        private readonly IMailService mailService;
        public MailController(IMailService mailService)
        {
            this.mailService = mailService;
        }
        [HttpPost("recover/password")]
        public ActionResult SendMail([FromBody] MailParameter mail)
        {
            try
            {
                
                return Ok(
                    mailService.SendEmailRecoveryPassword(mail)
                );
            }
            catch (Exception ex)
            {
                throw;
            }

        }
        /*
        [HttpPost("send")]
        public ActionResult SendMail([FromBody] MailRequest request)
        {
            try
            {
                mailService.SendEmail(request);
                return Ok();
            }
            catch (Exception ex)
            {
                throw;
            }

        }
        */
    }
}