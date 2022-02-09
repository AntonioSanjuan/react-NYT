import './Contact.scss'
import ContactMe from './components/contactMe/contactMe';


function Contact() {
    return (
      <>
        <div className="Contact_MainContainer">
          <div className="Contact_LeftContainer">
            <ContactMe/>
          </div>
          <div className="Contact_CenterContainer">
            <h2>Welcome to the contactpage!</h2>
            <p>You can do this, I believe in you.</p>
          </div>
        </div>
      </>
    );
}

  export default Contact
  