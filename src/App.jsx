import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import QRCode from "qrcode";
import "./App.css";
import Button from "./Button";
import { useTheme } from "./ThemeContext";


function App() {
  const [url, setUrl] = useState("");
  const [qrcode, setQRcode] = useState("");
  const [showDescription, setShowDescription] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const qrContainerRef = useRef(null);
  const { isDarkMode, toggleTheme } = useTheme();
  
  useEffect(() => {
    if (qrContainerRef.current) {
      gsap.set(qrContainerRef.current, { opacity: 0, scale: 0.5 });
    }
  }, [qrContainerRef.current]);

  const generateQRcode = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await QRCode.toDataURL(url, {
        width: 300,
        margin: 1,
      });

      setQRcode(res);
      setShowDescription(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (qrcode) {
      gsap.fromTo(
        qrContainerRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.5 }
      );
    }
  }, [qrcode]);

  return (
    <div className={`App ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <Button />
      <h1 className="titulo">GENERÁ TU QR</h1>
      {showDescription ? (
        <p className="descripcion">
          Crea códigos QR al instante. Fácil, rápido y eficiente. <br /> ¡Hace
          que tus enlaces cobren vida! 🔗🚀
        </p>
      ) : (
        <p className="descripcion">Disfruta de tu código QR.</p>
      )}
      <form className="form" onSubmit={generateQRcode}>
        <input
          type="url"
          value={url}
          placeholder="Pega tu link acá"
          required
          className="input-form"
          onChange={(e) => setUrl(e.target.value)}
        />
        <button className="btn-gen" type="submit" disabled={isLoading}>
          {isLoading ? "GENERANDO..." : "GENERAR"}
        </button>
      </form>
      {qrcode && (
        <div className="qr-container" ref={qrContainerRef}>
          <img
            src={qrcode}
            alt="qrcode-img"
            onLoad={() =>
              gsap.fromTo(
                qrContainerRef.current,
                { opacity: 0, scale: 0.5 },
                { opacity: 1, scale: 1, duration: 0.5 }
              )
            }
          />
          <br />
          <a href={qrcode} download="qrcode" className="btn-des">
            DESCARGAR
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
