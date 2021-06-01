using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Azure;
using Azure.Storage;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Blobs.Specialized;
using PRY2020237.Entity;
using PRY2020237.Repository.Context;
using PRY2020237.Service.Extensions;
using BlobInfo = PRY2020237.Entity.BlobInfo;

namespace PRY2020237.Service.implementation
{

    public class BlobService : IBlobService
    {
        private const string _container = "files";
        private readonly BlobServiceClient _blobServiceClient;
        //private readonly BlobClient _blobClient;//

        public BlobService(BlobServiceClient blobServiceClient/*, BlobClient blobClient*/)
        {
            _blobServiceClient = blobServiceClient;
            //_blobClient = blobClient;//
        }
        public static string Base64Encode(string plainText)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
            return System.Convert.ToBase64String(plainTextBytes);
        }

        public static byte[] Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
            return base64EncodedBytes;
        }

        public async Task DeleteBlobAsync(string blobName)
        {
            var containerClient = _blobServiceClient.GetBlobContainerClient(_container);
            await containerClient.CreateIfNotExistsAsync();
            var blobClient = containerClient.GetBlobClient(blobName);
            await blobClient.DeleteIfExistsAsync();
        }
        
        public async Task<BlobInfo> GetBlobAsync(string name)
        {
            var containerClient = _blobServiceClient.GetBlobContainerClient(_container);
            await containerClient.CreateIfNotExistsAsync();
            var blobClient = containerClient.GetBlobClient(name);
            var blobDownloadInfo = await blobClient.DownloadAsync();
            return new BlobInfo(blobDownloadInfo.Value.Content, blobDownloadInfo.Value.ContentType);
        }

        public async Task<IEnumerable<string>> ListBlobAsync() 
        {
            var containerClient = _blobServiceClient.GetBlobContainerClient(_container);
            await containerClient.CreateIfNotExistsAsync();
            var items = new List<string>();

            await foreach (var blobItem in containerClient.GetBlobsAsync())
            {
                Console.WriteLine(blobItem);
                items.Add(blobItem.Name);
            }

            return items;
        }


        public async Task<string> UploadImageBlobAsync(string content, string fileName)
        {
            try
            {
                var containerClient = _blobServiceClient.GetBlobContainerClient(_container);
                await containerClient.CreateIfNotExistsAsync();

                var blobClient = containerClient.GetBlobClient(fileName);

                var imageDataByteArray = Convert.FromBase64String(content);
                var imageDataStream = new MemoryStream(imageDataByteArray);

                await blobClient.UploadAsync(imageDataStream,overwrite:true);
                string decoded = HttpUtility.UrlDecode(blobClient.Uri.AbsoluteUri);
               

                return decoded;
            }
            catch(Exception e)
            {
                return "";
            }
        }

        public async Task<string> UploadFileBlobAsync(string content, string fileName)
                {
                    try
                    {
                        var containerClient = _blobServiceClient.GetBlobContainerClient(_container);
                        await containerClient.CreateIfNotExistsAsync();

                        var blobClient = containerClient.GetBlobClient(fileName);

                        var fileBytes = Encoding.UTF8.GetBytes(content);

                        var fileDataStream = new MemoryStream(fileBytes);

                        await blobClient.UploadAsync(fileDataStream, overwrite: true);
                        string decoded = HttpUtility.UrlDecode(blobClient.Uri.AbsoluteUri);

                        return decoded;
                    }
                    catch(Exception e)
                    {
                        return "";
                    }
                }

        /*
        public  async Task UploadFileBlobAsync(string filePath, string fileName)
        {
            var containerClient = _blobServiceClient.GetBlobContainerClient(_container);
            await containerClient.CreateIfNotExistsAsync();
            var blobClient = containerClient.GetBlobClient(fileName);
            await blobClient.UploadAsync(filePath, new BlobHttpHeaders {ContentType = filePath.GetContentType()});
        }
        */
        
    }
}

