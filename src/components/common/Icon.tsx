import { SVGProps } from 'react';

import classNames from 'classnames';

import AddPersonIcon from 'icons/add-person.svg';
import ArrowIcon from 'icons/arrow.svg';
import CalculatorIcon from 'icons/calculator.svg';
import EarthIcon from 'icons/earth.svg';
import LightningIcon from 'icons/lightning.svg';
import PlusIcon from 'icons/plus.svg';
import SearchIcon from 'icons/search.svg';
import SpinnerIcon from 'icons/spinner.svg';
import TrashIcon from 'icons/trash.svg';
import UserIcon from 'icons/navbar/UserIcon';
import PhoneIcon from 'icons/navbar/PhoneIcon';
import StarIcon from 'icons/navbar/StarIcon';
import HomeIcon from 'icons/navbar/HomeIcon';

const allowedIcons = [
  'add-person',
  'arrow',
  'calculator',
  'earth',
  'home',
  'lightning',
  'phone',
  'plus',
  'search',
  'spinner',
  'star',
  'trash',
  'user'
] as const;

export type IconName = typeof allowedIcons[number];

interface Props extends SVGProps<SVGSVGElement> {
  name: IconName;
  className?: string;
  spin?: boolean;
}

type Icons = {
  [name in IconName]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

const icons: Icons = {
  'add-person': AddPersonIcon,
  arrow: ArrowIcon,
  calculator: CalculatorIcon,
  earth: EarthIcon,
  home: HomeIcon,
  lightning: LightningIcon,
  phone: PhoneIcon,
  plus: PlusIcon,
  search: SearchIcon,
  spinner: SpinnerIcon,
  star: StarIcon,
  trash: TrashIcon,
  user: UserIcon
};

const Icon: React.FC<Props> = ({ name, className, spin, ...props }) => {
  const IconByType = icons[name];

  if (!IconByType) return null;

  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <IconByType
      name={name}
      className={classNames('icon', className, { spin })}
      {...props}
      viewBox="0 0 24 24"
    />
  );
};

export default Icon;
