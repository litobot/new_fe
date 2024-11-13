import './SubscriptionList.css';
import IndividualSubscription from '../IndividualSubscription/IndividualSubscription';


function SubscriptionList({ subscriptions }) {
  return (
    <div className='movies-container'>
        {subscriptions.map((subscription) => (
          <IndividualSubscription
            key={subscription.id}
            subscriptionId={subscription.id}
            customerDetails={subscription.attributes.customer_details}
            teas={subscription.attributes.teas}
            frequency={subscription.attributes.subscription_frequency}
            status={subscription.attributes.subscription_status}
          />
        ))}
    </div>
  );
}
  
export default SubscriptionList;