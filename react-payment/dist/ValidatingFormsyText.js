'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormsyText = require('formsy-material-ui/lib/FormsyText');

var _FormsyText2 = _interopRequireDefault(_FormsyText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Validates on change instead of just on blur
//
// Use on the last input of the form, so that the button is enabled as soon as
// user types a valid entry
//
// https://github.com/mbrookes/formsy-material-ui/issues/97

function debounceFunc(fn, delay) {
  var timer = null;
  return function () {
    var _this = this;

    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(_this, args);
    }, delay);
  };
}

exports.default = _react2.default.createClass({
  displayName: 'ValidatingFormsyText',
  componentDidMount: function componentDidMount() {
    var _props$debounce = this.props.debounce,
        debounce = _props$debounce === undefined ? 200 : _props$debounce;

    this.setValidate = debounceFunc(this.refs.input.setValue, debounce);
  },
  componentWillReceiveProps: function componentWillReceiveProps() {
    var input = this.refs.input;
    input.setState({ value: input.getValue() || '' });
  },
  onChange: function onChange(event) {
    if (this.props.onChange) this.props.onChange(event);
    this.setValidate(event.currentTarget.value);
  },
  render: function render() {
    return _react2.default.createElement(_FormsyText2.default, (0, _extends3.default)({ ref: 'input' }, this.props, { onChange: this.onChange }));
  }
});