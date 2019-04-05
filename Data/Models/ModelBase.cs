using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LC.Home.Blitz.Data.Models
{
    public interface IModelBase
    {
        int Id { get; set; }
        bool Active { get; set; }
        DateTime DateCreated { get; set; }
    }

    public abstract class ModelBase : IModelBase
    {
        public int Id { get; set; }
        public bool Active { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
