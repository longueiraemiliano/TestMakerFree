using System;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using TestMakerFreeWebApp.ViewModels;
using System.Collections.Generic;

namespace TestMakerFreeWebApp.Controllers
{
    [Route("api/[controller]")]
    public class QuestionController : Controller
    {
        // GET api/question/all 
        [HttpGet("All/{quizId}")]
        public IActionResult All(int quizId)
        {
            var sampleQuestions = new List<QuestionViewModel>();

            // add a first sample question 
            sampleQuestions.Add(new QuestionViewModel()
            {
                Id = 1,
                QuizId = quizId,
                Text = "What do you value most in your life?",
                CreatedDate = DateTime.Now,
                LastModifiedDate = DateTime.Now
            });

            // add a bunch of other sample questions 
            for (int i = 2; i <= 5; i++)
            {
                sampleQuestions.Add(new QuestionViewModel()
                {
                    Id = i,
                    QuizId = quizId,
                    Text = String.Format("Sample Question {0}", i),
                    CreatedDate = DateTime.Now,
                    LastModifiedDate = DateTime.Now
                });
            }

            // output the result in JSON format 
            return new JsonResult(
                sampleQuestions,
                new JsonSerializerSettings()
                {
                    Formatting = Formatting.Indented
                });
        }

        #region RESTful conventions methods 
        /// <summary> 
        /// Retrieves the Answer with the given {id} 
        /// </summary> 
        /// &lt;param name="id">The ID of an existing Answer</param> 
        /// <returns>the Answer with the given {id}</returns> 
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return Content("Not implemented (yet)!");
        }

        /// <summary> 
        /// Adds a new Answer to the Database 
        /// </summary> 
        /// <param name="m">The AnswerViewModel containing the data to insert</param> 
        [HttpPut]
        public IActionResult Put(QuestionViewModel m)
        {
            throw new NotImplementedException();
        }

        /// <summary> 
        /// Edit the Answer with the given {id} 
        /// </summary> 
        /// <param name="m">The AnswerViewModel containing the data to update</param> 
        [HttpPost]
        public IActionResult Post(QuestionViewModel m)
        {
            throw new NotImplementedException();
        }

        /// <summary> 
        /// Deletes the Answer with the given {id} from the Database 
        /// </summary> 
        /// <param name="id">The ID of an existing Answer</param> 
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}
