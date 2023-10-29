import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios'
import { useAuth } from '../../context/auth';
import moment from 'moment'

const Orders = () => {
    const [auth, setAuth] = useAuth();
    const [orders, setOrders] = useState([]);
    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`);
            setOrders(data);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (auth?.token) {
            getOrders();
        }
    }, [])
    return (
        <Layout title={'Dashboard - Your Orders'}>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>All Orders</h1>
                        {
                            orders.map((o,i) =>{
                                return(
                                    <div className="border shadow">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <td scope='col'>#</td>
                                                    <td scope='col'>Status</td>
                                                    <td scope='col'>Buyer</td>
                                                    <td scope='col'>Date</td>
                                                    <td scope='col'>Payment</td>
                                                    <td scope='col'>Quantity</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>{i+1}</th>
                                                    <th>{o?.status}</th>
                                                    <th>{o?.buyer.name}</th>
                                                    <th>{moment(o?.createAt).fromNow()}</th>
                                                    <th>{o?.payment.success ? "Success"  : "Failed"}</th>
                                                    <th>{o?.products?.length}</th>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders
