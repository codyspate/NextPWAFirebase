import React from 'react'
import PropTypes from 'prop-types'

const TextHelper = ({ message }) => message ?
  <small className='Input-Help'>
    {message}
    <style jsx>{`
      @keyframes HelpAnimation {
        0%   { opacity: 0; }
        100% { opacity: 1; }
      }

      .Input-Help {
        display: block;
        margin-top: 10px;
        color: #394d5a;
        font-size: 14px;
        padding-bottom: 8px;
        font-weight: 300;
        animation: HelpAnimation .2s forwards;
      }
    `}</style>
  </small> : null

const InputField = ({ children }) => (
  <div className='Input-Field'>
    {children}
    <style jsx>{`
      .Input-Field {
        margin-top: 30px;
      }
    `}</style>
  </div>
)

const Label = ({ htmlFor, children }) => (
  <label
    className='Input-Label'
    htmlFor={htmlFor}
  >
    {children}
    <style jsx>{`
      .Input-Label {
        display: block;
        color: #273b49;
        font-size: 14px;
        padding-bottom: 8px; 
      }
    `}</style>
  </label>
)

const Input = ({
  elementConfig,
  changed,
  touched,
  invalid,
  elementType,
  value,
  label,
  name,
  placeholder,
  AboveComponent,
  CustomElement
}) => {
  let inputElement, _elementConfig;

  _elementConfig = {
    ...elementConfig,
    placeholder: placeholder || `Enter an ${label}`
  }

  const inputClasses = ['Input'];

  if (invalid && touched) {
    inputClasses.push('Input-Invalid');
  }

  if (elementType === 'select' && !value) {
    inputClasses.push('Input-Option-Default');
  }

  switch (elementType) {
    case ('input'):
      inputElement = (
        <React.Fragment>
          <input
            className={inputClasses.join(' ')}
            value={value}
            onChange={changed}
            id={name}
            {..._elementConfig}
          />
          <style jsx> {`
          .Input 
            background: #fff;
            border: 0;
            border-radius: 4px;
            box-shadow: inset 0 0 0 1px #687680;
            box-sizing: border-box;
            color: #273b49;
            display: block;
            font-family: Raleway, "Helvetica Neue", "Helvetica", "Arial", sans-serif;
            padding: 0 16px;
            width: 100%;
            min-height: 48px;
            font-size: 16px;
            line-height: 1.5em;
            font-weight: 400;
          }
          
          .Input:hover, .Input:focus {
            box-shadow: inset 0 0 0 2px #0d74af;
            outline: none;
          }
          
          .Input::-webkit-input-placeholder {
            color: #687680; }
          
          .Input:-moz-placeholder {
            color: #687680; }
            
          .Input::-moz-placeholder {
            color: #687680; }
            
          .Input:-ms-input-placeholder {
            color: #687680; }
          
          .Input-Invalid {
              box-shadow: inset 0 0 0 2px #d03027;
          }
          
          .Input:disabled, .Input:disabled:hover {
            background-color: #f2f3f4;
            border: 1px solid #c9ced2;
            box-shadow: none;
            cursor: not-allowed;
            color: #c9ced2; }
          
          .Input:disabled::placeholder, .Input:disabled:hover::placeholder {
            color: #c9ced2; }
          
          .Input:disabled::-webkit-input-placeholder, .Input:disabled:hover::-webkit-input-placeholder {
            color: #c9ced2; }
          
          .Input:disabled:-moz-placeholder, .Input:disabled:hover:-moz-placeholder {
            color: #c9ced2; }
          
          .Input:disabled::-moz-placeholder, .Input:disabled:hover::-moz-placeholder {
            color: #c9ced2; }
          
          .Input:disabled:-ms-input-placeholder, .Input:disabled:hover:-ms-input-placeholder {
            color: #c9ced2; }
        `}</style>
        </React.Fragment>
      )
      break;
    case ('textarea'):
      inputElement = (
        <React.Fragment>
          <textarea
            className={`${inputClasses.join(' ')} Textarea ${(invalid && touched) && '--error'}`}
            value={value}
            onChange={changed}
            id={name}
            {..._elementConfig}
          />
          <style jsx>{`
            .Textarea {
              background: #fff;
              border: 0;
              border-radius: 4px;
              box-shadow: inset 0 0 0 1px #687680;
              box-sizing: border-box;
              color: #273b49;
              display: block;
              font-family: Raleway, "Helvetica Neue", "Helvetica", "Arial", sans-serif;
              padding: 16px;
              width: 100%;
              height: 192px;
              font-family: Raleway, "Helvetica Neue", "Helvetica", "Arial", sans-serif;
              font-size: 16px;
              line-height: 1.5em;
              font-weight: 400;
            }
            
            .Textarea.--error {
              box-shadow: inset 0 0 0 2px #d03027; }
              
            .Textarea:hover, .Textarea:focus {
              box-shadow: inset 0 0 0 2px #0d74af;
              outline: none; }
            
            .Textarea::-webkit-input-placeholder {
              color: #687680; }
            
            .Textarea:-moz-placeholder {
              color: #687680; }
            
            .Textarea::-moz-placeholder {
              color: #687680; }
            
            .Textarea:-ms-input-placeholder {
              color: #687680; }
            
            .Textarea:disabled, .Textarea:disabled:hover {
              background-color: #f2f3f4;
              border: 1px solid #c9ced2;
              box-shadow: none;
              cursor: not-allowed;
              color: #c9ced2; }
            
            .Textarea:disabled::placeholder, .Textarea:disabled:hover::placeholder {
              color: #c9ced2; }
            
            .Textarea:disabled::-webkit-input-placeholder, .Textarea:disabled:hover::-webkit-input-placeholder {
              color: #c9ced2; }
            
            .Textarea:disabled:-moz-placeholder, .Textarea:disabled:hover:-moz-placeholder {
              color: #c9ced2; }
            
            .Textarea:disabled::-moz-placeholder, .Textarea:disabled:hover::-moz-placeholder {
              color: #c9ced2; }
            
            .Textarea:disabled:-ms-input-placeholder, .Textarea:disabled:hover:-ms-input-placeholder {
              color: #c9ced2; }
          `}</style>
        </React.Fragment>
      )
      break;
    case ('select'):
      inputElement = (
        <React.Fragment>
          <select
            className={inputClasses.join(' ')}
            value={value}
            onChange={changed}
            id={name}
          >
            <option key='default' value=''>{_elementConfig.placeholder}</option>
            {_elementConfig.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            ))}
          </select>
          <style jsx>{`
            .Input-Option-Default {
              color: #687680;
            }
          `}</style>
        </React.Fragment>
      );
      break;
    case ('custom'):
      inputElement = (
        <CustomElement />
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          value={value}
          onChange={changed}
          id={name}
          {..._elementConfig}
        />
      )
  }

  return (
    <React.Fragment>
      <InputField>
        {AboveComponent && <AboveComponent />}
        <Label htmlFor={name}>
          {label}
        </Label>
        {inputElement}
        <TextHelper message={invalid} />
      </InputField>
    </React.Fragment>
  );
};

Input.propTypes = {
  changed: PropTypes.func.isRequired,
  elementConfig: PropTypes.object.isRequired,
  touched: PropTypes.bool.isRequired,
  invalid: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  AboveComponent: PropTypes.func,
  CustomElement: PropTypes.func
}

export default Input

export {
  TextHelper,
  Label,
  InputField
}