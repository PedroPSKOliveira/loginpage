import React from 'react';
import {ElementsConsumer, PaymentElement} from '@stripe/react-stripe-js';

class CheckoutForm extends React.Component {
    handleSubmit = async (event) => {

        event.preventDefault();

        const {stripe, elements} = this.props;

        if (!stripe || !elements) {

            return;
        }

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "https://example.com/order/123/complete",
            },
        });

        if (result.error) {
            console.log(result.error.message);
        } else {
            console.log(result);
        }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <PaymentElement />
                <button disabled={!this.props.stripe}>Submit</button>
            </form>
        );
    }
}

export default function InjectedCheckoutForm() {
    return (
        <ElementsConsumer>
            {({stripe, elements}) => (
                <CheckoutForm stripe={stripe} elements={elements} />
            )}
        </ElementsConsumer>
    )
}