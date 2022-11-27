import { FC, useCallback, useMemo, useState } from 'react';

import classnames from 'classnames';
import { Collapse } from 'reactstrap';
import { camelCase } from 'lodash';
import { Element } from 'react-scroll';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  number: number;
  title: string;
  bodyClassName?: string;
}

const InterviewSection: FC<Props> = ({ children, number, title, bodyClassName }) => {
  const [isOpen, setIsOpen] = useState(true);

  const sectionId = useMemo(() => `#${camelCase(title)}`, [title]);

  const handleClick = useCallback(() => setIsOpen(prev => !prev), []);

  return (
    <section className="interview-section" id={sectionId}>
      <Element name={sectionId}>
        <button className="btn collapse-button" type="button" onClick={handleClick}>
          <div className="section-name">
            <span className={classnames('interview-section-number', `section-${number}`)}>
              {number}
            </span>
            <h2 className="interview-section-header m-0">{title}</h2>
          </div>
          <FontAwesomeIcon icon="angle-down" className={classnames({ open: isOpen })} />
        </button>
        <Collapse isOpen={isOpen}>
          <div className={classnames('interview-section-body', bodyClassName)}>{children}</div>
        </Collapse>
      </Element>
    </section>
  );
};

export default InterviewSection;
