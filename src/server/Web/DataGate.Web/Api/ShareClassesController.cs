using DataGate.Data.Common.Repositories.UsersContext;
using DataGate.Data.Models.Columns;
using DataGate.Data.Models.Users;
using DataGate.Services.Data.Entities;
using DataGate.Services.Data.Layouts;
using DataGate.Services.Data.ViewSetups;
using DataGate.Web.Api.Base;
using DataGate.Web.Helpers;
using DataGate.Web.ViewModels.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataGate.Web.Api
{
    public class ShareClassesController : ApiControllerBase
    {
        private readonly IEntityService service;
        private readonly ILayoutService layoutService;
        private readonly IUserRepository<UserFundColumn> repository;
        private readonly UserManager<ApplicationUser> userManager;


        public ShareClassesController(
            IEntityService service,
            ILayoutService layoutService,
            IUserRepository<UserFundColumn> repository, UserManager<ApplicationUser> userManager)
        {
            this.service = service;
            this.layoutService = layoutService;
            this.repository = repository;
            this.userManager = userManager;
        }

        [HttpPost("shareClasses")]
        public async Task<ActionResult<EntitiesViewModel>> All([FromBody] string userName)
        {
            var user = await this.userManager.FindByNameAsync(userName);
            EntitiesViewModel model = null;
            if (user != null)
            {
                var userWithLayout = await this.layoutService.UserWithLayouts(user.UserName);
                var userColumns = this.layoutService.GetLayout<UserFundColumn>(this.repository, userWithLayout.Id);

                model = await EntitiesVMSetup
                    .SetGet<EntitiesViewModel>(this.service, SqlFunctionDictionary.AllActiveShareClass, userColumns);
            }

            return Ok(model);
        }

        [HttpPost("upadte")]
        public async Task<ActionResult<EntitiesViewModel>> All([FromBody] EntitiesViewModel model)
        {
            var user = await this.userManager.FindByNameAsync(model.UserName);
            if (user != null)
            {
                var userWithLayout = await this.layoutService.UserWithLayouts(user.UserName);
                var userColumns = this.layoutService.GetLayout<UserFundColumn>(this.repository, userWithLayout.Id);
                if (userColumns.Count() > 0)
                {
                    model.SelectedColumns = userColumns;
                }
                await EntitiesVMSetup.SetPost(model, this.service,
                                          SqlFunctionDictionary.AllShareClass,
                                          SqlFunctionDictionary.AllActiveShareClass);

                if (model.Values != null && model.Values.Count > 0)
                {
                    return Ok(model);
                }
            }
            return Ok(model);
        }
    }
}
