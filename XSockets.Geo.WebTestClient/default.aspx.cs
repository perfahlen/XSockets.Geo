using System;
using System.Configuration;
namespace XSockets.Geo.WebTestClient
{
    public partial class _default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                XSocketsUrl = ConfigurationManager.AppSettings["XSocketServerAdress"];
                BingKey = ConfigurationManager.AppSettings["BingKey"];
            }
        }

        public string XSocketsUrl { get; set; }

        public string BingKey { get; set; }
    }
}