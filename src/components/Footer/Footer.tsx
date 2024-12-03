export const Footer = ({ testID }: Common.ComponentProps) => {
  return (
    <footer data-testid={testID} className="grid col-content grid-cols-3 gap-5">
      <div>
        <h3 className="text-xl">Links</h3>
        <ul>
          <li>Announcements</li>
          <li>Community</li>
          <li>Become a Partner</li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl">Tools</h3>
        <ul>
          <li>Tokenomics</li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl">Legal</h3>
        <ul>
          <li>About us</li>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
          <li>Contact us</li>
        </ul>
      </div>
      <small className="col-span-2">
        We started as a simple meme with a simple purpose, solve population
        decline by giving away Lambos to virgins, but we've grown since then.
      </small>
    </footer>
  );
};
