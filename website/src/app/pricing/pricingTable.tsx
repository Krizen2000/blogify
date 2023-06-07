import styles from "./pricingTable.module.css";

// ! NEED TO IMPLEMENT IT TO WORK ON BOTH MOBILE AND DESKTOP
const PricingTable: React.FC = () => {
  return (
    <table>
      <thead>
        <th>Plans</th>
        <th>Creation of blogs and content</th>
        <th>Access to other communities</th>
        <th>Forum Tech Support</th>
        <th>Email Tech Support</th>
        <th>Call Tech Support</th>
        <th>24/7 Live Support</th>
        <th>Full Access to Premium</th>
        <th>Full Access to Beta</th>
        <th>Custom Payment Cycle</th>
      </thead>
      <tbody>
        <tr>
          <th>Free</th>
        </tr>
        <tr>
          <th>Starter</th>
        </tr>
        <tr>
          <th>Pro</th>
        </tr>
        <tr>
          <th>Enterprise</th>
        </tr>
      </tbody>
    </table>
  );
};
