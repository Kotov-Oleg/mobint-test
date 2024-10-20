import React, { useEffect, useState } from 'react';
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CompaniesI, loadCompanies, loadCompaniesImitation } from './api/companies';
import {mockCompaniesData} from './api/mockCompaniesData'

console.log('data', mockCompaniesData);

function App() {

  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [companies, setCompanies] = useState<CompaniesI['companies']>([]);

  const nextData = async (): Promise<any[]> => {
    // Замена реального запроса на моковый
    // const newCompanies: CompaniesI = await loadCompanies(offset);
    const newCompanies: CompaniesI = await loadCompaniesImitation(offset);
    setOffset((prev) => prev + 10);
    if (newCompanies.companies.length !== 10) setHasMore(false);
    let newArrCompanies: any[] = [];
    setCompanies((prev) => {
      newArrCompanies = [...prev, ...newCompanies.companies];
      return newArrCompanies;
    });
    return newArrCompanies;
  };

  useEffect(() => {
    nextData();
  }, []);

  return (
    <div className={'app'}>
      <h1 className={'heading'}>Управление картами</h1>
      <InfiniteScroll
        next={nextData}
        hasMore={hasMore}
        loader={
          <div className={'loader-container'}>
            <div className={'loader'}></div>
            <span className={'loader-text'}>Подгрузка компаний</span>
          </div>
        }
        dataLength={companies.length}
        className={'scroll'}
      >
        {companies.map((item) => (
          <div key={item.company.companyId} className={'card'}>
            <div className={'icon-container'}>
              <div
                className={'icon'}
                style={{ backgroundColor: item.mobileAppDashboard.accentColor }}
              ></div>
            </div>
            <div className={'company-name'}>
              {item.mobileAppDashboard.companyName}
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default App;
