function Footer() {
  const actualYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer__copyright">© {actualYear} Mesto Russia</p>
    </footer>
  );
}

export default Footer;
