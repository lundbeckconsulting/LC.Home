using LC.Home.Blitz.Data.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LC.Home.Blitz.Data
{
    public class DataRepo
    {
        private LCContext _context;

        public DataRepo(LCContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<HistoryItem>> GetHistory()
        {
            var result = await _context.HistoryItems.Where(itm => itm.Active).OrderByDescending(itm => itm.DateCreated).ToListAsync();

            return result;
        }

        public async Task<IEnumerable<Project>> GetProjects()
        {
            var result = await _context.Projects.Include(pr => pr.Images).Where(pr => pr.Active).OrderBy(pr => pr.OrderBy).ToListAsync();

            return result;
        }
    }
}
