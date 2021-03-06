import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100; // Stripe wants in cents .00
  const publishableKey = 'pk_test_51Hwa4dLHr0A2wZVbRcVShlTVt0YkEIofA9bzxGMnUP6HZwnWFwSMWvefMM1rTfp7eTYSJkn8lj6jgpQjwwldcCOy00TNmGSvXr';

  const onToken = token => {
    console.log(token);
    alert('Payment Successful');
  }

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://sendeyo.com/up/d/f3eb2117da'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      paneLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton;
