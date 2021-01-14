// Copyright (c) DataGate Project. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

namespace DataGate.Web.Helpers.TokenUtility.Contracts
{
    using System;
    using System.Security.Claims;
    using System.Threading.Tasks;

    public interface IJWTTokenGenerator
    {
        Task<string> GenerateAccessToken(Claim[] claims, string secretKey, DateTime dateTime);
    }
}
