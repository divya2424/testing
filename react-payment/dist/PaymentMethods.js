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

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

require('./PaymentMethods.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaymentMethods = function (_Component) {
  (0, _inherits3.default)(PaymentMethods, _Component);

  function PaymentMethods(props, context) {
    (0, _classCallCheck3.default)(this, PaymentMethods);
    return (0, _possibleConstructorReturn3.default)(this, (PaymentMethods.__proto__ || (0, _getPrototypeOf2.default)(PaymentMethods)).call(this, props, context));
  }

  (0, _createClass3.default)(PaymentMethods, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          showCards = _props.showCards,
          showBanks = _props.showBanks,
          cards = _props.cards,
          banks = _props.banks;


      var cardSection = void 0;
      var bankSection = void 0;

      if (showCards) {
        var list = void 0;
        if (cards && cards.length) {
          list = _react2.default.createElement(
            'div',
            { className: 'payment-method-list' },
            cards.map(function (card) {
              return _react2.default.createElement(
                'div',
                {
                  className: 'payment-method',
                  key: card.id },
                _react2.default.createElement(
                  'span',
                  { className: 'payment-method__text payment-method__text--card' },
                  card.brand,
                  _react2.default.createElement(
                    'span',
                    { className: 'payment-method__number' },
                    '\xB7\xB7\xB7',
                    card.last4
                  )
                ),
                _react2.default.createElement(_FlatButton2.default, {
                  label: 'remove',
                  className: 'payment-method__remove',
                  style: { position: "absolute" },
                  onClick: function onClick(e) {
                    return _this2.props.onRemoveCard(card.id, e);
                  }
                }),
                _react2.default.createElement(_Divider2.default, {
                  style: { marginTop: 15 }
                })
              );
            })
          );
        }
        cardSection = _react2.default.createElement(
          'section',
          { className: 'payment-methods__section' },
          list,
          _react2.default.createElement(_RaisedButton2.default, {
            style: { display: "block" },
            className: 'payment-methods__add',
            label: 'add card',
            onClick: this.props.onAddCard,
            primary: true
          })
        );
      }

      if (showBanks) {
        var _list = void 0;
        var addText = "add bank account";

        if (banks && banks.length) {
          addText = "add account";
          _list = _react2.default.createElement(
            'div',
            { className: 'payment-method-list' },
            banks.map(function (bank) {
              return _react2.default.createElement(
                'div',
                {
                  className: 'payment-method',
                  key: bank.id },
                _react2.default.createElement(
                  'span',
                  { className: 'payment-method__text' },
                  'Bank account ending in',
                  _react2.default.createElement(
                    'span',
                    { className: 'payment-method__number' },
                    bank.last4
                  )
                ),
                _react2.default.createElement(_FlatButton2.default, {
                  label: 'remove',
                  className: 'payment-method__remove',
                  style: { position: "absolute" },
                  onClick: function onClick(e) {
                    return _this2.props.onRemoveBank(e, bank.id);
                  }
                }),
                _react2.default.createElement(_Divider2.default, {
                  style: { marginTop: 15 }
                })
              );
            })
          );
        }
        bankSection = _react2.default.createElement(
          'section',
          { className: 'payment-methods__section' },
          _list,
          _react2.default.createElement(_RaisedButton2.default, {
            style: { display: "block" },
            className: 'payment-methods__add',
            label: addText,
            onClick: this.props.onAddBank,
            primary: true
          })
        );
      }

      return _react2.default.createElement(
        'div',
        { className: 'payment-methods' },
        cardSection,
        bankSection
      );
    }
  }]);
  return PaymentMethods;
}(_react.Component);

PaymentMethods.propTypes = {
  showCards: _react.PropTypes.bool.isRequired,
  showBanks: _react.PropTypes.bool.isRequired,
  cards: _react.PropTypes.array,
  banks: _react.PropTypes.array,
  onAddCard: _react.PropTypes.func,
  onAddBank: _react.PropTypes.func,
  onRemoveCard: _react.PropTypes.func,
  onRemoveBank: _react.PropTypes.func
};

exports.default = PaymentMethods;