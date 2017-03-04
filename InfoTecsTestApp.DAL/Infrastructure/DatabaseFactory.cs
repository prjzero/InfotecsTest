namespace InfoTecsTestApp.DAL.Infrastructure
{
public class DatabaseFactory : Disposable, IDatabaseFactory
{
    private InfoTecsTestAppEntities dataContext;
    public InfoTecsTestAppEntities Get()
    {
        return dataContext ?? (dataContext = new InfoTecsTestAppEntities());
    }
    protected override void DisposeCore()
    {
        if (dataContext != null)
            dataContext.Dispose();
    }
}
}
