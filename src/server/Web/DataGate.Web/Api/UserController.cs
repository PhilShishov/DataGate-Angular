using DataGate.Services.Data.Recent;
using DataGate.Services.Data.ShareClasses;
using DataGate.Web.ViewModels.Users;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataGate.Web.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController: ControllerBase
    {
        private readonly IRecentService recentService;
        private readonly IShareClassService service;

        public UserController(
            IRecentService recentService,
            IShareClassService service)
        {
            this.recentService = recentService;
            this.service = service;
        }

        [HttpGet("getUserPanelData")]
        public ActionResult<UserPanelViewModel> GetUserPanelData()
        {
            var viewModel = new UserPanelViewModel
            {
                ShareClasses = this.service.ByDate(),
                RecentlyViewed = this.recentService.ByUserId(this.User),
            };

            return Ok(viewModel);
        }
    }
}
