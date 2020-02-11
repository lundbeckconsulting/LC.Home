/*
    @Date			: 11.02.2020
    @Author         : Stein Lundbeck
*/

namespace LC.Home.Chicken.Models
{
    public interface ICVSectionModel
    {
        string Name { get; set; }
    }

    public class CVSectionModel : ICVSectionModel
    {
        public CVSectionModel(string name)
        {
            this.Name = name;
        }

        public string Name { get; set; }
    }
}
