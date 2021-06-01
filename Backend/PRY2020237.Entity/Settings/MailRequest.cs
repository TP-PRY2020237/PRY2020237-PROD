using System;
using System.Collections.Generic;
using System.Text;

namespace PRY2020237.Entity.Settings
{
    public class MailRequest
    {
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
    }
    public class MailParameter
    {
        public string Email { get; set; }
        public string Path { get; set; }
    }
}
