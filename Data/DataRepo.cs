using LC.Assets;
using LC.Assets.Components.Extensions;
using LC.Home.Blitz.Data.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LC.Home.Blitz.Data
{
    public interface IDataRepo
    {
        Task<IEnumerable<HistoryItem>> GetHistory(string culture = Const.LocalizationDefaultCultureCode);
        Task<IEnumerable<Project>> GetProjects(string culture = Const.LocalizationDefaultCultureCode);
    }

    public class DataRepo : IDataRepo
    {
        private LCContext _data;

        public DataRepo(LCContext context)
        {
            _data = context;
        }


        public async Task<IEnumerable<HistoryItem>> GetHistory(string culture = Const.LocalizationDefaultCultureCode)
        {
            var result = await _data.HistoryItems.Where(itm => itm.Active && itm.Culture.Equalz(culture)).OrderByDescending(itm => itm.DateCreated).ToListAsync();

            return result.Top(16);
        }

        public async Task<IEnumerable<Project>> GetProjects(string culture = Const.LocalizationDefaultCultureCode)
        {
            var result = await _data.Projects.Include(prj => prj.Images).Where(prj => prj.Active && prj.Culture.Equalz(culture)).OrderBy(prj => prj.OrderBy).ToListAsync();

            return result;
        }
    }
}
