using DataGate.Common;
using DataGate.Common.Settings;
using DataGate.Services.Data.Users;
using DataGate.Services.Messaging;
using DataGate.Web.Api.Base;
using DataGate.Web.Dtos.Notifications;
using DataGate.Web.Hubs.Contracts;
using DataGate.Web.InputModels.Users;
using DataGate.Web.Resources;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace DataGate.Web.Api
{
    public class AdminController : ApiControllerBase
    {
        private const string EmailConfirmationUrl = "/Account/ConfirmEmail";
        private const string ViewUsersUrl = "/Admin/Admin/All";

        private readonly IUserService userService;
        private readonly IHubNotificationHelper notificationHelper;
        private readonly IConfiguration configuration;
        private readonly IEmailSender emailSender;
        private readonly SharedLocalizationService sharedLocalizer;

        public AdminController(
            IUserService userService,
            IHubNotificationHelper notificationHelper,
            IEmailSender emailSender,
            IConfiguration configuration, SharedLocalizationService sharedLocalizer)
        {
            this.userService = userService;
            this.notificationHelper = notificationHelper;
            this.emailSender = emailSender;
            this.configuration = configuration;
            this.sharedLocalizer = sharedLocalizer;
        }

        [HttpGet("getUserRoles")]
        public ActionResult GetRoles()
        {
            var roles = this.userService.Roles();
            return Ok(roles);
        }

        [HttpGet("all")]
        public async Task<IActionResult> All()
        {
            var result = await this.userService.All();
            return Ok(result);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(CreateUserInputModel input)
        {
            string response = string.Empty;

            if (this.ModelState.IsValid)
            {
                var result = await this.userService.Create(input);

                if (result.Succeeded)
                {
                    var user = await this.userService.ByUsername(input.Username);
                    string code = await this.userService.GenerateEmailToken(user);
                    //string callbackUrl = this.Url.Page(
                    //       EmailConfirmationUrl,
                    //       pageHandler: null,
                    //       values: new { area = "Identity", userId = user.Id, code },
                    //       protocol: this.Request.Scheme);

                    string callbackUrl = $"{this.Request.Scheme}:localhost:4300/admin/confirm-email?code={code}";

                    //Upon creation send email confirmation to new user
                    string emailMessage = string.Format(GlobalConstants.EmailConfirmationMessage, user.UserName, HtmlEncoder.Default.Encode(callbackUrl));
                    await this.emailSender.SendEmailAsync(
                        this.configuration.GetValue<string>($"{AppSettingsSections.EmailSection}:{EmailOptions.Address}"),
                        this.configuration.GetValue<string>($"{AppSettingsSections.EmailSection}:{EmailOptions.Sender}"),
                        user.Email,
                        GlobalConstants.ConfirmEmailSubject,
                        emailMessage);

                    var dto = new NotificationDto
                    {
                        Arg = input.Username,
                        Message = InfoMessages.CreateUserNotification,
                        User = this.User,
                        Link = ViewUsersUrl,
                    };

                    await this.notificationHelper.SendToAdmin(dto);

                    response = string.Format(this.sharedLocalizer
                        .GetHtmlString(InfoMessages.AddUser),
                        user.UserName,
                        input.RoleType);
                }
                else
                    response = this.sharedLocalizer.GetHtmlString(ErrorMessages.UnsuccessfulCreate);
            }
            return Ok(response);
        }

        [HttpGet("edit/{userId}")]
        public async Task<IActionResult> Edit(string userId)
        {
            var user = await this.userService.ByIdEdit(userId);
            return Ok(user);
        }

        [HttpPost("edit")]
        public async Task<IActionResult> Edit(EditUserInputModel input)
        {
            var response = string.Empty;

            if (this.ModelState.IsValid)
            {
                var result = await this.userService.Edit(input);

                if (result.Succeeded)
                {
                    var dto = new NotificationDto
                    {
                        Arg = input.Username,
                        Message = InfoMessages.EditUserNotification,
                        User = this.User,
                        Link = ViewUsersUrl,
                    };

                    await this.notificationHelper.SendToAdmin(dto);
                    response = string.Format(this.sharedLocalizer.GetHtmlString(InfoMessages.UpdateUser), input.Username);
                }
                else
                    response = this.sharedLocalizer.GetHtmlString(ErrorMessages.UnsuccessfulUpdate);
            }
            else
                response = this.sharedLocalizer.GetHtmlString(ErrorMessages.UnsuccessfulUpdate);

            return Ok(response);
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete(DeleteUserInputModel input)
        {
            var response = string.Empty;
            var result = await this.userService.Delete(input);

            if (result.Succeeded)
            {
                var dto = new NotificationDto
                {
                    Arg = input.Username,
                    Message = InfoMessages.DeleteUserNotification,
                    User = this.User,
                    Link = ViewUsersUrl,
                };

                await this.notificationHelper.SendToAdmin(dto);

                response = string.Format(this.sharedLocalizer.GetHtmlString(InfoMessages.RemoveUser), input.Username);
            }
            else
                response = this.sharedLocalizer.GetHtmlString(ErrorMessages.UnsuccessfulDelete);
            return Ok(response);
        }

    }
}
