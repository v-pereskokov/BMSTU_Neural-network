import * as React from 'react';
import {Form, Radio} from 'antd';
import {setActiveElement, setFormData} from '../../redux/form/form.action';
import {connect} from 'react-redux';
import {VACANCY_FORM_NAME} from '../../service/Constants/Constants';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

interface IProps {
  onChange?: (event) => void;
  value?: any;
  name: string;
  setActive?: (name, state) => void;
  setActiveName?: string;
}

interface IState {
  value: string;
}

class HandledRadio extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      value: this.props.value.value
    };

    this.handleChange = this.handleChange.bind(this);
  }

  public componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }

  public componentDidMount() {
    const {setActive, setActiveName} = this.props;
    setActive(setActiveName, this.state.value);
  }

  public render(): JSX.Element {
    const {name} = this.props;
    const {value} = this.state;

    return (
      <RadioGroup value={value} onChange={this.handleChange}>
        <Radio value={`${name}_1`}>Свой авто</Radio>
        <Radio value={`${name}_2`}>Аренда</Radio>
      </RadioGroup>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandledRadio);
