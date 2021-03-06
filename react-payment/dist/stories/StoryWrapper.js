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

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var appendedStripe = false;

var StoryWrapper = function (_Component) {
  (0, _inherits3.default)(StoryWrapper, _Component);

  function StoryWrapper(props, context) {
    (0, _classCallCheck3.default)(this, StoryWrapper);
    return (0, _possibleConstructorReturn3.default)(this, (StoryWrapper.__proto__ || (0, _getPrototypeOf2.default)(StoryWrapper)).call(this, props, context));
  }

  (0, _createClass3.default)(StoryWrapper, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (appendedStripe) {
        return;
      }

      var script = document.createElement("script");
      script.src = "https://js.stripe.com/v2/";
      script.type = "text/javascript";
      script.async = true;
      script.onload = function () {
        Stripe.setPublishableKey('pk_test_6pRNASCoBOKtIshFeQd4XMUh');
      };
      document.body.appendChild(script);

      appendedStripe = true;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _MuiThemeProvider2.default,
        null,
        _react2.default.createElement(
          'div',
          { style: {
              width: '100%',
              margin: '50px 0',
              display: 'flex',
              justifyContent: 'center'
            } },
          this.props.children
        )
      );
    }
  }]);
  return StoryWrapper;
}(_react.Component);

exports.default = StoryWrapper;