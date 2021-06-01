using System;

namespace PRY2020237.Entity
{
    public class PageView
    {
        public int Id { get; set; }
        public string name { get; set; }        
        public string description { get; set; }
        public DateTime createDate { get; set; }
        public DateTime modifyDate { get; set; }
        public string imgUrl { get; set; }
        public string jsonTree { get; set; } = string.Empty;
        public string componentDetectedJson { get; set; }
        public string htmlUrl { get; set; }
        public bool isPrincipal { get; set; }
        public int projectId { get; set; }
        public Project project { get; set; }
        
    }
}