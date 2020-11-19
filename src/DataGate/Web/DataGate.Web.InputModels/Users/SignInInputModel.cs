namespace DataGate.Web.InputModels.Users
{
    using System.ComponentModel.DataAnnotations;
    using DataGate.Common;
    using DataGate.Web.Infrastructure.Attributes.Validation;

    public class SignInInputModel
    {
        //[Required(ErrorMessage = ValidationMessages.FieldRequired)]
        public string Username { get; set; }

        //[Required(ErrorMessage = ValidationMessages.FieldRequired)]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        //[GoogleReCaptchaValidation]
        public string RecaptchaValue { get; set; }
    }
}
