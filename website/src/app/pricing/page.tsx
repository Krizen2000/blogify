const Pricing: React.FC = () => {
  return (
    <>
      <p>PRICING</p>
      <h1>Get Started Now! Pick A Plan Later</h1>
      <p>Try The Free Plan And Get Access To Our Products</p>\
      <button>
        <div>Bill Yearly</div>
        <div>Bill Monthly</div>
      </button>
      <div>
        <article>
          <header>
            <p>Free</p>
            <p>₹ 0 per annum</p>
          </header>
          <ul>
            <li>Creation of blogs and content</li>
            <li>Access to other communities</li>
            <li>Forum Tech Support</li>
          </ul>
          <button>Try for Free</button>
        </article>
        <article>
          <header>
            <p>Starter</p>
            <p>₹ 100 per annum</p>
          </header>
          <ul>
            <li>Creation of blogs and content</li>
            <li>Access to other communities</li>
            <li>Forum Tech Support</li>
            <li>Email Tech Support</li>
            <li>Limited Access to Premium</li>
          </ul>
          <button>Subscribe</button>
        </article>
        <article>
          <header>
            <p>Pro</p>
            <p>₹ 1000 per annum</p>
          </header>
          <ul>
            <li>Creation of blogs and content</li>
            <li>Access to other communities</li>
            <li>Forum Tech Support</li>
            <li>Email Tech Support</li>
            <li>Call Tech Support</li>
            <li>Full Access to Premium</li>
            <li>Full Access to Beta</li>
          </ul>
          <button>Subscribe</button>
        </article>
        <article>
          <header>
            <p>Enterprise</p>
            <p>Custom</p>
          </header>
          <ul>
            <li>Creation of blogs and content</li>
            <li>Access to other communities</li>
            <li>Forum Tech Support</li>
            <li>Email Tech Support</li>
            <li>Call Tech Support</li>
            <li>24/7 Live Support</li>
            <li>Full Access to Premium</li>
            <li>Full Access to Beta</li>
            <li>Custom Payment Cycle</li>
            <li></li>
          </ul>
          <button>Subscribe</button>
        </article>
      </div>
      {/* CLIENT COMPONENT */}
      <aside>
        <p>Compare all the features</p>
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
      </aside>
      {/* END */}
    </>
  );
};

export default Pricing;
