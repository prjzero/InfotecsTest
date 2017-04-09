using System.Web.Mvc;
using Autofac;
using Autofac.Integration.Mvc;
using WebApp.WorkerServiceReference;

namespace WebApp
{
    public class AutofacConfig
    {
        public static void ConfigureContainer()
        {
            var builder = new ContainerBuilder();
            builder.RegisterControllers(typeof(MvcApplication).Assembly);
            builder.RegisterAssemblyModules(typeof(MvcApplication).Assembly);
            builder.RegisterInstance<IWorkerWcfService>(new WorkerWcfServiceClient());
            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        }
    }
}