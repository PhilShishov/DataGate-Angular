using DataGate.Common;
using DataGate.Common.Exceptions;
using DataGate.Data.Models.Users;
using DataGate.Services.Data.Recent;
using DataGate.Services.Data.ShareClasses;
using DataGate.Web.Api.Base;
using DataGate.Web.ViewModels.Search;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DataGate.Web.Api
{
    public class SearchController : ApiControllerBase
    {
        private readonly IRecentService recentService;
        private readonly IShareClassService service;
        public SearchController(
            IRecentService recentService,
            IShareClassService service, UserManager<ApplicationUser> userManager)
        {
            this.recentService = recentService;
            this.service = service;
        }

        [HttpGet("search-results")]
        public async Task<ActionResult<SearchResultsViewModel>> Result(string userId, string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
            {
                throw new BadRequestException(ErrorMessages.InvalidSearchKeyword);
            }

            var model = new SearchResultsViewModel
            {
                Date = DateTime.Today.ToString(GlobalConstants.RequiredWebDateTimeFormat),
                SearchTerm = searchTerm
            };

            bool isIsin = this.service.IsIsin(model.CleanedSearch);

            if (isIsin)
            {
                await this.recentService.Save(userId, this.Request.Path + this.Request.QueryString);
                model.ClassIdForRedirection = this.service.ByIsin(model.CleanedSearch);
            }
            model.Results = this.service.ByName(model.CleanedSearch);

            if (model.Results.ToList().Count > 0)
            {
                await this.recentService.Save(userId, this.Request.Path + $"?searchTerm={model.CleanedSearch}");
            }

            return Ok(model);
        }
    }
}
