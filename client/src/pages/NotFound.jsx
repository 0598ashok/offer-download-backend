import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    const token = localStorage.getItem("adminToken");
    const targetPath = token ? "/admin/dashboard" : "/admin/login";
    const buttonText = token ? "Go to Dashboard" : "Go to Login";

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1 style={styles.title}>404</h1>
                <h2 style={styles.subtitle}>Page Not Found</h2>
                <p style={styles.text}>The page you are looking for does not exist or has been moved.</p>
                <Link to={targetPath} style={styles.button}>
                    {buttonText}
                </Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    content: {
        textAlign: 'center',
        padding: '40px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        maxWidth: '500px',
        width: '100%',
    },
    title: {
        fontSize: '72px',
        color: '#dc3545',
        margin: '0 0 10px 0',
    },
    subtitle: {
        fontSize: '24px',
        color: '#343a40',
        marginBottom: '20px',
    },
    text: {
        fontSize: '16px',
        color: '#6c757d',
        marginBottom: '30px',
    },
    button: {
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: '#007bc2',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        transition: 'background-color 0.3s',
    }
};

export default NotFound;
