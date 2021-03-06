'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ValidatingFormsyText = require('./ValidatingFormsyText');

var _ValidatingFormsyText2 = _interopRequireDefault(_ValidatingFormsyText);

var _FormsyText = require('formsy-material-ui/lib/FormsyText');

var _FormsyText2 = _interopRequireDefault(_FormsyText);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _segmentedControl = require('segmented-control');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BankForm = function (_Component) {
  (0, _inherits3.default)(BankForm, _Component);

  function BankForm(props, context) {
    (0, _classCallCheck3.default)(this, BankForm);

    var _this = (0, _possibleConstructorReturn3.default)(this, (BankForm.__proto__ || (0, _getPrototypeOf2.default)(BankForm)).call(this, props, context));

    _this.state = {
      canSubmit: false
    };

    _this.enableButton = _this.enableButton.bind(_this);
    _this.disableButton = _this.disableButton.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(BankForm, [{
    key: 'enableButton',
    value: function enableButton() {
      this.setState({
        canSubmit: true
      });
    }
  }, {
    key: 'disableButton',
    value: function disableButton() {
      this.setState({
        canSubmit: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var defaultStyle = {
        display: "block"
      };

      var style = _.extend(defaultStyle, this.props.style);

      var defaultValues = this.props.defaultValues;


      return _react2.default.createElement(
        Formsy.Form,
        {
          className: 'card-form',
          onValid: this.enableButton,
          onInvalid: this.disableButton,
          onValidSubmit: this.props.onSubmit,
          autoComplete: 'on'
        },
        _react2.default.createElement(_FormsyText2.default, {
          name: 'name',
          ref: 'name',
          floatingLabelText: 'Name on account',
          style: style,
          defaultValue: defaultValues.name,
          required: true
        }),
        _react2.default.createElement(_FormsyText2.default, {
          name: 'accountNumber',
          ref: 'accountNumber',
          type: 'tel',
          pattern: '\\d*',
          floatingLabelText: 'Account number',
          validations: {
            isNumeric: true,
            isValid: function isValid(otherValues, accountNumber) {
              if (window.Stripe && Stripe.bankAccount && Stripe.bankAccount.validateAccountNumber) {
                return Stripe.bankAccount.validateAccountNumber(accountNumber, 'US');
              } else {
                return true;
              }
            }
          },
          validationError: 'Invalid account number',
          className: 'account-number',
          style: style,
          defaultValue: defaultValues.accountNumber,
          required: true
        }),
        _react2.default.createElement(_ValidatingFormsyText2.default, {
          name: 'routingNumber',
          ref: 'routingNumber',
          type: 'tel',
          pattern: '\\d*',
          floatingLabelText: 'Routing number',
          validations: {
            isNumeric: true,
            isValid: function isValid(otherValues, routingNumber) {
              if (window.Stripe && Stripe.bankAccount && Stripe.bankAccount.validateRoutingNumber) {
                return Stripe.bankAccount.validateRoutingNumber(routingNumber, 'US');
              } else {
                return true;
              }
            }
          },
          validationError: 'Invalid routing number',
          className: 'routing-number',
          style: style,
          defaultValue: defaultValues.routingNumber,
          required: true
        }),
        _react2.default.createElement(_segmentedControl.FormsySegmentedControl, {
          name: 'accountType',
          options: [{ label: "Personal", value: "personal", default: true }, { label: "Business", value: "business" }]
        }),
        _react2.default.createElement(_RaisedButton2.default, {
          type: 'submit',
          label: 'add bank account',
          disabled: !this.state.canSubmit,
          style: _.extend({
            width: 200,
            margin: "20px auto"
          }, style),
          primary: true
        })
      );
    }
  }]);
  return BankForm;
}(_react.Component);

BankForm.propTypes = {
  onSubmit: _react.PropTypes.func.isRequired,
  defaultValues: _react.PropTypes.object,
  style: _react.PropTypes.object
};

BankForm.defaultProps = {
  defaultValues: {}
};

exports.default = BankForm;