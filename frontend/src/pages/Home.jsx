import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  const navyBlue = "#001a4d";
  const goldAccent = "#FFD700";

  const features = [
    { 
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80", 
      title: "Advanced Analytics", 
      desc: "Monitor productivity with high-precision data charts and real-time tracking." 
    },
    { 
      img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80", 
      title: "Team Synergy", 
      desc: "Connect your departments with a seamless flow of information and feedback." 
    },
    { 
      img: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&w=500&q=80", 
      title: "Agile Workflows", 
      desc: "Customizable task boards that adapt to your team's unique working style." 
    }
  ];

  return (
    <div style={{ backgroundColor: "#fdfdfd", overflowX: "hidden", fontFamily: "'Poppins', sans-serif" }}>
      <Navbar />
      
      {/* --- IMPROVED HERO SECTION --- */}
      <div 
        className="hero-section d-flex align-items-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "90vh",
          position: "relative",
          marginTop: "60px" 
        }}
      >
        {/* Radial Overlay: Center is clear, edges are dark for text readability */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: `radial-gradient(circle, rgba(0, 26, 77, 0.2) 0%, rgba(0, 26, 77, 0.8) 100%)`,
          zIndex: 1
        }}></div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="row">
            <div className="col-lg-7 text-start text-white p-4" style={{
                backgroundColor: "rgba(0, 26, 77, 0.4)", // Very light glass effect
                backdropFilter: "blur(4px)",
                borderRadius: "20px",
                borderLeft: `5px solid ${goldAccent}`
            }}>
              <h1 className="display-2 fw-bold mb-3" style={{ letterSpacing: "-1px", lineHeight: "1.1" }}>
                Lead Your Team to <span style={{ color: goldAccent }}>Victory.</span>
              </h1>
              <p className="fs-4 mb-4 fw-light" style={{ maxWidth: "600px" }}>
                Experience the most <span className="fw-bold">vibrant and crystal-clear</span> task management portal designed for high-performance teams.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/loginpage" className="btn btn-lg px-5 py-3 fw-bold shadow-lg"
                  style={{ backgroundColor: goldAccent, color: navyBlue, borderRadius: "10px", border: "none" }}>
                  GET STARTED
                </Link>
                <Link to="/signuppage" className="btn btn-lg px-5 py-3 fw-bold text-white shadow-sm"
                  style={{ border: "2px solid #fff", borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.1)" }}>
                  TAKE A TOUR
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- FEATURES SECTION --- */}
      <div className="container py-5 mt-n5" style={{ position: "relative", zIndex: 10 }}>
        <div className="row g-4 justify-content-center">
          {features.map((f, i) => (
            <div className="col-lg-4 col-md-6" key={i}>
              <div className="card h-100 border-0 shadow-lg text-center p-0" 
                   style={{ 
                     borderRadius: "30px", 
                     overflow: "hidden", 
                     transition: "0.4s",
                     backgroundColor: "#fff"
                   }}
                   onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-15px)"}
                   onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ height: "240px", overflow: "hidden" }}>
                  <img src={f.img} alt={f.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                
                <div className="card-body p-4">
                  <h3 className="fw-bold mb-3" style={{ color: navyBlue }}>{f.title}</h3>
                  <p className="text-muted mb-0">{f.desc}</p>
                  <div className="mt-3" style={{ width: "50px", height: "4px", backgroundColor: goldAccent, margin: "auto" }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- TRUST SECTION --- */}
      <div className="container py-5 my-5 text-center">
        <h5 className="text-uppercase fw-bold mb-4" style={{ color: navyBlue, letterSpacing: "3px", opacity: 0.5 }}>Trusted by Industry Leaders</h5>
        <div className="d-flex flex-wrap justify-content-center gap-5 align-items-center" style={{ opacity: 0.3, filter: "grayscale(100%)" }}>
           <h2 className="fw-bold">MICROSOFT</h2>
           <h2 className="fw-bold">GOOGLE</h2>
           <h2 className="fw-bold">ADOBE</h2>
           <h2 className="fw-bold">TESLA</h2>
        </div>
      </div>

      <footer className="py-5 text-white" style={{ backgroundColor: navyBlue }}>
        <div className="container text-center">
          <h2 className="fw-bold mb-3">TASK<span style={{ color: goldAccent }}>FLOW</span></h2>
          <p className="opacity-50">© 2026 Enterprise Management Portal. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;