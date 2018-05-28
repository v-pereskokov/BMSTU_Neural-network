import * as React from 'react';
import {connect} from 'react-redux';
import {AutoComplete, Form, Icon, Input} from 'antd';
import * as InputMask from 'react-input-mask';

import {setActiveElement, setFormData} from '../../redux/form/form.action';
import {VACANCY_FORM_NAME} from '../../service/Constants/Constants';

const FormItem = Form.Item;

interface IProps {
  mask: string;
  maskChar?: string | null;
  placeholder?: string;
  prefix?: any;
  onChange?: (event) => void;
  setActive?: (name, state) => void;
  setActiveName?: string;
}

interface IState {
  value: string;
}

class HandledMask extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  public componentWillReceiveProps(nextProps) {
    if (nextProps.hasOwnProperty('value')) {
      this.setState(nextProps.value);
    }
  }

  public componentDidMount() {
    const {setActive, setActiveName} = this.props;
    setActive(setActiveName, this.state.value);
  }

  public render(): JSX.Element {
    const {placeholder, mask, maskChar = null} = this.props;
    const {value} = this.state;

    return (
      <InputMask
        mask={mask}
        maskChar={maskChar}
        value={value}
        placeholder={placeholder}
        onChange={this.handleChange}
        className='ant-input'
      />
    );
  }

  public handleChange(event: any) {
    const value: string = event.target.value;

    if (!('value' in this.props)) {
      this.setState({value});
    }

    this.triggerChange({value});
  };

  public triggerChange(changedValue: any) {
    const {onChange, setActive, setActiveName} = this.props;

    if (onChange) {
      setActive(setActiveName, changedValue.value);
      onChange(changedValue);
    }
  }
}

const mapStateToProps = (state: any) => {
  return {
    formInfo: state.form,
    suggests: state.suggests
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setData(form: any) {
      dispatch(setFormData(form, VACANCY_FORM_NAME));
    },
    setActive(name: string, state: any) {
      dispatch(setActiveElement(name, state));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandledMask);
