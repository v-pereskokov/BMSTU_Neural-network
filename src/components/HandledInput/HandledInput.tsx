import * as React from 'react';
import {AutoComplete, Form, Icon, Input} from 'antd';
import {setFormData} from '../../redux/form/form.action';
import {connect} from 'react-redux';
import {VACANCY_FORM_NAME} from '../../service/Constants/Constants';

const FormItem = Form.Item;

interface IProps {
  placeholder?: string;
  prefix?: any;
  onChange?: (event) => void;
  formatter?: RegExp;
}

interface IState {
  value: string;
}

class HandledInput extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  public componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }

  public render(): JSX.Element {
    const {placeholder, prefix = ''} = this.props;
    const {value} = this.state;

    return (
      <Input
        placeholder={placeholder}
        onChange={this.handleChange}
        value={value}
        prefix={prefix}
      />
    );
  }

  public handleChange(event: any) {
    const value: string = event.target.value;
    const {formatter} = this.props;

    if (formatter && !value.split('').every((item: string) => formatter.test(item))) {
      return;
    }

    if (!('value' in this.props)) {
      this.setState({value});
    }

    this.triggerChange({value});
  };

  public triggerChange(changedValue: any) {
    const {onChange} = this.props;

    if (onChange) {
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandledInput);
