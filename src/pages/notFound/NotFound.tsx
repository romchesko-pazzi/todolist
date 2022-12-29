import React from 'react';

import { Link } from 'react-router-dom';

import s from './notFound.module.scss';

export const NotFound = () => {
  return (
    <div className={s.container}>
      <div className={s.block}>
        <p>404, page not found.</p>
        <Link className={s.link} to="/">
          go back
        </Link>
      </div>
    </div>
  );
};
