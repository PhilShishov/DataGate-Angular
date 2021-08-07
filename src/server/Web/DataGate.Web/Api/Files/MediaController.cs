using DataGate.Common;
using DataGate.Services.Data.Files;
using DataGate.Web.Api.Base;
using DataGate.Web.Infrastructure.Extensions;
using DataGate.Web.InputModels.Files;
using DataGate.Web.Utilities.Extract;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DataGate.Web.Api
{
    public class MediaController : ApiControllerBase
    {
        private readonly IWebHostEnvironment environment;
        private readonly IFileService service;

        public MediaController(
                    IWebHostEnvironment environment,
                    IFileService fileService)
        {
            this.environment = environment;
            this.service = fileService;
        }

        [HttpPost("generateReport")]
        public IActionResult GenerateReport(DownloadInputModel model)
        {
            if (model.TableValues != null && model.TableValues.Count > 0)
            {
                (string, string) result = (null,null);
                IEnumerable<string> tableHeaders = model.TableValues.FirstOrDefault();

                if (model.Command == GlobalConstants.CommandExtractExcel)
                {
                    result = GenerateFileTemplate.Excel(tableHeaders, model.TableValues, model.ControllerName);
                }
                else if (model.Command == GlobalConstants.CommandExtractPdf)
                {
                    if (tableHeaders.ToList().Count > GlobalConstants.AllowedColumnsInPdfView)
                    {
                        var tableValues = new List<string[]>();
                        foreach (var row in model.TableValues)
                        {
                            var tableRow = row.Take(GlobalConstants.AllowedColumnsInPdfView).ToArray();
                            tableValues.Add(tableRow);
                        }

                        model.TableValues = tableValues;
                        tableHeaders = model.TableValues.FirstOrDefault();
                    }

                    var date = DateTimeExtensions.FromWebFormat(model.Date);
                    result = GenerateFileTemplate.Pdf(tableHeaders, model.TableValues, date, model.ControllerName);
                }

                return Ok(new { success = true, file = result.Item1, fileName = result.Item2 });
            }

            return Ok(new { success = false });
        }

        [HttpPost]
        [Route("media/{name}")]
        public IActionResult Read(string docValue, string agrValue, string areaName)
        {
            if (!string.IsNullOrEmpty(areaName))
            {
                string path = this.GetTargetPath(ref docValue, agrValue, areaName);
                var fileStream = new FileStream(path, FileMode.Open, FileAccess.Read);
                FileStreamResult fileStreamResult = new FileStreamResult(fileStream, $"{GlobalConstants.PdfStreamMimeType}");

                if (fileStreamResult != null)
                {
                    return fileStreamResult;
                }
            }

            return this.RedirectToRoute(EndpointsConstants.RouteAll + EndpointsConstants.FundsController);
        }

        [Route("media/delete")]
        public async Task<IActionResult> Delete(int fileId, string docValue, string agrValue, string areaName)
        {
            if (!string.IsNullOrEmpty(areaName))
            {
                string path = this.GetTargetPath(ref docValue, agrValue, areaName);

                if (System.IO.File.Exists(path))
                {
                    if (string.IsNullOrEmpty(agrValue))
                    {
                        await this.service.DeleteDocument(fileId, areaName);
                    }
                    else
                    {
                        await this.service.DeleteAgreement(fileId, areaName);
                    }

                    System.IO.File.Delete(path);
                    return Ok(new { fileId = fileId });
                }
            }

            return Ok(new { fileId = "false" });
        }

        private string GetTargetPath(ref string docValue, string agrValue, string areaName)
        {
            string targetLocation;
            if (string.IsNullOrEmpty(docValue))
            {
                targetLocation = "Agreement";
                docValue = agrValue;
            }
            else
            {
                targetLocation = areaName;
            }

            string fileLocation = Path.Combine(this.environment.WebRootPath, @$"FileFolder\{targetLocation}\");
            string path = $"{fileLocation}{docValue}";
            return path;
        }
    }
}
