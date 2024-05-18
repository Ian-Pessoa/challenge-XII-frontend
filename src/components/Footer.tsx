import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="footer-links">
        <img className='icon' src="https://imageschallenge.s3.amazonaws.com/Logo+(1).svg" alt="" />
        <p>MyRide Inc., 2nd Floor, New York, NY 10016</p>
        <a href="https://www.facebook.com/compass.uol/?locale=pt_BR"><img src="https://imageschallenge.s3.amazonaws.com/Facebook.svg" alt="" /></a>
        <a href="https://www.instagram.com/compass.uol/"><img src="https://imageschallenge.s3.amazonaws.com/Instagram.svg" alt="" /></a>
        <a href="https://x.com/compassuol"><img src="https://imageschallenge.s3.amazonaws.com/Twitter.svg" alt="" /></a>
      </div>
      <div className='footer-menu'>
        <div className='company-section'>
          <h3>Company</h3>
          <a href="http://localhost:5173/company">About Us</a>
          <a href="http://localhost:5173/company">News</a>
          <a href="http://localhost:5173/company">Careers</a>
          <a href="http://localhost:5173/company">How we work</a>
        </div>
        <div className='suport-section'>
          <h3>Support</h3>
          <a href="http://localhost:5173/support">FAQ</a>
          <a href="http://localhost:5173/support">US Office</a>
          <a href="http://localhost:5173/support">Asia Office</a>
          <a href="http://localhost:5173/support">Help Center</a>
        </div>
        <div className='more-section'>
          <h3>More</h3>
          <a href="http://localhost:5173/more">Become a partner</a>
          <a href="http://localhost:5173/more">Partner Support</a>
          <a href="http://localhost:5173/more">Mobile app links</a>
        </div>
      </div>
    </footer>
  );
}