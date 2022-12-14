import { FC } from 'react';

import classnames from 'classnames';

const Loading: FC<{ page?: boolean }> = ({ page }) => (
  <div className={classnames('loading', { page })}>
    <div className="dots-container">
      {[1, 2, 3, 4, 5].map(dot => (
        <div className="dot" key={dot} />
      ))}
    </div>
  </div>
);

export default Loading;
