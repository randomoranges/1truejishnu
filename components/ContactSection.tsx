import React from "react";
import { Mail, Linkedin, Instagram, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip";
import styles from "./ContactSection.module.css";

export const ContactSection = () => {
  const { t } = useTranslation();

  const socialLinks = [
    {
      icon: <Mail size={20} />,
      href: "mailto:jishnu.matra@gmail.com",
      label: t('contact.emailButton'),
      tooltip: "jishnu.matra@gmail.com",
    },
    {
      icon: <Linkedin size={20} />,
      href: "https://www.linkedin.com/in/jishnu-sai-264115230/",
      label: t('contact.linkedinButton'),
    },
    {
      icon: <Instagram size={20} />,
      href: "https://www.instagram.com/1truejishnu/",
      label: t('contact.instagramButton'),
    },
    {
      icon: <Twitter size={20} />,
      href: "https://x.com/1TrueJishnu?t=A0v4jS9Fc9ECOCTxhBnTcA&s=08",
      label: t('contact.xButton'),
    },
  ];

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t('contact.title')}</h2>
          <p className={styles.description}>{t('contact.description')}</p>
        </div>
        
        <div className={styles.socialGrid}>
          {socialLinks.map((link, index) => {
            const button = (
              <Button
                variant="ghost"
                size="icon"
                className={styles.socialButton}
                asChild
              >
                <a
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : "_blank"}
                  rel={
                    link.href.startsWith('mailto')
                      ? undefined
                      : "noopener noreferrer"
                  }
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              </Button>
            );

            if (link.tooltip) {
              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>{button}</TooltipTrigger>
                  <TooltipContent>{link.tooltip}</TooltipContent>
                </Tooltip>
              );
            }

            return <React.Fragment key={index}>{button}</React.Fragment>;
          })}
        </div>
      </div>
    </section>
  );
};