using MailKit.Security;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using PRY2020237.Entity.Settings;
using PRY2020237.Repository;
using PRY2020237.RepositoRy.implementation;
using PRY2020237.Service.implementation;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace PRY2020237.Service.Implementation
{
    public class MailService : IMailService
    {
        private readonly MailSettings _mailSettings;
        //[Inject]
        private IUserRepository _userRepository;
        public MailService(IOptions<MailSettings> mailSettings, IUserRepository userRepository)
        {
            _mailSettings = mailSettings.Value;
            // userRepository = new UserService();
            _userRepository = userRepository;
        }
        private string GetSha256(string str)
        {
            SHA256 sha256 = SHA256Managed.Create();
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] stream = null;
            StringBuilder sb = new StringBuilder();
            stream = sha256.ComputeHash(encoding.GetBytes(str));
            for (int i = 0; i < stream.Length; i++) sb.AppendFormat("{0:x2}", stream[i]);
            return sb.ToString();
        }
        public bool SendEmailRecoveryPassword(MailParameter mail)
        {
            try
            {
                var user = _userRepository.GetByEmail(mail.Email);

                if (user != null )
                {
                    string token = GetSha256(Guid.NewGuid().ToString());
                    string url = mail.Path + "/Recovery?token=" + token;
                    user.token = token;
                    if (_userRepository.Update(user, ""))
                    {/*
                        MailRequest request = new MailRequest();
                        request.ToEmail = mail.Email;
                        request.Subject = "Recuperación de contraseña";
                        request.Body = "<p>Estimado " + user.firstName + ",nos has solicitado restablecer tu contraseña, para ingresar tu nueva</p>" +
                            "<p>contraseña has click en este link </p>" +
                            "<a href='" + url + "'>Click para recuperar</a>";
                        SendEmail(request);*/

                        var to = user.email;
                        var from = "wiretwoweb@gmail.com";
                        MailMessage message = new MailMessage(from, to);
                        message.Subject = "Recuperación de contraseña";
                        message.Body = "<html><head></head><body> <p>Estimado " + user.firstName + ",nos has solicitado restablecer tu contraseña, para ingresar tu nueva</p><p>contraseña has click en este link </p><a href='" + url + "'>Click para recuperar</a></body></html>";
                        message.Priority = MailPriority.High;
                        message.IsBodyHtml = true;
                        SmtpClient client = new SmtpClient();
                        client.Host = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("MailSettings")["Host"];
                        var porter = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("MailSettings")["Port"];
                        client.Port = Int32.Parse(porter);
                        client.EnableSsl = true;
                        client.UseDefaultCredentials = true;
                        var emU = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("MailSettings")["Mail"];
                        var pwdU = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("MailSettings")["Password"];
                        client.Credentials = new NetworkCredential(emU, pwdU);

                        try
                        {
                            client.Send(message);
                        }
                        catch (Exception e)
                        {

                        }
                    }
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception e)
            {

            }
            return false;
        }
        public void SendEmail(MailRequest mailRequest)
        {
            // create email message
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_mailSettings.Mail));
            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            email.Subject = mailRequest.Subject;
            email.Body = new TextPart(TextFormat.Html) { Text = mailRequest.Body };

            using var smtp = new MailKit.Net.Smtp.SmtpClient();
            smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.Mail, _mailSettings.Password);
            smtp.Send(email);
            
            smtp.Disconnect(true);
        }
    }
}
