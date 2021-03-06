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

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _payment = require('payment');

var _payment2 = _interopRequireDefault(_payment);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _ValidatingFormsyText = require('./ValidatingFormsyText');

var _ValidatingFormsyText2 = _interopRequireDefault(_ValidatingFormsyText);

var _FormsyText = require('formsy-material-ui/lib/FormsyText');

var _FormsyText2 = _interopRequireDefault(_FormsyText);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardForm = function (_Component) {
  (0, _inherits3.default)(CardForm, _Component);

  function CardForm(props, context) {
    (0, _classCallCheck3.default)(this, CardForm);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CardForm.__proto__ || (0, _getPrototypeOf2.default)(CardForm)).call(this, props, context));

    _this.state = {
      canSubmit: false
    };

    _this.enableButton = _this.enableButton.bind(_this);
    _this.disableButton = _this.disableButton.bind(_this);
    _this.onSubmit = _this.onSubmit.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(CardForm, [{
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
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _refs = this.refs,
          number = _refs.number,
          expiration = _refs.expiration,
          cvc = _refs.cvc,
          zip = _refs.zip;


      _payment2.default.formatCardNumber(_reactDom2.default.findDOMNode(number).querySelector('input'));
      _payment2.default.formatCardExpiry(_reactDom2.default.findDOMNode(expiration).querySelector('input'));
      _payment2.default.formatCardCVC(_reactDom2.default.findDOMNode(cvc).querySelector('input'));

      if (zip) {
        _payment2.default.restrictNumeric(_reactDom2.default.findDOMNode(zip).querySelector('input'));
      }
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit(data) {
      var _Payment$fns$cardExpi = _payment2.default.fns.cardExpiryVal(data.expiration),
          month = _Payment$fns$cardExpi.month,
          year = _Payment$fns$cardExpi.year;

      var card = _lodash2.default.omit(data, 'expiration');
      card.exp_month = month;
      card.exp_year = year;

      this.props.onSubmit(card);
    }
  }, {
    key: 'render',
    value: function render() {
      var defaultStyle = {
        display: "block"
      };

      var style = _lodash2.default.extend(defaultStyle, this.props.style);

      var _props = this.props,
          defaultValues = _props.defaultValues,
          label = _props.label;


      return _react2.default.createElement(
        Formsy.Form,
        {
          className: 'card-form',
          onValid: this.enableButton,
          onInvalid: this.disableButton,
          onValidSubmit: this.onSubmit,
          autoComplete: 'on'
        },
        this.props.getName ? _react2.default.createElement(_FormsyText2.default, {
          name: 'name',
          ref: 'name',
          hintText: 'Name on card',
          style: style,
          defaultValue: defaultValues.name,
          required: true
        }) : '',
        _react2.default.createElement(_FormsyText2.default, {
          name: 'number',
          ref: 'number',
          type: 'tel',
          hintText: 'Card number',
          validations: {
            isValid: function isValid(otherValues, card) {
              return _payment2.default.fns.validateCardNumber(card);
            }
          },
          validationError: 'Invalid card number',
          className: 'cc-number',
          defaultValue: defaultValues.number,
          style: style,
          required: true
        }),
        _react2.default.createElement(_FormsyText2.default, {
          name: 'expiration',
          ref: 'expiration',
          type: 'tel',
          hintText: 'MM / YY',
          validations: {
            isValid: function isValid(otherValues, expiration) {
              if (!expiration) {
                return false;
              }

              var _Payment$fns$cardExpi2 = _payment2.default.fns.cardExpiryVal(expiration),
                  month = _Payment$fns$cardExpi2.month,
                  year = _Payment$fns$cardExpi2.year;

              return _payment2.default.fns.validateCardExpiry(month, year);
            }
          },
          validationError: 'Invalid expiration'
          // autoCompleteType="cc-exp"
          , defaultValue: defaultValues.expiration,
          style: style,
          required: true
        }),
        _react2.default.createElement(_ValidatingFormsyText2.default, {
          name: 'cvc',
          ref: 'cvc',
          type: 'tel',
          hintText: 'CVC',
          validations: {
            isNumeric: true,
            rightLength: function rightLength(otherValues, cvc) {
              return cvc && (cvc.length == 3 || cvc.length == 4);
            }
          },
          validationError: this.props.getZip ? 'Invalid CVC' : null,
          className: 'cc-cvc'
          // autoCompleteType="csc"
          , style: style,
          defaultValue: defaultValues.cvc,
          required: true
        }),
        this.props.getZip ? _react2.default.createElement(_ValidatingFormsyText2.default, {
          name: 'zip',
          ref: 'zip',
          type: 'tel',
          hintText: 'ZIP',
          validations: {
            isNumeric: true,
            isLength: 5
          },
          defaultValue: defaultValues.zip,
          style: style,
          required: true
        }) : '',
        _react2.default.createElement(_RaisedButton2.default, {
          type: 'submit',
          label: label || "add card",
          disabled: !this.state.canSubmit,
          style: _lodash2.default.extend({
            width: 175,
            margin: "20px auto"
          }, style),
          primary: true
        })
      );
    }
  }]);
  return CardForm;
}(_react.Component);

CardForm.propTypes = {
  onSubmit: _react.PropTypes.func.isRequired,
  getName: _react.PropTypes.bool,
  getZip: _react.PropTypes.bool,
  style: _react.PropTypes.object,
  defaultValues: _react.PropTypes.object
};

CardForm.defaultProps = {
  getName: false,
  getZip: false,
  defaultValues: {}
};

exports.default = CardForm;