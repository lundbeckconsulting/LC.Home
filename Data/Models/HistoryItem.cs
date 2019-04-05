using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LC.Home.Blitz.Data.Models
{
    public interface IHistoryItem : IModelBase
    {
        string Header { get; set; }
        string Description { get; set; }
        string URL { get; set; }
    }

    public class HistoryItem : ModelBase, IHistoryItem
    {
        public string Header { get; set; }
        public string Description { get; set; }
        public string URL { get; set; } = "#";
    }
}
