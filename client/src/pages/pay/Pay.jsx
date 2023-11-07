import React, { useState, useEffect } from "react";
import './Pay.scss'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { newRequst } from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";


const stripePromise = loadStripe("pk_test_51NlRRgFgqHlHbbNcxr6hFFMf0kpW7d1L9KbIKjtvaoxE9lF2cPjpnin83mYYivG7j6GkcH81Y0wkFdH38iEmEMqm00bzJOoKOw")

const Pay = () => {
    const { id } = useParams()
    const [clientSecret, setClientSecret] = useState("");

    const paymentIntent = async () => {
        try {
            const res = await newRequst.post(`orders/create-payment-intent/${id}`)
            console.log(res.data.clientSecret);
            setClientSecret(res.data.clientSecret)
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        paymentIntent()
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };


    return (
        <div className="pay">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
            
        </div>
    )
}

export default Pay