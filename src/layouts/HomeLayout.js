import React from 'react';
import style from 'styles/home-layout.less';
import { Link } from 'react-router';

function HomeLayout ({children}) {
  return (
    <div className={style.wrapper}>
      <header><img src="/static/preact.svg"/></header>
      <main>
        <div className={style.tabs}>
          <Link to="/" onlyActiveOnIndex activeClassName={style.active}>Counter</Link>
          <Link to="/about" activeClassName={style.active}>About</Link>
        </div>
        {children}
      </main>
    </div>
  );
}

export default HomeLayout
