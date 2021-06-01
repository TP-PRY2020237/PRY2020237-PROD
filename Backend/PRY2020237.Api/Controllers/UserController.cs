using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using PRY2020237.Entity;
using PRY2020237.Service;
using PRY2020237.Api.Models;
using PRY2020237.Repository.Context;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Http.Headers;
//INSTALAR Microsoft.IdentityModel.Tokens 6.9.0
//INSTALAR Microsoft.IdentityModel.Tokens.Jwt 6.9.0
//INSTALAR Microsoft.AspNetCore.Authentication.JwtBearer 3.1.1
//INSTALAR Microsoft.AspNet.MVC

//CONTROLLER => IUSERSERVICE => USERSERVICE => IUSERREPOSITORY => USERREPOSITORY
namespace PRY2020237.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]//QUITAR SI ES QUE NO SE USA TOKEN
    public class UserController : ControllerBase
    {
        private IUserService userService;
        private ApplicationDbContext context;
        private readonly IConfiguration config; //Para leer la config

        public UserController(ApplicationDbContext context, IUserService userService, IConfiguration config)
        {
            this.userService = userService;
            this.context = context;
            this.config = config;
        }

        [AllowAnonymous]
        [HttpGet("tokener")]
        public ActionResult tokener()
        {
            var r = ((ClaimsIdentity)User.Identity).FindFirst(ClaimTypes.NameIdentifier);
            return Ok(r == null ? "" : r.Value);
        }

        /*
        [HttpGet]
        public ActionResult Get()
        {
            return Ok(
                userService.GetAll()
            );
        }*/

        [AllowAnonymous] //para acceder al metodo sin autenticación
        [HttpPost("login")]
        public ActionResult Login([FromBody] LoginViewModel userModel) //Cambiamos "[FromBody] User user " por el ViewModel
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            else
            {
                return Ok(
                    userService.Login(userModel.email, userModel.password));
            }


        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult Post([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); //404
            }
            else
            {
                return Ok(
                    userService.Save(user, "")
                );
            }
        }

        [HttpPut("user/UpdateTrue")]//EN EL UPDATE AGREGAR UN VIEWMODEL PARA NO ENVIAR CONTRASEÑA, Y HACER WHERE DEL AUTHORIZATHION PARA TRAER LOS DATOS DEL USUARIO Y GUARDARLOS
        public ActionResult PutTrue([FromBody] EditViewModel user, [FromHeader] string authorization)
        {
            var scheme = "";
            var parameter = "";
            var user2 = new User();
            if (AuthenticationHeaderValue.TryParse(authorization, out var headerValue))
            {
                scheme = headerValue.Scheme.ToString();
                parameter = headerValue.Parameter.ToString();

                user2.firstName = user.firstName;
                user2.lastName = user.lastName;
                user2.tokenLogin = user.tokenLogin; 

            }
            return Ok(
                userService.UpdateTrue(user2, parameter)
            );
        }
        
        [HttpPut]
        public ActionResult Put([FromBody] User user, [FromHeader] string authorization) //TruePut
        {
            var scheme = "";
            var parameter = "";
            if (AuthenticationHeaderValue.TryParse(authorization, out var headerValue))
            {
                scheme = headerValue.Scheme.ToString();
                parameter = headerValue.Parameter.ToString();


            }
            return Ok(
                userService.Update(user, parameter)
            );
        }

        
        

        [HttpDelete("{id}")]
        public ActionResult Delete(int id, string tokenLogin)
        {
            return Ok(
                userService.Delete(id, tokenLogin)
            );
        }


        [HttpGet("user/{idUser}")]
        public ActionResult GetUser(int idUser, [FromHeader] string authorization)
        {
            var scheme = "";
            var parameter = "";
            if (AuthenticationHeaderValue.TryParse(authorization, out var headerValue))
            {
                scheme = headerValue.Scheme.ToString();
                parameter = headerValue.Parameter.ToString();


            }
            return Ok(
                userService.Get(idUser, parameter)
            );
        }

        [AllowAnonymous]
        [HttpGet("user/email/{email}")]
        public ActionResult GetByEmail(string email)
        {
            return Ok(
                userService.GetByEmail(email)
            ) ;
        }

        [AllowAnonymous]
        [HttpPost("validate/token")]
        public ActionResult ValidateToken([FromBody] TokenViewModel tokenViewModel)
        {
            return Ok(
            userService.ValidateToken(tokenViewModel.token)
                ) ;
        }

        [AllowAnonymous]
        [HttpPost("update/password")]
        public ActionResult UpdatePassword([FromBody] System.Text.Json.JsonElement entity)
        {
            try
            {
                User user = JsonConvert.DeserializeObject<User>(entity.GetRawText().ToString());
                return Ok(userService.UpdatePassword(user));
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            return Ok(false);
        }
    }
}