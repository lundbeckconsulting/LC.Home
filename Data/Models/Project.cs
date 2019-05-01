using LC.Assets;
using System.Collections.Generic;

namespace LC.Home.Blitz.Data.Models
{
    public interface IProject : IModelBase
    {
        string Header { get; set; }
        string Description { get; set; }
        string URL { get; set; }
        string GitHubURL { get; set; }
        int OrderBy { get; set; }
        string Culture { get; set; }
        IEnumerable<ProjectImage> Images { get; set; }
    }

    public class Project : ModelsBase, IProject
    {
        public string Header { get; set; }
        public string Description { get; set; }
        public string URL { get; set; }
        public string GitHubURL { get; set; }
        public int OrderBy { get; set; }
        public string Culture { get; set; } = Const.LocalizationDefaultCultureCode;
        public virtual IEnumerable<ProjectImage> Images { get; set; } = new HashSet<ProjectImage>();
    }
}
