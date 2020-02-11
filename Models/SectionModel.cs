/*
    @Date			: 31.01.2020
    @Author         : Stein Lundbeck
*/

namespace LC.Home.Chicken.Models
{
    public interface ISectionModel
    {
        Sections Section { get; }
    }

    public class SectionModel : ISectionModel
    {
        public SectionModel(Sections section)
        {
            this.Section = section;
        }
        public Sections Section { get; }
    }
}
