using System;

namespace LC.Home.Blitz.Data.Models
{
    public interface IModelBase
    {
        int Id { get; set; }
        bool Active { get; set; }
        DateTime DateCreated { get; set; }
    }

    public class ModelsBase : IModelBase
    {
        public int Id { get; set; }
        public bool Active { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
