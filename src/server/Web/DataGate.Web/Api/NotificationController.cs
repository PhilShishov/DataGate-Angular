using DataGate.Services.Notifications.Contracts;
using DataGate.Web.Api.Base;
using DataGate.Web.Hubs.Contracts;
using DataGate.Web.ViewModels.Notifications;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataGate.Web.Api
{
    public class NotificationController : ApiControllerBase
    {
        private readonly IHubNotificationHelper notificationHelper;
        private readonly INotificationService notificationService;

        public NotificationController(
            IHubNotificationHelper notificationHelper,
            INotificationService notificationService)
        {
            this.notificationHelper = notificationHelper;
            this.notificationService = notificationService;
        }

        [HttpGet("all")]
        public async Task<ActionResult<List<NotificationViewModel>>> All()
        {
            var model = await this.notificationService.All<NotificationViewModel>(this.User);
            int count = await this.notificationService.Count(this.User);
            await this.notificationHelper.HubToAll(count);

            return Ok(model);
        }

        [HttpGet("status/{notifId}")]
        public async Task<ActionResult<NotificationResponseModel>> Status(string notifId)
        {
            await this.notificationService.StatusAsync(this.User, notifId);
            var status = this.notificationService.GetStatus(this.User, notifId);

            return new NotificationResponseModel { Status = status, NotifId = notifId };
        }

        [HttpGet("statusAll")]
        public async Task<ActionResult<NotificationResponseModel>> StatusAll()
        {
            await this.notificationService.StatusAllAsync(this.User);

            return new NotificationResponseModel();
        }
    }
}
