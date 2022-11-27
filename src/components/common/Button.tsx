import { FC, forwardRef, LegacyRef, useMemo, useCallback } from 'react';

import { Button as BSButton, ButtonProps, Spinner } from 'reactstrap';
import classNames, { Argument } from 'classnames';

import formatPhone from 'utils/formatPhone';

type DefaultButtonTypes = 'submit' | 'reset' | 'button' | undefined;

interface CustomButtonProps extends Omit<ButtonProps, 'type'> {
  type?: DefaultButtonTypes | 'phone' | 'email';
}

const defaultButtonTypes = ['submit', 'reset', 'button', undefined];

const Button: FC<CustomButtonProps> = forwardRef(
  (
    { children, color = 'primary', loading, disabled, value, type, className, onClickCB, ...props },
    ref: LegacyRef<BSButton>
  ) => {
    const isCustomType = useMemo(() => !defaultButtonTypes.includes(type), [type]);

    const bntType = useMemo(
      () => (defaultButtonTypes.includes(type) ? type : 'button') as DefaultButtonTypes,
      [type]
    );

    const onClick = useCallback(
      e => {
        if (!isCustomType) return onClickCB?.(e);

        switch (type) {
          case 'phone':
            window.location.href = `tel:${value}`;
            break;
          case 'email':
            window.location.href = `mailto:${value}`;
            break;

          default:
            break;
        }
      },
      [isCustomType, onClickCB, type, value]
    );

    const btnContent = useMemo(() => {
      if (loading) return <Spinner color="black" size="sm" />;

      if (isCustomType && value) {
        switch (type) {
          case 'phone':
            return <span>{formatPhone(value as number | string)}</span>;
          case 'email':
            return <span>Message</span>;

          default:
            break;
        }
      }

      return children;
    }, [loading, isCustomType, value, children, type]);

    return (
      <BSButton
        color={color}
        disabled={loading || disabled}
        type={bntType}
        onClick={onClick}
        className={classNames(
          className as Argument,
          { 'custom-btn-type': isCustomType },
          isCustomType && type
        )}
        {...props}
        ref={ref}
      >
        {btnContent}
      </BSButton>
    );
  }
);

export default Button;
