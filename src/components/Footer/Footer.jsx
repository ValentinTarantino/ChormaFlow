import './Footer.css';

const Footer = () => {
    return (
        <footer className="Footer text-center py-4 mt-5">
            <p className="Footer-text mb-0">
                © {new Date().getFullYear()} ChromaFlow. Creado con React.
            </p>
        </footer>
    );
};

export default Footer;