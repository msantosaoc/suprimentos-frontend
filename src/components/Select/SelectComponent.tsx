import React, { useState } from 'react';
import { useController, Controller, UseFormRegister, FieldValues } from 'react-hook-form';
import { Props as SelectProps } from 'react-select';
import Select from 'react-select';
import ValueType from 'react-select';


interface ValuesProps {
  name: string;
}

interface OptionType {
  value: string;
  label: string;
}

interface SelectComponentProps extends SelectProps<any> {
  name: string;
  control: any // Ou o tipo correto do seu controlador do React Hook Form
  options: ValuesProps[] | undefined;
}

const SelectComponent: React.FC<SelectComponentProps> = ({ name, control, options, ...rest }) => {
  const { field: { value, onChange, onBlur }, fieldState: { error } } = useController({ name, control });

  const newArray = [] as OptionType[];

  options?.forEach(item => {
    // Transforme o objeto
    const transformedItem = {
      value: item.name,
      label: item.name
    };

    newArray.push(transformedItem);
  });


  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            placeholder="Selecione"
            options={newArray}
            onChange={(e) => {
              // onChange's arg will send value into hook form
              onChange(e?.value);
            }}
            value={{
              // make sure we remain the corect format for the controlled component
              value: value,
              label: value
            }}
            isSearchable
            noOptionsMessage={() => "Não encontrado"}
            styles={{
              placeholder: (baseStyles, state) => ({
                ...baseStyles,
                fontSize: '0.9rem',
                color: '#a6a6a7',
              }),
              dropdownIndicator: (baseStyles, state) => ({
                ...baseStyles,
                color: '#505559',
                ":hover": {
                  cursor: 'pointer'
                }
              }),
              control: (baseStyles, state) => ({
                ...baseStyles,
                fontSize: '0.9rem',
                borderColor: '#e0e1e3',
                borderRadius: '0.35rem',
                ":hover": {
                  borderColor: '#aba6a7'
                },
              }),
              input: (baseStyles, state) => ({
                ...baseStyles,
              }),
              group: (baseStyles, state) => ({
                ...baseStyles,
              }),
              menuList: (baseStyles, state) => ({
                ...baseStyles,
                fontSize: '0.9rem',
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: state.isSelected ? '#5ea9d3' : '',
                ":hover": {
                  backgroundColor: 'RGBA(94,169,211, 0.3)' && state.isSelected ? '' : 'RGBA(94,169,211, 0.3)',
                  cursor: 'pointer'
                }
              }),
 
            }}
          />
        )}
      />
    </>
  );
};

export default SelectComponent;
