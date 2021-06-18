using System;
using System.Collections.Generic;
using System.Text;

namespace DataGate.Common.Exceptions
{
    public class NotAllowRenewTokenException : ArgumentException
    {
        private const string DefaultMessage = "Token cannot be renewed.";

        public NotAllowRenewTokenException()
            : base(DefaultMessage)
        {
        }

        public NotAllowRenewTokenException(string entityName)
            : base(string.Format(ErrorMessages.NotFoundEntity, entityName))
        {
        }

        public NotAllowRenewTokenException(string message, string entityName)
            : base(message, entityName)
        {
        }
    }
}
