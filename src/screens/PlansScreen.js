import React, { useState, useEffect } from 'react'
import './PlansScreen.css';
import db from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, setPlan } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';

function PlansScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    db
      .collection('customers')
      .doc(user.uid)
      .collection('subscriptions')
      .where('status', 'in', ['trialing', 'active'])
      .onSnapshot(querySnapshot => {
        querySnapshot.forEach(async subscription => {
          const {
            current_period_end,
            role,
            current_period_start
          } = subscription.data();

          setSubscription({
            role,
            current_period_end: current_period_end.seconds,
            current_period_start: current_period_start.seconds
          });
          dispatch(setPlan({
            role,
            current_period_end: current_period_end.seconds,
            current_period_start: current_period_start.seconds
          }));
        })
      })
  }, [user.uid, dispatch]);

  useEffect(() => {
    db
      .collection('products')
      .where('active', '==', true)
      .get()
      .then(querySnapshot => {
        const products = {};
        querySnapshot.forEach(async productDoc => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection('prices').where('currency', '==', 'inr').get();
          priceSnap.docs.forEach(price => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data()
            }
          })
        })
        setProducts(products);
      })

  }, []);
  console.log(products);
  console.log(subscription);

  const loadCheckout = async (priceId) => {
    const docRf = await db
      .collection('customers')
      .doc(user.uid)
      .collection('checkout_sessions')
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin
      });

    docRf.onSnapshot(async snap => {
      const { error, sessionId } = snap.data();
      if (error) {
        // Show an error to your customer and 
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        // We have a session, let's redirect to Checkout
        // Init Stripe
        const stripe = await loadStripe('pk_test_51I7k2fAzj7xGNxH4GJ5XWcnqb428jnCHNalnoigrMubh0aqFl0mxwXV5KIg6SVnrFl4RsyR06n3D1TOUiTe6Z6Lx00cZHDaloj');
        stripe.redirectToCheckout({ sessionId });
      }
    })
  };

  return (
    <div className='plansScreen'>
      {
        subscription && <p>
          Renewal Date:{" "}
          {new Date(subscription?.current_period_end * 1000)
            .toLocaleDateString()
          }
        </p>
      }
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <div
            key={productId}
            className={`${isCurrentPackage && 'plansScreen_plan-disabled'} plansScreen_plan`}
          >
            <div className='plansScreen_info'>
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
              {isCurrentPackage ? 'Current Package' : 'Subscribe'}
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default PlansScreen
