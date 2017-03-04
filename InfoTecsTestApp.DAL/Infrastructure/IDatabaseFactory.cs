using System;

namespace InfoTecsTestApp.DAL.Infrastructure
{
    public interface IDatabaseFactory : IDisposable
    {
        InfoTecsTestAppEntities Get();
    }
}
