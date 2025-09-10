import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const NotFound = (): ReactElement => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Страница не найдена</h2>
        <p className="not-found-description">
          Извините, запрашиваемая страница не существует или была перемещена.
        </p>
        <Link to="/" className="not-found-link">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default NotFound;