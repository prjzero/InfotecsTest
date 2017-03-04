using System;
using System.ServiceModel;
using System.ServiceModel.Description;
using Autofac;
using Autofac.Core;
using Autofac.Integration.Wcf;
using InfoTecsTestApp.DAL.Infrastructure;
using InfoTecsTestApp.DAL.Repository;
using InfoTecsTestApp.Service;
using WCFService;

namespace ConsoleServiceHost
{
    class Program
    {
        static void Main(string[] args)
        {
            var builder = ConfigureBuilder();

            using (var container = builder.Build())
            {
                AppDomain.CurrentDomain.SetData("DataDirectory", System.IO.Directory.GetCurrentDirectory());
                var baseAddress = new Uri("http://localhost:8080/WorkerService");
                using (var host = new ServiceHost(typeof(WorkerWcfService), baseAddress))
                {
                    var smb = new ServiceMetadataBehavior
                    {
                        HttpGetEnabled = true,
                        MetadataExporter = { PolicyVersion = PolicyVersion.Policy15 }
                    };
                    host.AddServiceEndpoint(typeof(IWorkerWcfService), new BasicHttpBinding(), string.Empty);
                    host.AddDependencyInjectionBehavior<IWorkerWcfService>(container);
                    host.Description.Behaviors.Add(smb);

                    var debug = host.Description.Behaviors.Find<ServiceDebugBehavior>();
                    if (debug == null)
                    {
                        host.Description.Behaviors.Add(
                             new ServiceDebugBehavior() { IncludeExceptionDetailInFaults = true });
                    }
                    else
                    {
                        if (!debug.IncludeExceptionDetailInFaults)
                        {
                            debug.IncludeExceptionDetailInFaults = true;
                        }
                    }

                    host.Open();

                    Console.WriteLine("The service is ready at {0}", baseAddress);
                    Console.WriteLine("Press <Enter> to stop the service.");
                    Console.ReadLine();

                    host.Close();
                }

               
            }
        }

        private static ContainerBuilder ConfigureBuilder()
        {
            ContainerBuilder builder = new ContainerBuilder();
            builder.RegisterType<DatabaseFactory>().As<IDatabaseFactory>().InstancePerLifetimeScope();
            builder.RegisterType<WorkerRepository>().As<IWorkerRepository>().InstancePerLifetimeScope();
            builder.RegisterType<WorkerObjectRepository>().As<IWorkerObjectRepository>().InstancePerLifetimeScope();
            builder.RegisterType<UnitOfWork>().As<IUnitOfWork>().InstancePerLifetimeScope();
            builder.RegisterType<WorkerService>().As<IWorkerService>().InstancePerLifetimeScope();
            builder.RegisterType<WorkerObjectService>().As<IWorkerObjectService>().InstancePerLifetimeScope();
            builder.RegisterType<WorkerWcfService>().As<IWorkerWcfService>();
            return builder;
        }
    }

    
}
