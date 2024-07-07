import React, { useState } from 'react';
import { Button, View, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { Buffer } from 'buffer';
import HmacSHA512 from 'crypto-js/hmac-sha512';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Payment } from './../Services'
import { useAuth, useUser } from '@clerk/clerk-expo'

import 'react-native-get-random-values';

const vnpayConfig = {
  vnp_TmnCode: '8GAJ0VLV',
  vnp_HashSecret: 'VPLVZQYABKOJSGNRABUYFCGHADJBWUYI',
  vnp_Url: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
  vnp_Returnurl: 'http://127.0.0.1:8000/checkout-success',
};

const createPaymentUrl = async (order) => {
  const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  const vnp_TmnCode = vnpayConfig.vnp_TmnCode;
  const vnp_HashSecret = vnpayConfig.vnp_HashSecret;
  const vnp_Returnurl = vnpayConfig.vnp_Returnurl;

  const vnp_TxnRef = order.code;
  const vnp_OrderInfo = "Thanh toán hóa đơn";
  const vnp_OrderType = "Elearning";
  const vnp_Amount = order.amount * 100;
  const vnp_Locale = "VN";
  const vnp_BankCode = "NCB";
  const vnp_IpAddr = "127.0.0.1";

  const formatDate = (date) => {
    const pad = (n) => (n < 10 ? '0' + n : n);
    return date.getFullYear().toString() +
      pad(date.getMonth() + 1) +
      pad(date.getDate()) +
      pad(date.getHours()) +
      pad(date.getMinutes()) +
      pad(date.getSeconds());
  };

  const vnp_CreateDate = formatDate(new Date());

  const inputData = {
    "vnp_Version": "2.1.0",
    "vnp_TmnCode": vnp_TmnCode,
    "vnp_Amount": vnp_Amount,
    "vnp_Command": "pay",
    "vnp_CreateDate": vnp_CreateDate,
    "vnp_CurrCode": "VND",
    "vnp_IpAddr": vnp_IpAddr,
    "vnp_Locale": vnp_Locale,
    "vnp_OrderInfo": vnp_OrderInfo,
    "vnp_OrderType": vnp_OrderType,
    "vnp_ReturnUrl": vnp_Returnurl,
    "vnp_TxnRef": vnp_TxnRef,
  };

  if (vnp_BankCode !== "") {
    inputData['vnp_BankCode'] = vnp_BankCode;
  }

  const sortedParams = sortObject(inputData);
  const querystring = new URLSearchParams(sortedParams).toString();
  const secureHash = createSecureHash(querystring, vnp_HashSecret);

  return `${vnp_Url}?${querystring}&vnp_SecureHashType=SHA512&vnp_SecureHash=${secureHash}`;
};

const sortObject = (obj) => {
  return Object.keys(obj).sort().reduce((result, key) => {
    result[key] = obj[key];
    return result;
  }, {});
};

const createSecureHash = (querystring, secret) => {
  return HmacSHA512(querystring, secret).toString();
};

const PaymentScreen = () => {
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [transactionCode, setTransactionCode] = useState(null);
  const navigation = useNavigation();
  const param = useRoute().params;
  const { user } = useUser();
  const email = user.primaryEmailAddress.emailAddress;
  const userType = param.type;

  const handlePayment = async () => {
    const randomCode = Math.floor(100 + Math.random() * 900);
    const order = {
      code: randomCode.toString() + Date.now(),
      amount: param.price,
    };

    const url = await createPaymentUrl(order);
    setPaymentUrl(url);
  };

  const handleNavigationStateChange = async (navState) => {
    if (navState.url.includes('checkout-success')) {
      const urlParams = new URLSearchParams(navState.url.split('?')[1]);
      const transactionCode = urlParams.get('vnp_TxnRef');
      setTransactionCode(transactionCode);
      const date = new Date().toISOString(); 
      
      
      try {
        Payment(email, date, transactionCode, userType).then(resp => {
          if (resp) {
            Alert.alert('success!');
            navigation.navigate('Home');
          } else {
            Alert.alert('false');
            navigation.navigate('vnpay');
          }
        })
      } catch (error) {
        console.error('Error updating payment details:', error);
      }

      navigation.navigate('Home');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Pay with VNPAY" onPress={handlePayment} />
      {paymentUrl && (
        <View style={{ flex: 1 }}>
          <WebView 
            source={{ uri: paymentUrl }} 
            originWhitelist={['*']} 
            onNavigationStateChange={handleNavigationStateChange}
          />
        </View>
      )}
    </View>
  );
};

export default PaymentScreen;
