import React from 'react';
import {Controller} from 'react-hook-form';
import {Box} from '@/components/common/Layout/Box';
import TextField from '@/components/common/TextField/TextField';
import type {KeyboardTypeOptions, TextInputProps} from 'react-native';

interface InputProps {
  control: any;
  name: string;
  label?: string;
  placeholder?: string;
  rules?: object;
  isSubmitted?: boolean;
  errors?: any;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  onPressIconRight?: () => void;
  multiline?: boolean;
  [key: string]: any;
  props?: TextInputProps;
  showPass?: boolean;
  isLoading?: boolean;
}

const Input: React.FC<InputProps> = ({
                                       control,
                                       name,
                                       label,
                                       placeholder,
                                       rules,
                                       isSubmitted,
                                       errors,
                                       keyboardType,
                                       leftIcon,
                                       rightIcon,
                                       onPressIconRight,
                                       multiline = false,
                                       secureTextEntry = false,
                                       showPass = false,
                                       isLoading = false,
                                       ...props
                                     }) => {
  return (
      <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
              <Box>
                <TextField
                    label={label}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    secureTextEntry={secureTextEntry}
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    left={leftIcon}
                    right={rightIcon}
                    onPressIconRight={onPressIconRight}
                    error={isSubmitted && errors[name] ? errors[name].message : ''}
                    multiline={multiline}
                    {...props}
                />
              </Box>
          )}
      />
  );
};

export default Input;
