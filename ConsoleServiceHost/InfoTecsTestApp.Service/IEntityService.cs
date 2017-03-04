using System;
using System.Collections.Generic;

namespace InfoTecsTestApp.Service
{
    public interface IEntityService<T>
    {
        IEnumerable<T> GetAll();
        T Get(Guid id);
        void Delete(Guid id);
        void Create(T shift);
        void Update(T shift);
        void Save();
    }
}