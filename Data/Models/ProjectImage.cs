namespace LC.Home.Blitz.Data.Models
{
    public interface IProjectImage : IModelBase
    {
        int ProjectId { get; set; }
        string Filename { get; set; }
        int OrderBy { get; set; }
    }

    public class ProjectImage : ModelsBase, IProjectImage
    {
        public int ProjectId { get; set; }
        public string Filename { get; set; }
        public int OrderBy { get; set; }
    }
}
