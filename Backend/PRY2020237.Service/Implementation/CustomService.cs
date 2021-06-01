using Microsoft.Azure.CognitiveServices.Vision.CustomVision.Prediction;
using Microsoft.Azure.CognitiveServices.Vision.CustomVision.Training;
using Microsoft.Azure.CognitiveServices.Vision.CustomVision.Training.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace PRY2020237.Service.Implementation
{
    public class CustomService : ICustomService
    {
        private const string endpoint = "https://southcentralus.api.cognitive.microsoft.com/";
        private const string trainingKey = "ab39d499f7b741e89ae5fa96661e0d23";
        private const string predictionKey = "ab39d499f7b741e89ae5fa96661e0d23";
        public CustomVisionTrainingClient TrainingApi;
        public CustomVisionPredictionClient predictionApi;
        private CustomVisionTrainingClient AuthenticateTraining(string endpoint, string trainingKey, string predictionKey)
        {
            // Create the Api, passing in the training key
            CustomVisionTrainingClient trainingApi = new CustomVisionTrainingClient(new Microsoft.Azure.CognitiveServices.Vision.CustomVision.Training.ApiKeyServiceClientCredentials(trainingKey))
            {
                Endpoint = endpoint
            };
            return trainingApi;
        }
        private CustomVisionPredictionClient AuthenticatePrediction(string endpoint, string predictionKey)
        {
            // Create a prediction endpoint, passing in the obtained prediction key
            CustomVisionPredictionClient predictionApi = new CustomVisionPredictionClient(new Microsoft.Azure.CognitiveServices.Vision.CustomVision.Prediction.ApiKeyServiceClientCredentials(predictionKey))
            {
                Endpoint = endpoint
            };
            return predictionApi;
        }
        public CustomService()
        {
            TrainingApi = AuthenticateTraining(endpoint, trainingKey, predictionKey);
            predictionApi = AuthenticatePrediction(endpoint, predictionKey);
        }
        public Project GetProject()
        {
            var projects = TrainingApi.GetProjects();
            return projects.FirstOrDefault();
        }
        
        public Microsoft.Azure.CognitiveServices.Vision.CustomVision.Prediction.Models.ImagePrediction TestIteration(Guid guid, string content)
        {
            var imageDataByteArray = Convert.FromBase64String(content);
            var imageDataStream = new MemoryStream(imageDataByteArray);

            var result = predictionApi.DetectImage(guid, "PRY2020237-DEV", imageDataStream);
            return result;
        }

    }
}
