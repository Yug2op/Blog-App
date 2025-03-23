import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
    return (
        <footer className="relative overflow-hidden py-10 bg-gray-800 text-gray-300 border-t border-gray-700">
            <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="flex flex-wrap -m-4">

                    {/* Logo & Copyright */}
                    <div className="w-full p-4 md:w-1/2 lg:w-5/12">
                        <div className="flex flex-col justify-between h-full">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="100px" />
                            </div>
                            <p className="text-sm md:text-base text-gray-400">
                                &copy; 2025 Yug2op. All Rights Reserved.
                            </p>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="w-full p-4 md:w-1/2 lg:w-2/12">
                        <h3 className="mb-4 text-base md:text-lg font-semibold uppercase text-gray-400">
                            Company
                        </h3>
                        <ul className="space-y-2">
                            {["Features", "Pricing", "Affiliate Program", "Press Kit"].map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to="/"
                                        className="text-sm md:text-base font-medium text-gray-300 hover:text-white transition duration-200"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className="w-full p-4 md:w-1/2 lg:w-2/12">
                        <h3 className="mb-4 text-base md:text-lg font-semibold uppercase text-gray-400">
                            Support
                        </h3>
                        <ul className="space-y-2">
                            {["Account", "Help", "Contact Us", "Customer Support"].map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to="/"
                                        className="text-sm md:text-base font-medium text-gray-300 hover:text-white transition duration-200"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="w-full p-4 md:w-1/2 lg:w-3/12">
                        <h3 className="mb-4 text-base md:text-lg font-semibold uppercase text-gray-400">
                            Legals
                        </h3>
                        <ul className="space-y-2">
                            {["Terms & Conditions", "Privacy Policy", "Licensing"].map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to="/"
                                        className="text-sm md:text-base font-medium text-gray-300 hover:text-white transition duration-200"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>
        </footer>
    );
}

export default Footer;
