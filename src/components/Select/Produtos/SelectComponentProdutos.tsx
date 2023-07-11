import React, { useState } from 'react';
import { useController, Controller, UseFormRegister, FieldValues } from 'react-hook-form';
import { Props as SelectProps } from 'react-select';
import Select from 'react-select';
import ValueType from 'react-select';


interface ValuesProps {
  id: string;
  name: string;
}

interface OptionType {
  id: string;
  value: string;
  label: string;
}

interface SelectComponentProps extends SelectProps<any> {
  name: string;
  control: any // Ou o tipo correto do seu controlador do React Hook Form
  options: ValuesProps[] | undefined;
  isDisabled?: boolean;
}

const SelectComponentProdutos: React.FC<SelectComponentProps> = ({ name, control, options, isDisabled, ...rest }) => {
  const { field: { value, onChange, onBlur }, fieldState: { error } } = useController({ name, control });

  const newArray = [] as OptionType[];
  const [values, setValues] = useState<OptionType>({value: '', id: '', label: ''})

  options?.forEach(item => {
    // Transforme o objeto
    const transformedItem = {
      value: item.name,
      label: item.name,
      id: item.id
    };

    newArray.push(transformedItem);
  });

  const handleSelectChange = (selectedOption: OptionType | null) => {
    if (selectedOption) {
      const { id } = selectedOption;
      setValues(selectedOption);
      onChange(id); // Passa o ID do item selecionado
      console.log(id);
    } else {
      setValues({ value: '', id: '', label: '' });
      onChange(''); // Define como vazio caso nenhum item seja selecionado
    }
  };


  return (
    <>
      <Controller
        name={name}
        control={control}

        {...rest}
        render={({ field }) => (
          <Select
            placeholder={rest.placeholder}
            options={newArray}
            isDisabled={isDisabled}
            onChange={handleSelectChange}
            value={values}
            defaultValue={{value: 'asd', label: 'asd', id: 'id'}}
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

export default SelectComponentProdutos;
