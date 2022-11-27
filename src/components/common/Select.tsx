/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
import { FC, useMemo } from 'react';

import { FormGroup, Label } from 'reactstrap';
import ReactSelect, { Props, components, GroupProps } from 'react-select';

import Icon from 'components/common/Icon';

import useInterviewOptions from 'hooks/interview/useInterviewOptions';

export interface Option {
  label?: string;
  value?: string;
  icon?: string;
}

export interface InputProps extends Props {
  label?: string;
  inputClassName?: string;
  name?: string;
  icon?: string;
}

const CustomControl = (props: any): JSX.Element => {
  if (props?.selectProps?.icon)
    return (
      <div className="control-with-icon">
        <Icon name={props?.selectProps.icon} />
        <components.Control {...props} />
      </div>
    );

  return <components.Control {...props} />;
};

const Select: FC<InputProps> = ({ value, children, label, name, isMulti, options, ...props }) => {
  const { isCompleted } = useInterviewOptions();

  const selectedValue = useMemo(() => {
    if (!value) return undefined;
    if (isMulti) return value;

    if ((options as GroupProps<Option>[])?.[0]?.options) {
      const groups = options as GroupProps<Option>[];

      return (
        groups.reduce((acc, group) => {
          const selected = group.options.filter(o => value === o.value);

          acc = [...acc, ...selected];

          return acc;
        }, [] as Option[]) || null
      );
    }

    const currentValue = (options as Option[])?.find(opt => opt?.value === value);

    return {
      value,
      label: currentValue?.label
    };
  }, [isMulti, options, value]);

  return (
    <FormGroup className="select form-group">
      {label && (
        <Label for={name} className="label">
          {label}
        </Label>
      )}
      <ReactSelect
        instanceId={name}
        isMulti={isMulti}
        value={selectedValue}
        {...props}
        options={options}
        isDisabled={props.isDisabled || isCompleted}
        classNamePrefix="custom-select"
        components={{ Control: CustomControl }}
      />
      {children}
    </FormGroup>
  );
};

export default Select;
