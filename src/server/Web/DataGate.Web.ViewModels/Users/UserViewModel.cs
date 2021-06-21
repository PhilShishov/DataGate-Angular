// Copyright (c) DataGate Project. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

namespace DataGate.Web.ViewModels.Users
{
    using System;
    using System.Collections.Generic;

    public class UserViewModel
    {
        public UserViewModel()
        {
            TokenInfo = new TokenDto()
            {
                LoginServerDate = DateTime.UtcNow,
                LoginExpiredDate = DateTime.UtcNow.AddHours(3),
                ExceedDateRenewToken = DateTime.UtcNow.AddHours(2)
            };
        }
        public string Id { get; set; }

        public string Username { get; set; }

        public IEnumerable<string> Roles { get; set; }

        public DateTimeOffset LastLogin { get; set; }

        public bool IsLogged { get; set; }
        public string ErrorMessage { get; set; }
        public string RedirectUrl { get; set; }
        public TokenDto TokenInfo { get; set; }

    }

    public class TokenDto
    {
        public string AuthToken { get; set; }
        public DateTime LoginServerDate { get; set; }
        public DateTime LoginExpiredDate { get; set; }
        public DateTime ExceedDateRenewToken { get; set; }
    }
}
