using Microsoft.Azure.CognitiveServices.Vision.CustomVision.Prediction;
using Microsoft.Azure.CognitiveServices.Vision.CustomVision.Training;
using Microsoft.Azure.CognitiveServices.Vision.CustomVision.Training.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace PRY2020237.Service
{
    public interface ICustomService
    {
        Project GetProject();
        Microsoft.Azure.CognitiveServices.Vision.CustomVision.Prediction.Models.ImagePrediction TestIteration(Guid guid, string content);
    }
}
