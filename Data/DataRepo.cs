using LC.Home.Blitz.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LC.Home.Blitz.Data
{
    public interface IDataRepo
    {
        Task<IEnumerable<HistoryItem>> GetHistory();
        Task<IEnumerable<Project>> GetProjects();
    }

    public class DataRepo : IDataRepo
    {
        private LCContext _data;

        public DataRepo(LCContext context)
        {
            _data = context;
        }


        public async Task<IEnumerable<HistoryItem>> GetHistory()
        {
            var result = await _data.HistoryItems.OrderByDescending(itm => itm.DateCreated).ToListAsync();

            return result;
        }

        public async Task<IEnumerable<Project>> GetProjects()
        {
            var result = await _data.Projects.Include(prj => prj.Images).Where(prj => prj.Active).OrderBy(prj => prj.OrderBy).ToListAsync();

            return result;
        }
    }
}
