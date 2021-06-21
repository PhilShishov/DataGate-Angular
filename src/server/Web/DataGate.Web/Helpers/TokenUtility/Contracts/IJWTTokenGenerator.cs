// Copyright (c) DataGate Project. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

namespace DataGate.Web.Helpers.TokenUtility.Contracts
{
    using DataGate.Data.Models.Users;
    using System;
    using System.Threading.Tasks;

    public interface IJWTTokenGenerator
    {
        string GenerateAccessToken(ApplicationUser userInfo);
        string RenewAccessToken(string token);
    }
}
