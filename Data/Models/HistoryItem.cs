namespace LC.Home.Blitz.Data.Models
{
    public interface IHistoryItem : IModelBase
    {
        string Header { get; set; }
        string Description { get; set; }
        string URL { get; set; }
    }

    public class HistoryItem : ModelsBase, IHistoryItem
    {
        public string Header { get; set; }
        public string Description { get; set; }
        public string URL { get; set; }
    }
}
