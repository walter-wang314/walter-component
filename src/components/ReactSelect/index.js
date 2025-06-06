import React from 'react';
import Select from 'react-select';

// 选项配置
const options = [
  { label: 'DPS', value: 'dps' },
  { label: 'SID - SID CPI3', value: 'sid' },
  {
    label: 'ELI/SN',
    value: 'eli',
    isDisabled: true,
    description:
      'Account holder transactor is not allowed for this product purchase. Please proceed with SFP or Power of Attorney journey.',
  },
];

// ✅ 正确使用 react-select 提供的样式系统，确保 option 样式生效
const CustomOption = (props) => {
  const { data, innerRef, innerProps, getStyles } = props;
  const optionStyles = getStyles('option', props);

  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        ...optionStyles,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <div style={{ fontWeight: 'bold' }}>{data.label}</div>
      {data.description && (
        <div style={{ fontSize: '12px', color: '#ddd', marginTop: '4px' }}>
          {data.description}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <div style={{ width: 400, margin: '50px auto' }}>
      <label
        style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}
      >
        Sub Product Type
      </label>
      <Select
        isSearchable={false}
        placeholder="Please Select"
        options={options}
        isOptionDisabled={(option) => option.isDisabled}
        components={{
          Option: CustomOption,
          IndicatorSeparator: () => null,
        }}
        styles={{
          control: (base, state) => ({
            ...base,
            borderRadius: 0,
            borderColor: state.isFocused ? '#007bff' : '#767676',
            boxShadow: 'none',
            minHeight: '40px',
            '&:hover': {
              borderColor: '#252525',
            },
          }),
          menu: (base) => ({
            ...base,
            marginTop: 0,
            zIndex: 10,
            borderRadius: 0,
          }),
          menuList: (base) => ({
            ...base,
            borderRadius: 0,
            padding: 0,
          }),
          dropdownIndicator: (base) => ({
            ...base,
            color: '#666',
            ':hover': {
              color: '#666',
            },
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#0d6efd' : '#fff',
            color: state.isFocused
              ? '#fff'
              : state.isDisabled
              ? '#999'
              : '#000',
            cursor: state.isDisabled ? 'not-allowed' : 'default',
            padding: '8px 12px',
            fontSize: '14px',
          }),
        }}
      />
    </div>
  );
}
