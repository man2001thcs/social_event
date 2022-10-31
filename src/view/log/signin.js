import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {TextInput} from '@react-native-material/core';
import {Formik, Form, Field, ErrorMessage, useFormik} from 'formik';
import * as Yup from 'yup';
import GenerateRandomCode from 'react-random-code-generator';

export default function SignIn({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const SignupSchema = Yup.object().shape({
    emailS: Yup.string().email('Invalid email').required('Required'),
    passwordS: Yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required password!!'),
    re_passwordS: Yup.string()
      .oneOf([Yup.ref('passwordS'), null], "Passwords don't match!")
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required password!!'),
    fullname: Yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required name!!'),
    address: Yup.string()
      .min(2, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Required address!!'),
    phone_number: Yup.number('Invalid number!!').required('Required number!!'),
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container_sub}>
          <Image
            style={styles.image}
            source={require('../../src/img/log/book_logo.png')}
          />
          <Formik
            validationSchema={SignupSchema}
            initialValues={{
              emailS: '',
              passwordS: '',
              fullname: '',
              address: '',
              phone_number: '',
            }}
            onSubmit={values => {
              console.log(values);
              fetch(
                'http://192.168.1.189/php_server/controller/user/sign_in.php',
                {
                  method: 'POST',
                  mode: 'no-cors',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify(values),
                },
              )
                .then(res => res.json())
                .then(data => {
                  console.log('Success:', data);
                })
                .catch(error => {
                  console.error('Error:', error);
                });
            }}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
            }) => (
              <View>
                <TextInput
                  name="emailS"
                  label="Email Address"
                  style={styles.textInput}
                  onChangeText={handleChange('emailS')}
                  onBlur={handleBlur('emailS')}
                  value={values.emailS}
                  keyboardType="email-address"
                />
                {errors.emailS && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.emailS}
                  </Text>
                )}

                <TextInput
                  name="passwordS"
                  label="New password"
                  style={styles.textInput}
                  onChangeText={handleChange('passwordS')}
                  onBlur={handleBlur('passwordS')}
                  value={values.new_passwordS}
                  secureTextEntry
                />
                {errors.passwordS && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.passwordS}
                  </Text>
                )}

                <TextInput
                  name="re_passwordS"
                  label="Re-enter password"
                  style={styles.textInput}
                  onChangeText={handleChange('re_passwordS')}
                  onBlur={handleBlur('re_passwordS')}
                  value={values.re_new_passwordS}
                  secureTextEntry
                />
                {errors.re_passwordS && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.re_passwordS}
                  </Text>
                )}

                <TextInput
                  name="fullname"
                  label="Full name"
                  style={styles.textInput}
                  onChangeText={handleChange('fullname')}
                  onBlur={handleBlur('fullname')}
                  value={values.fullname}
                />
                {errors.fullname && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.fullname}
                  </Text>
                )}

                <TextInput
                  name="address"
                  label="Address"
                  style={styles.textInput}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                />
                {errors.address && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.address}
                  </Text>
                )}

                <TextInput
                  label="Phone number"
                  name="phone_number"
                  style={styles.textInput}
                  onChangeText={handleChange('phone_number')}
                  onBlur={handleBlur('phone_number')}
                  value={values.phone_number}
                />
                {errors.phone_number && (
                  <Text style={{fontSize: 10, color: 'red'}}>
                    {errors.phone_number}
                  </Text>
                )}

                <TouchableOpacity>
                  <Text style={styles.forgot_button}>Forgot Password?</Text>
                </TouchableOpacity>
                <View style={styles.loginBtnGroup}>
                  <Button title="Login" onPress={() => handleSubmit()} />
                </View>
                <View style={styles.loginBtnGroup}>
                  <Button
                    title="Go to Details"
                    onPress={() => navigation.navigate('BookList')}
                    style={styles.loginBtn}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },

  container_sub: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    background: `url(${'http://192.168.1.189/php_server/img/login.gif'}) center center no-repeat`,
  },

  image: {
    marginBottom: 40,
  },

  textInput: {
    height: 40,
    width: 250,
    margin: 20,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtnGroup: {
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  loginBtn: {
    width: 400,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
});
