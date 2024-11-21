import React, { useContext, useState } from 'react'
import './Plans.css'
import context from '../Contexts/Context';
import { toast } from 'react-toastify';




function Plans() {


    const cntxt = useContext(context);
    const { user, change, setChange } = cntxt;
    let type = "Employee"
    let token = "tokenEmp";
    if (localStorage.getItem('tokenCand')) {
        token = "tokenCand";
        type = "Candidate"
    }
    const [id, setId] = useState();
    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => {
                resolve(true);
            }
            script.onerror = () => {
                resolve(false);
            }
            document.body.appendChild(script)
        })
    }

    const createrazorPayorder = async (amount, plan) => {

        const response = await fetch("api/pay/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authtoken": JSON.stringify(localStorage.getItem(token)),
                "type": type
            },
            body: JSON.stringify({ amount: amount * 100, currency: "INR" })
        })
        const json = await response.json();
        console.log(json)
        handleResponse(amount, json.order_id, plan);

    }
    const subscribe = async (plan, jsn) => {


        const response = await fetch('api/auth/subscribe', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "authtoken": JSON.stringify(localStorage.getItem(token)),
                "type": type
            },
            body: JSON.stringify({ plan })
        })
        const json = await response.json();
        console.log(json.success);
        if (json.success) {
            setChange(change + 1);
            console.log(jsn);
            const resp = await fetch('api/auth/send-bill', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ plan: plan, email: user.email, status: jsn.status, currency: jsn.currency, method: jsn.method })
            })
            const json2 = await resp.json();
            console.log(json2);
        }
    }

    const verify = async (plan) => {
        const response = await fetch(`api/pay/payment/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const jsn = await response.json();
        console.log(jsn)
        if (jsn.success) {
            subscribe(plan, jsn);
        }

    }



    const handleResponse = async (amount, orid, plan) => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        console.log(res)
        console.log(orid);
        const options = {
            key: "rzp_test_kaT1tWJnPkpQzw",
            amount: amount * 100,
            currency: "INR",
            name: "Avnesh",
            order_id: orid,
            description: "Kuch nhi",
            image: "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?w=740&t=st=1696077818~exp=1696078418~hmac=485f46cbe800d22ce26e0fef07fd93a343bcce09ba1419555c1e46ec3e40eacf",
            prefill: {
                name: "Avnesh",
                email: "avneshkumar@gmail.com",
                contact: "9999999999"
            },
            handler: function (response) {
                console.log(response)
                console.log(response.razorpay_payment_id)
                setId(response.razorpay_payment_id);
                verify(plan);
            },
        }
        const paymentObject = new window.Razorpay(options);
        paymentObject.open()


    }





    return (
        <div className="pricing1 py-5 bg-light">
            <div className="containerCards">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <h3 className="mt-3 font-weight-medium mb-1">Pricing to make your Work Effective</h3>
                        <h6 className="subtitle">We offer 100% satisafaction and Money back Guarantee</h6>
                    </div>
                </div>
                <div className="PlanCardsDiv">
                    <div className="PlanCard">
                        <div className="card text-center card-shadow on-hover border-0 mb-4">
                            <div className="card-body font-14">
                                <span className="badge badge-inverse p-2 position-absolute price-badge font-weight-normal">Popular</span>
                                <h5 className="mt-3 mb-1 font-weight-medium">BRONZE</h5>
                                <h6 className="subtitle font-weight-normal">For Candidates with Experience</h6>
                                <div className="pricing my-3">
                                    <sup>₹</sup>
                                    <span className="monthly display-5">100</span>
                                    <small className="monthly">/mo</small>
                                </div>
                                <ul className="list-inline">
                                    <li className="d-block py-2">Best plan for beginners</li>
                                    <li className="d-block py-2">Recieve Invoice</li>
                                    <li className="d-block py-2">Apply for 3 Internships or Jobs</li>
                                    <li className="d-block py-2">&nbsp;</li>
                                    <li className="d-block py-2">&nbsp;</li>
                                </ul>
                                <div className="bottom-btn">
                                    <button>
                                    <a className="btn btn-danger-gradiant btn-md text-white btn-block" onClick={() => {
                                        toast.success("Wait while processing")
                                        createrazorPayorder(100, "Bronze")
                                        // subscribe("Bronze")
                                    }}><button>Choose Plan</button></a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="PlanCard">
                        <div className="card text-center card-shadow on-hover border-0 mb-4">
                            <div className="card-body font-14">
                                <h5 className="mt-3 mb-1 font-weight-medium">SILVER</h5>
                                <h6 className="subtitle font-weight-normal">Best For an Expert</h6>
                                <div className="pricing my-3">
                                    <sup>₹</sup>
                                    <span className="monthly display-5">300</span>
                                    <small className="monthly">/mo</small>
                                </div>
                                <ul className="list-inline">
                                    <li className="d-block py-2">Perfect for an Experinced Candidate</li>
                                    <li className="d-block py-2">Faster reply</li>
                                    <li className="d-block py-2">Apply 5 InernShips</li>
                                    <li className="d-block py-2">Direct Contact to HR</li>
                                    <li className="d-block py-2">Manage Your applications</li>
                                    ]                                </ul>
                                <div className="bottom-btn">
                                    <button>

                                    <a className="btn btn-success-gradiant btn-md text-white btn-block" onClick={() => {
                                        toast.success("Wait while processing")
                                        createrazorPayorder(300, "Silver")
                                        subscribe("Silver")
                                    }}><span>Choose Plan</span></a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="PlanCard">
                        <div className="card text-center card-shadow on-hover border-0 mb-4">
                            <div className="card-body font-14">
                                <h5 className="mt-3 mb-1 font-weight-medium">GOLD</h5>
                                <h6 className="subtitle font-weight-normal">InternNet Special Plan</h6>
                                <div className="pricing my-3">
                                    <sup>₹</sup>
                                    <span className="monthly display-5">1000</span>
                                    <small className="monthly">/mo</small>
                                </div>
                                <ul className="list-inline">
                                    <li className="d-block py-2">Perfect for an Experinced Candidate</li>
                                    <li className="d-block py-2">Faster reply</li>
                                    <li className="d-block py-2">Apply Unlimited times</li>
                                    <li className="d-block py-2">Direct Contact to HR</li>
                                    <li className="d-block py-2">Manage Your applications</li>
                                    <li className="d-block py-2">InternNet Exclusive Membership</li>
                                </ul>
                                <div className="bottom-btn">
                                    <button>

                                    <a className="btn btn-success-gradiant btn-md text-white btn-block" onClick={() => {
                                        toast.success("Wait while processing")
                                        createrazorPayorder(1000, "Gold")
                                    }}><span>Choose Plan</span></a>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Plans