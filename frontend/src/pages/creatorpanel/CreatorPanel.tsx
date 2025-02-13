import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import './CreatorPanel.css';

const CreatorPanel: React.FC = () => {
    const [activeLink, setActiveLink] = useState('creatorDashboard');
    const location = useLocation();

    React.useEffect(() => {
        const path = location.pathname.split('/').pop() || 'creatorDashboard';
        setActiveLink(path);
    }, [location]);

    return (
        <div className="creator-panel">
            <aside className="sidebar">
                <nav>
                    <ul>
                        <li>
                            <Link
                                to="/creator-panel/creatorDashboard"
                                className={activeLink === 'creatorDashboard' ? 'active' : ''}
                                onClick={() => setActiveLink('creatorDashboard')}
                            >
                                Creator Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/creator-panel/productListing"
                                className={activeLink === 'productListing' ? 'active' : ''}
                                onClick={() => setActiveLink('productListing')}
                            >
                                Product Listing
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            <main className="panel-content">
                {/* Default content when no specific route is selected */}
                {!location.pathname.includes('creatorDashboard') && !location.pathname.includes('productListing') && (
                    <h2>Welcome to Creator Panel</h2>
                )}
                <Outlet />
            </main>
        </div>
    );
};

export default CreatorPanel;