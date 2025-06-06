import React from 'react';
import Select, { components } from 'react-select';

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

// 自定义 Option 显示样式（包括禁用逻辑）
const CustomOption = (props) => {
  const { data, innerRef, innerProps, isDisabled } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        padding: '8px 12px',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.5 : 1,
        backgroundColor: props.isFocused ? '#f0f0f0' : 'transparent',
      }}
    >
      <div style={{ fontWeight: 'bold' }}>{data.label}</div>
      {data.description && (
        <div style={{ fontSize: '12px', color: '#555', marginTop: '4px' }}>
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
        placeholder="Please select"
        options={options}
        isOptionDisabled={(option) => option.isDisabled}
        components={{
          Option: CustomOption,
          IndicatorSeparator: () => null, // ✅ 彻底移除竖线
        }}
        styles={{
          control: (base) => ({
            ...base,
            borderRadius: 0,
            borderColor: '#ccc',
            minHeight: '40px',
            boxShadow: 'none',
          }),
          menu: (base) => ({
            ...base,
            marginTop: 0,
            zIndex: 10,
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#f0f0f0' : 'transparent',
            color: '#000',
            cursor: state.isDisabled ? 'not-allowed' : 'pointer',
          }),
        }}
      />
    </div>
  );
}
