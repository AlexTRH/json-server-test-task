import * as styles from './Contact.module.css';

interface ContactProps {
  title: string;
  text: string;
}

const Contact = ({ title, text }: ContactProps) => {
  return (
    <div className={styles.contact}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default Contact;
