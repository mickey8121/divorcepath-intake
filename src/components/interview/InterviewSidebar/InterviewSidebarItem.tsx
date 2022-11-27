import { FC, useMemo } from 'react';

import camelCase from 'lodash/camelCase';
import { Link } from 'react-scroll';
import classNames from 'classnames';

import useCurrentItemInView from 'hooks/interview/useCurrentItemInView';

interface Props {
  title: string;
  step: number;
}

const InterviewSidebarItem: FC<Props> = ({ children, title, step }) => {
  const activeLink = useCurrentItemInView();

  const id = useMemo(() => `#${camelCase(title)}`, [title]);

  const isActive = useMemo(() => id === activeLink, [id, activeLink]);

  return (
    <div className={classNames('sidebar-item', { active: isActive })}>
      <Link to={id} offset={-10} hashSpy name={id}>
        <div
          className={classNames('sidebar-item-header d-flex align-items-center mb-1', {
            [`custom-timeline-section-${step}`]: isActive
          })}
        >
          <span className={`interview-section-number section-${step} text-white ml-2`}>{step}</span>
          <h4 className="sidebar-item-title mb-0">{title}</h4>
        </div>
        <div className="sidebar-item-body pl-4">
          {children || <p className="sidebar-text text-muted mb-0">N/A</p>}
        </div>
      </Link>
    </div>
  );
};

export default InterviewSidebarItem;
