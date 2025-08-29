import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ApolloSetting from "@/commons/settings/apollo-setting";
import { Navigation } from "@/commons/layout/navigation";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Trip Trip",
    description: "Trip",
};

interface IProps {
    children: React.ReactNode;
    modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: IProps) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ApolloSetting>
                    <Navigation />
                    {children}
                    <div>{modal}</div>
                </ApolloSetting>
            </body>
        </html>
    );
}
