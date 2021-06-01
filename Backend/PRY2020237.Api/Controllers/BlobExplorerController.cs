
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PRY2020237.Entity;
using PRY2020237.Entity.Settings;
using PRY2020237.Repository.Context;
using PRY2020237.Service;

namespace BlobStorageExample.Controllers
{
    [Route("blobs")]
    [Authorize]
    public class BlobExplorerController : Controller
    {
        private readonly IBlobService _blobService;
        private ApplicationDbContext _context;

        public BlobExplorerController(IBlobService blobService, ApplicationDbContext context)
        {
            _blobService = blobService;
            _context = context;
        }

        [HttpGet("{blobName}")]
        public async Task<IActionResult> GetBlob(string blobName)
        {
            var data = await _blobService.GetBlobAsync(blobName);
            return File(data.Content, data.ContentType);
        }

        [HttpGet("list")]
        public async Task<IActionResult> ListBlobs()
        {
            return Ok(await _blobService.ListBlobAsync());
        }
        /*
        [HttpPost("uploadfile")]
        public async Task<IActionResult> UploadFile([FromBody] UploadFileRequest request)
        {
            await _blobService.UploadFileBlobAsync(request.FilePath, request.FileName);
            return Ok();
        }
        */
        [HttpPost("uploadfile")]
                public async Task<IActionResult> UploadFile([FromBody] UploadContentRequest request)
                {
                    var url = await _blobService.UploadFileBlobAsync(request.Content, request.FileName);
                    return Ok(url);
                }

        [HttpPost("uploadimage")]
        public async Task<IActionResult> UploadImage([FromBody] UploadContentRequest request)
        {
            var url = await _blobService.UploadImageBlobAsync(request.Content, request.FileName);
            return Ok(url);
        }

        [HttpDelete("{blobName}")]
        public async Task<IActionResult> DeleteFile(string blobName)
        {
            await _blobService.DeleteBlobAsync(blobName);
            return Ok();
        }
    }
}