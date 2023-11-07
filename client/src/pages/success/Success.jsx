import React,{useEffect} from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import { newRequst } from '../../utils/newRequest';
const Success = () => {
    const { search } = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(search);
    const payment_intent = params.get("payment_intent");
    useEffect(() => {
        const makeRequest = async () => {
            try {
                await newRequst.put("/orders", { payment_intent });
                setTimeout(() => {
                    navigate("/orders");
                }, 5000);
            } catch (err) {
                console.log(err);
            }
        };
        makeRequest();
    }, []);
    return (
        <div>Success. YOure being redirected tp orders page.Dont close</div>
    )
}

export default Success