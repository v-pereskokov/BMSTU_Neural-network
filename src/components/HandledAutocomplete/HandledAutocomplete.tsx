import * as React from 'react';
import {AutoComplete, Form} from 'antd';
import {connect} from 'react-redux';

import {setActiveElement} from '../../redux/form/form.action';

const FormItem = Form.Item;

interface IProps {
  placeholder?: string;
  filter?: (value, option) => boolean;
  data?: string[];
  value?: any;
  onChange?: (event) => void;
  onPick?: (value, option) => void;
  setActive?: (name, state) => void;
  setActiveName?: string;
}

interface IState {
  value: string;
}

class HandledAutocomplete extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      value: this.props.value.value
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
    const {
      placeholder, data = [], onPick,
      filter = (inputValue: any, option: any) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    } = this.props;
    const {value} = this.state;

    return (
      <AutoComplete
        value={value}
        dataSource={data}
        placeholder={placeholder}
        filterOption={filter}
        onChange={this.handleChange}
        onSelect={onPick}
      />
    );
  }

  public handleChange(value: string) {
    if (!(this.props.hasOwnProperty('value'))) {
      this.setState({value});
    }

    this.triggerChange({value});
  };

  public triggerChange(changedValue: { value: string }) {
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
    setActive(name: string, state: string) {
      dispatch(setActiveElement(name, state));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandledAutocomplete);
