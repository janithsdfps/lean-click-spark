const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto text-center">
        <p className="font-brand text-4xl mb-2">miracle Cakes</p>
        <p className="text-background/70">
          © {new Date().getFullYear()} Miracle Cakes. All Rights Reserved. Piliyandala, Sri Lanka.
        </p>
      </div>
    </footer>
  );
};

export default Footer;