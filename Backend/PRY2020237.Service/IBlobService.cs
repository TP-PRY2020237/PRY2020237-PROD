using PRY2020237.Entity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PRY2020237.Service {

    public interface IBlobService
    {

        Task<BlobInfo> GetBlobAsync(string name);
        Task<IEnumerable<string>> ListBlobAsync();
        //Task UploadFileBlobAsync(string filePath,string fileName);
        Task<string> UploadFileBlobAsync(string content,string fileName);
        Task<string> UploadImageBlobAsync(string content,string fileName);
        Task DeleteBlobAsync(string blobName);

        //Task<string> DownloadAsyncBlob(int id);

    }

   

}

