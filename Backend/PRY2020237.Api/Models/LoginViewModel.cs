using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PRY2020237.Api.Models
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "El email es obligatorio.")]
        public string email { get; set; }

        [Required(ErrorMessage ="La contraseña es obligatoria")]
        public string password { get; set; }

    }
}
