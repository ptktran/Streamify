export const customStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: '#181818',
    borderColor: '#181818',
    border: 0,
    boxShadow: 'none',
    borderRadius: '0.5rem',
    padding: '0.3rem',
    '&:hover': {
      borderColor: '#2B2B2B'
    }
  }),
  menu: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: '#181818'
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? '#E71818' : '#181818',
    // '&:hover' : {
    //   backgroundColor: '#2B2B2B'
    // },
    color: '#ffffff'
  }),
  dropdownIndicator: (baseStyles) => ({
    ...baseStyles,
    color: '#A6A6A6',
    '&:hover': {
      color: '#A6A6A6'
    }
  }),
  indicatorSeparator: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: ''
  }),
  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: '#ffffff'
  })
}