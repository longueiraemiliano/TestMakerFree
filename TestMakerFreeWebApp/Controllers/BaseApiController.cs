﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mapster;
using TestMakerFreeWebApp.Data.Models;
using Newtonsoft;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace TestMakerFreeWebApp.Controllers
{
    [Route("api/[controller]")]
    public class BaseApiController : Controller
    {
        #region Constructor
        public BaseApiController(ApplicationDbContext context, RoleManager<IdentityRole> roleManager, UserManager<ApplicationUser> userManager, IConfiguration configuration)
        {
            // Instantiate the ApplicationDbContext through DI
            DbContext = context;
            this.RoleManager = roleManager;
            this.UserManager = userManager;
            this.Configuration = configuration;
            // Instantiate a single JsonSerializerSettings object
            // that can be reused multiple times.
            JsonSettings = new JsonSerializerSettings()
            {
                Formatting = Formatting.Indented
            };

        }
        #endregion

        #region Shared Properties
        protected ApplicationDbContext DbContext { get; private set; }
        protected JsonSerializerSettings JsonSettings
        {
            get; private set;
        }

        protected RoleManager<IdentityRole> RoleManager { get; private set; }
        protected UserManager<ApplicationUser> UserManager { get; private set; }
        protected IConfiguration Configuration { get; private set; }
        #endregion
    }
}