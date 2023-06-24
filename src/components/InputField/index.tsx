import { ChangeEventHandler } from 'react';

import styles from './styles.module.scss';
import { Input } from 'antd';
import ErrorMessage from 'components/ErrorMessage';

type Props = {
  label?: string;
  name: string;
  value: string | undefined;
  error: string | undefined;
  touched: boolean | undefined;
  placeholder?: string;
  type?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: ChangeEventHandler<HTMLInputElement>;
};

const InputField = ({
  label,
  name,
  value,
  error,
  touched,
  placeholder = '',
  type = 'text',
  onChange,
  onBlur,
}: Props) => {
  return (
    <div className={styles.inputFieldWrapper}>
      <label
        className={styles.label}
        htmlFor={name}
      >
        {label}
      </label>
      <Input
        className={styles.input}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        status={error && touched ? 'error' : ''}
        style={{ width: '100%' }}
      />
      {error && touched && <ErrorMessage content={error} />}
    </div>
  );
};

export default InputField;
