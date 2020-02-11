/*
    @Date			: 29.01.2020
    @Author         : Stein Lundbeck
*/

using LC.Assets.Components.Repos;
using System;
using System.Net;

namespace LC.Home.Chips.Models
{
    public interface IContactModel
    {
        DateTime DateCreated { get; }
        string Email { get; set; }
        string Content { get; set; }
        IPAddress IP { get; }
    }

    public class ContactModel : IContactModel
    {
        public DateTime DateCreated { get; } = DateTime.Now;
        public string Email { get; set; }
        public string Content { get; set; }
        public IPAddress IP { get; } = IdentityRepoHelper.CurrentIP.Address;
    }
}
