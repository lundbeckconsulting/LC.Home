/*
    @Date			: 26.02.2021
    @Author         : Stein Lundbeck
*/

namespace LC.Creator.Home.Butter.Models
{
    public interface IDocShow
    {
        string Base { get; set; }
        string Section { get; set; }
        string Name { get; set; }
    }

    public class DocShow : IDocShow
    {
        public DocShow() { }

        public DocShow(string bse, string name, string section)
        {
            this.Base = bse;
            this.Name = name;
            this.Section = section;
        }

        public string Base { get; set; }
        public string Section { get; set; }
        public string Name { get; set; }
    }
}
