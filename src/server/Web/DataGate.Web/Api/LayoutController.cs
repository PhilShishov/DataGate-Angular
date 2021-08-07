using DataGate.Common;
using DataGate.Data.Common.Repositories.UsersContext;
using DataGate.Data.Models.Columns;
using DataGate.Services.Data.Layouts;
using DataGate.Web.Api.Base;
using DataGate.Web.InputModels.Layouts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DataGate.Web.Api
{
    [Authorize]
    public class LayoutController : ApiControllerBase
    {
        private readonly ILayoutService layoutService;
        private readonly IUserRepository<UserFundColumn> userFRepository;
        private readonly IUserRepository<UserSubFundColumn> userSFRepository;
        private readonly IUserRepository<UserShareClassColumn> userSCRepository;

        public LayoutController(
            ILayoutService layoutService,
            IUserRepository<UserFundColumn> userFRepository,
            IUserRepository<UserSubFundColumn> userSFRepository,
            IUserRepository<UserShareClassColumn> userSCRepository)
        {
            this.layoutService = layoutService;
            this.userFRepository = userFRepository;
            this.userSFRepository = userSFRepository;
            this.userSCRepository = userSCRepository;
        }

        [HttpPost("save")]
        public async Task<ActionResult> Save(SaveLayoutInputModel input)
        {
            if (input.SelectedColumns != null)
            {
                await this.SaveLayout(input);

                return Ok(new { success = true, controller = input.ControllerName, area = input.AreaOrigin });
            }

            return Ok(new { success = false });
        }

        [HttpGet("default")]
        public async Task<IActionResult> Default(string controllerName,string userName)
        {
            var area = await this.RestoreLayout(controllerName, userName);
            return Ok();
        }

        private async Task<string> RestoreLayout(string controller,string userName)
        {
            string area = string.Empty;
            var user = await this.layoutService.UserWithLayouts(userName);

            switch (controller)
            {
                case EndpointsConstants.FundsController:
                    area = EndpointsConstants.FundArea;
                    await this.userFRepository.RestoreLayout(user.UserFundColumns);
                    break;
                case EndpointsConstants.DisplaySub + EndpointsConstants.FundsController:
                    area = EndpointsConstants.DisplaySub + EndpointsConstants.FundArea;
                    await this.userSFRepository.RestoreLayout(user.UserSubFundColumns);
                    break;
                case EndpointsConstants.ShareClassesController:
                    area = EndpointsConstants.ShareClassArea;
                    await this.userSCRepository.RestoreLayout(user.UserShareClassColumns);
                    break;
            }

            return area;
        }

        private async Task SaveLayout(SaveLayoutInputModel input)
        {
            var user = await this.layoutService.UserWithLayouts(input.UserName);

            switch (input.ControllerName)
            {
                case EndpointsConstants.FundsController:
                    var columnsToDbF = this.layoutService.ColumnsToDb<UserFundColumn>(input.SelectedColumns, user.Id);
                    await this.userFRepository.SaveLayout(user.UserFundColumns, columnsToDbF);
                    break;
                case EndpointsConstants.DisplaySub + EndpointsConstants.FundsController:
                    var columnsToDbSF = this.layoutService.ColumnsToDb<UserSubFundColumn>(input.SelectedColumns, user.Id);
                    await this.userSFRepository.SaveLayout(user.UserSubFundColumns, columnsToDbSF);
                    break;
                case EndpointsConstants.ShareClassesController:
                    var columnsToDbSC = this.layoutService.ColumnsToDb<UserShareClassColumn>(input.SelectedColumns, user.Id);
                    await this.userSCRepository.SaveLayout(user.UserShareClassColumns, columnsToDbSC);
                    break;
            }
        }
    }
}

