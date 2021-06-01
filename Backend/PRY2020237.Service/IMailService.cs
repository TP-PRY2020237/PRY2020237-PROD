using PRY2020237.Entity.Settings;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PRY2020237.Service
{
    public interface IMailService
    {
        bool SendEmailRecoveryPassword(MailParameter mail);
        void SendEmail(MailRequest mailRequest);
    }
}
